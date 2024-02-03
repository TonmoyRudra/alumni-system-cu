import { MemberService } from './../../../shared/service/member/member.service';
import { IRegistrationDto } from './../../../shared/interface/registration.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/shared/service/global/global.service';
import { DxFormComponent } from 'devextreme-angular';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @ViewChild(DxFormComponent) form: DxFormComponent
  registrationFormData: IRegistrationDto;
  UniversityBatchList: any[] = [];
  MSSYearList: any[] = [];
  fileData: File;
  buttonOptions: any = {
    width: '100%',
    text: 'Register',
    type: 'success',
    useSubmitBehavior: true,
  };
  uploadedFilePath: any;
  BSSYearList: any[] = [];;
  bloodGroupList: string[] = [];
  constructor(public memberService: MemberService, public globalService: GlobalService, public router: Router) { }

  ngOnInit(): void {
    this.bloodGroupList = [
      'A+', 'A-','B+', 'B-','O+','O-','AB+', 'AB-',
    ]
    this.getUniversityBatch();
    this.getMSSYear();
    this.getBSSYear();


    $(".file-upload").on('change', function () {
      //readURL(this);
    });

    $(".upload-button").on('click', function () {
      $(".file-upload").click();
    });

  }

  getUniversityBatch() {
    for (let index = 1; index < 61; index++) {
      this.UniversityBatchList.push('Batch ' + index);
    }
    return this.UniversityBatchList;
  }

  getMSSYear() {
    for (let index = 1970; index < new Date().getFullYear() + 1; index++) {
      this.MSSYearList.push(index);
    }
    return this.MSSYearList;
  }

  getBSSYear() {
    for (let index = 1970; index < new Date().getFullYear() + 1; index++) {
      this.BSSYearList.push(index);
    }
    return this.BSSYearList;
  }

  onFormSubmit(e) {
    this.globalService.showSpinner(true);
    if(this.fileData){
      this.uploadFile(this.fileData);
    } else {
      this.registration();
    }

    e.preventDefault();
  };

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
      //this.uploadFile(this.fileData);
    }
  }

  uploadFile(fileData) {
    this.memberService.uploadFile(fileData).subscribe(result => {
      console.log(result);
      this.uploadedFilePath = result;
      this.registration();
    }, err => {
      console.log(err);
      this.globalService.showSpinner(false);
    })
  }

  registration(){
    if(this.uploadedFilePath) this.registrationFormData.ProfilePicture = this.uploadedFilePath;
      console.log(this.registrationFormData);
      this.globalService.showSpinner(true);
      this.memberService.create(this.registrationFormData).subscribe(result => {
        console.log(result);
        this.globalService.showSpinner(false);
        this.form.instance.resetValues();
        this.router.navigateByUrl('/login');

        this.globalService.showSwal('Success', 'Registration Done. Your username and password is sent to your registered email.', 'success');
      }, err => {
        console.log(err);
        this.globalService.showSpinner(false);
      });
  }

}
