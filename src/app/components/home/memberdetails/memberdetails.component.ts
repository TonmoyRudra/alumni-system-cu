
import { GlobalService } from 'src/app/shared/service/global/global.service';
import { MemberService } from './../../../shared/service/member/member.service';
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
  selector: 'app-memberdetails',
  templateUrl: './memberdetails.component.html',
  styleUrls: ['./memberdetails.component.css']
})
export class MemberdetailsComponent implements OnInit {

  sessionUser: any;
  memberInfo: any;
  uploadedFilePath: any;
  fileData: File;

  UniversityBatchList: any[] = [];
  MSSYearList: any[] = [];
  BSSYearList: any[] = [];
  bloodGroupList: string[] = [];
  constructor(public autenticationService: AutenticationService,
    public globalService :GlobalService,
    public memberService : MemberService,
    public router: Router, public http: HttpService) {
    this.sessionUser = this.autenticationService.getSessionUser();


    this.bloodGroupList = [
      'A+', 'A-','B+', 'B-','O+','O-','AB+', 'AB-',
    ]
    this.getUniversityBatch();
    this.getMSSYear();
    this.getBSSYear();
  }
  getUniversityBatch() {
    for (let index = 1; index < 61; index++) {
      this.UniversityBatchList.push('Batch ' + index.toString());
    }
    return this.UniversityBatchList;
  }
  getMSSYear() {
    for (let index = 1970; index < new Date().getFullYear() + 1; index++) {
      this.MSSYearList.push(index.toString());
    }
    return this.MSSYearList;
  }

  getBSSYear() {
    for (let index = 1970; index < new Date().getFullYear() + 1; index++) {
      this.BSSYearList.push(index.toString());
    }
    return this.BSSYearList;
  }
  ngOnInit(): void {
    $(".upload-button").on('click', function () {
      $(".file-upload").click();
    });
    this.getmemberById(this.sessionUser.MemberId);

  }


  getmemberById(id){
    this.memberInfo = {};
    this.memberService.getMemberById(id).subscribe(result => {
      if(result != null){
        this.memberInfo = result;
        this.memberInfo.ProfilePictureFullUrl =  this.memberInfo.ProfilePicture ?  this.globalService.domain+"upload/" + this.memberInfo.ProfilePicture : '../../../../assets/images/team1.jpg';
        console.log(result);

      } else{
        this.globalService.showSwal('Error', 'No User found. Please Login with a registerd user.', 'error');
        this.router.navigateByUrl('/');

      }
    }, error =>{
      this.globalService.errorResponseHandler(error)
    })
  }
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
      console.log(result);
      this.uploadedFilePath = result;
      this.memberInfo.ProfilePicture = result;
      this.updateProfile();
    }, err => {
      this.globalService.showSpinner(false);
      console.log(err);      
    })
  }
  updateProfile(){
    
    this.globalService.showSpinner(true);
    this.http.post("/Member/Update", this.memberInfo)
      .subscribe(
        d => {
          
          this.globalService.showSpinner(false);
          notify("Profile Details updated", 'success', 2000);
          this.getmemberById(this.sessionUser.MemberId);

        },
        e => {
          
          this.globalService.showSpinner(false);
          console.log(e);
          notify('Something wrong. Data failed to load.', 'error', 2000);
        }
      );
  }

}












