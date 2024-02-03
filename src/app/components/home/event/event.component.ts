import { GlobalService } from 'src/app/shared/service/global/global.service';
import { MemberService } from './../../../shared/service/member/member.service';
import { AutenticationService } from './../../../shared/service/autentication/autentication.service';
import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/shared/interface/event.interface';
import { Router } from '@angular/router';

import { ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from "jspdf";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  eventModel: IEvent = {
    EventId: 0,
    EventName: '',
    EventPlace: '',
    MemberId: '',
    UniversityBatch: '',
    Name: '',
    Mobile: '',
    Category: '',
    MemberAmount: 0,
    SpouseAmount: 0,
    ChildAmount: 0,
    DriverAmount: 0,
    OtherAmount: 0,
    TotalAmount: 0,
    BkashTransactionId: '',
    BkashMobileNo: '',
    IsApproved: false,
    ApprovedBy: false,
    Id: 0,
    IsActive: false,
    CreateDate: undefined,
    UpdatedDate: undefined,
    CreatedBy: 0,
    UpdatedBy: 0,
    MemberCount: 1,
    SpouseCount: 0,
    ChildCount: 0,
    DriverCount: 0,
    OtherCount: 0,
  };

  category: any;
  selectedCategory: { id: number; name: string; payment_setting: { member: number; spouse: number; children: number; driver: number; guest: number; }; };
  memberChecked: boolean = true;
  spouseChecked: boolean = false;
  childrenChecked: boolean = false;
  driverChecked: boolean = false;
  guestChecked: boolean = false;
  categoryList: { id: number; name: string; payment_setting: { member: number; spouse: number; children: number; driver: number; guest: number; }; }[];

  totalChild: number  ;
  totalDriver: number ;
  totalGuest: number ;
  sessionUser: any;
  memberInfo: any;
  alreadyRegistered: boolean = null;

  imagetest ;
  labelMode = 'static';
  stylingMode = 'filled';
  bKashNumber = '01716498248, 01610009090';
  nagadNumber = '01715500243, 01716498248'
  showView: boolean = false;
  constructor(public autenticationService: AutenticationService,
    public globalService :GlobalService,
    public memberService : MemberService,
    public router: Router) {
    this.sessionUser = this.autenticationService.getSessionUser();
    this.alreadyRegistered = null;

  }

  ngOnInit(): void {

    this.eventModel.Id = 0; // Static
    this.eventModel.EventName = "Family Reunion 2024"
    this.eventModel.EventPlace = "CCULB Resort & Convention Hall"
    this.getmemberById(this.sessionUser.MemberId);
    this.categoryList = [{
      id: 1,
      name: 'Batch 1981-2005',
      payment_setting: {
        member: 1500,
        spouse: 1000,
        children: 800,
        driver: 500,
        guest: 1500
      }
    },
    {
      id: 2,
      name: 'Batch 2006-2015',
      payment_setting: {
        member: 1500,
        spouse: 1000,
        children: 800,
        driver: 500,
        guest: 1500
      }
    },
    {
      id: 3,
      name: 'Batch 2016-2022',
      payment_setting: {
        member: 1500,
        spouse: 100,
        children: 800,
        driver: 500,
        guest: 1500
      }
    }]
  }

  categoryOptionChange(e) {
    this.selectedCategory = e.selectedItem;
  //   const index = this.categoryList.findIndex(s => s.id == e.id);
  //   if(index != -1){
  //     this.selectedCategory = this.categoryList[index];
  //   } else {
  //     this.selectedCategory = null;
  //   }
    this.calculateTotal();
  }

  calculateTotal(){
    // Refresh
    this.eventModel.MemberAmount = 0;
    this.eventModel.SpouseAmount = 0;
    this.eventModel.ChildAmount = 0;
    this.eventModel.DriverAmount = 0;
    this.eventModel.OtherAmount = 0;


    this.eventModel.MemberAmount = this.selectedCategory.payment_setting.member;
    if(this.spouseChecked){
      this.eventModel.SpouseAmount = this.selectedCategory.payment_setting.spouse * 1;
    }
    if(this.childrenChecked && this.totalChild > 0){
      this.eventModel.ChildAmount = this.selectedCategory.payment_setting.children * this.totalChild;
    }
    if(this.driverChecked && this.totalDriver > 0){
      this.eventModel.DriverAmount = this.selectedCategory.payment_setting.driver * this.totalDriver;
    }
    if(this.guestChecked && this.totalGuest > 0){
      this.eventModel.OtherAmount = this.selectedCategory.payment_setting.guest * this.totalGuest;
    }

    this.eventModel.TotalAmount =  this.eventModel.MemberAmount + this.eventModel.SpouseAmount + this.eventModel.ChildAmount + this.eventModel.DriverAmount + this.eventModel.OtherAmount;
  }

  getmemberById(id){
    this.memberService.getMemberById(id).subscribe(result => {
      if(result != null){
        this.memberInfo = result;
        this.eventModel.Name = this.memberInfo.Name;
        this.eventModel.Mobile = this.memberInfo.Mobile;
        this.eventModel.MemberId = this.memberInfo.Id;

        this.getTransectionByMobile(this.eventModel.Id, this.eventModel.Mobile);

      } else{
        this.globalService.showSwal('Error', 'No User found. Please Login with a registerd user.', 'error');
        this.router.navigateByUrl('/');

      }
    }, error =>{
      this.globalService.errorResponseHandler(error)
    })
  }

  submit(e){
    this.globalService.showSpinner(true);
    this.eventModel.MemberCount = 1;
    if(this.spouseChecked){
      this.eventModel.SpouseCount = 1;
    }
    this.eventModel.ChildCount = this.totalChild;
    this.eventModel.DriverCount = this.totalDriver;
    this.eventModel.OtherCount = this.totalGuest;
    this.eventModel.UniversityBatch = this.memberInfo.UniversityBatch;
    console.log(this.eventModel);
    this.memberService.registerEventTransection(this.eventModel).subscribe(result => {
      if(result != null){
        this.globalService.showSpinner(false);
        this.getmemberById(this.sessionUser.MemberId);
        this.globalService.showSwal('Success','Your event registration successfully done', 'success');
        this.alreadyRegistered = true;
      }
    }, err => {
      console.log(err);
      this.globalService.showSpinner(false);
      this.globalService.errorResponseHandler(err);
    })
  }

  getTransectionByMobile(eventId, mobile){
    this.memberService.getTransectionByMobile(eventId, mobile).subscribe(result => {

      if(result != null){
        this.alreadyRegistered = false;
        const index = result.findIndex(s => s.EventId == eventId);
        this.showView = true;
        if(index != -1){
          if(result[index].EventId == this.eventModel.Id){
            this.alreadyRegistered = true;


            //this.memberInfo result[index]
            this.eventModel = result[index];

            // "https://alumnibackend.rexsystemsbd.com/upload/028eaec9-c6cd-4b4a-9725-600f1cb2cd83shakil.JPG"
            this.memberInfo.ProfilePictureFullUrl =  this.memberInfo.ProfilePicture ?  this.globalService.domain+"upload/" + this.memberInfo.ProfilePicture : '../../../../assets/images/team1.jpg';

            this.eventModel["IsApprovedFull"] =  this.eventModel.IsApproved ? "Approved" : "Pending";
          }
        }

      }
    }, err => {
      this.globalService.errorResponseHandler(err);
    });
  }


  @ViewChild('pdfTable') pdfTable: ElementRef;

  public downloadAsPDF() {

    // // Open Print Preview
    //   var headstr = "<html><head><title></title></head><body>";
    //   var footstr = "</body>";
    //   var newstr = document.getElementById("pdfTable").innerHTML;
    //   var oldstr = document.body.innerHTML;
    //   document.body.innerHTML = headstr + newstr + footstr;
    //   window.print();
    //   document.body.innerHTML = oldstr;
    //   return false;

    let  url = this.globalService.api_BaseURL + '/Download/Download?memberId=' + this.memberInfo.Id + "&transactionNo=" + this.eventModel.BkashTransactionId;
      // this.router.navigateByUrl(url)
      window.open(url, '_blank');


  }
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
}
