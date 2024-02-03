import { GlobalService } from 'src/app/shared/service/global/global.service';
import { MemberService } from './../../../shared/service/member/member.service';
import { GalleryService } from './../../../shared/service/gallery/gallery.service';
import { AutenticationService } from './../../../shared/service/autentication/autentication.service';
import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/shared/interface/event.interface';
import { Router } from '@angular/router';
import { HttpService } from '../../../shared/service/http/http.service';
import notify from 'devextreme/ui/notify';

import { ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from "jspdf";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import * as $ from 'jquery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  sessionUser: any;
  isAdmin : boolean = false;
  constructor(public autenticationService: AutenticationService,
    public globalService :GlobalService,
    public galleryService : GalleryService,
    public memberService : MemberService,
    public router: Router, public http: HttpService) {

    this.sessionUser = this.autenticationService.getSessionUser();
    this.isAdmin = this.autenticationService.isAdminRole();
  }
  ngOnInit(): void {   
    $(".upload-button").on('click', function () {
      $(".file-upload").click();
    });

    this.getAllGalleryImages();
  }

  galleryImagesList: any;
  getAllGalleryImages(){
    this.dataSource=[];
    this.galleryImagesList = {};
    this.galleryService.getAllGalleryImages().subscribe(result => {
      if(result != null){
        this.galleryImagesList = result;
       this.galleryImagesList.forEach(element => {
        this.dataSource.push(element["ImageUrl"]);
       });
        
      } 
    }, error =>{
      this.globalService.errorResponseHandler(error)
    })
  }
  





  uploadedFilePath: any;
  fileData: File;

  filePickerData (event) {
    const target: DataTransfer = event.target as DataTransfer;
    if (target.files && target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.profile-pic').attr('src', e.target.result);
      }
      reader.readAsDataURL(target.files[0]); // bind the picked image on a image src;
      this.fileData = target.files[0];
      console.log(target.files[0]);
      this.uploadFile(this.fileData);
    }
  }

  uploadFile(fileData) {
    this.globalService.showSpinner(true);
    this.memberService.uploadFile(fileData).subscribe(result => {
      this.globalService.showSpinner(false);
      this.uploadedFilePath = result;
     this.updateProfile();
    }, err => {
      this.globalService.showSpinner(false);
      console.log(err);      
    })
  }
  updateProfile(){
    
    this.globalService.showSpinner(true);
    this.http.post("/ImageConfig/Post",{
      "Name": this.uploadedFilePath,
      "ImageUrl":  this.globalService.domain+"upload/"+this.uploadedFilePath    
    } )
      .subscribe(
        d => {
          this.globalService.showSpinner(false);
          notify("Profile Details updated", 'success', 2000);

          this.getAllGalleryImages();

        },
        e => {
          
          this.globalService.showSpinner(false);
          console.log(e);
          notify('Something wrong. Data failed to load.', 'error', 2000);
        }
      );
  }

  dataSource: string[];

  slideshowDelay = 2000;
  valueChanged(e) {
    this.slideshowDelay = e.value ? 2000 : 0;
  }
}












