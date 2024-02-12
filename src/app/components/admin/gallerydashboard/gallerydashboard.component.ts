import { Component, OnInit } from '@angular/core';
import { AutenticationService } from '../../../shared/service/autentication/autentication.service';
import { HttpService } from '../../../shared/service/http/http.service';
import { GlobalService } from '../../../shared/service/global/global.service';
import { MemberService } from './../../../shared/service/member/member.service';
import notify from 'devextreme/ui/notify';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
@Component({
  selector: 'app-gallerydashboard',
  templateUrl: './gallerydashboard.component.html',
  styleUrls: ['./gallerydashboard.component.css']
})
export class GallerydashboardComponent implements OnInit {
  loginUser: any;

  constructor(public autenticationService: AutenticationService,
    public globalServices: GlobalService, public http: HttpService,
    public memberService: MemberService) {

  }
  ngOnInit(): void {
    this.loginUser = this.autenticationService.getSessionUser();
    this.getAllEvents();
  }
  GalleryList = [];
  getAllEvents() {

    this.GalleryList = [];
    this.globalServices.showSpinner(true);
    this.http.get("/ImageConfig/GetAll")
      .subscribe(
        d => {

          this.globalServices.showSpinner(false);
          let data = JSON.parse(JSON.stringify(d));
          this.GalleryList = data.sort(this.globalServices.dynamicSort('CreateDate'));
        },
        e => {

          this.globalServices.showSpinner(false);
          console.log(e);
          notify('Something wrong. Data failed to load.', 'error', 2000);
        }
      );
  }

  onRowPrepared(e) {
    if (e.rowElement.rowIndex % 2 != 0) {
      e.rowElement.bgColor = "#C0FFC0";
    }
  }

  ShowImageUrl(ImageUrl) {
    window.open(ImageUrl, "_blank");
  }
  logEvent(eventName, event) {
    switch (eventName) {
      case "RowInserting": {
        if (!this.fileData) {
          notify('Please select Image', 'error', 2000);
          event.cancel = true;
        }
      } break;
      case "InitNewRow": this.uploadButtonInit(); event.data.IsActive = true; break;
      case "EditingStart": this.uploadButtonInit(); break;
      case "RowInserted":
        this.Add(event.data);
        break;
      case "RowUpdated":
        // this.GalleryList.forEach(element => {
        //   if (element.Id.toString().toLowerCase() == event.key.toString().toLowerCase()) {
        //     this.Edit(element);
        //   }
        // });
        this.Edit(event.data);
        break;
      case "RowRemoved": this.deleteItem(event.data); break;
    }
  }

  Add(params) {
    if (!this.fileData) {
      notify('Please select Image', 'error', 2000);
      return;
    }
    this.uploadFile(this.fileData,params);
  }
  Edit(params) {
    this.globalServices.showSpinner(true);
    this.http.post("/ImageConfig/Edit", params)
      .subscribe((d) => {
        this.globalServices.showSpinner(false);
        if (d == 1) {
          notify("updated", 'success', 2000);
        } else {
          notify("not updated", 'error', 2000);
        }

        this.getAllEvents();

      }, (err) => {

        this.globalServices.showSpinner(false);
        notify('Something wrong. Data failed to load.', 'error', 2000);
      }
      );
  }
  deleteItem(params): void {
    var id = params["Id"];
    this.globalServices.showSpinner(true);
    this.http.post("/ImageConfig/Delete?id=" + id, {})
      .subscribe(d => {
        this.globalServices.showSpinner(false);

        if (d == 1) {
          notify("deleted", 'success', 2000);
        } else {
          notify("not deleted", 'error', 2000);
        }

        this.getAllEvents();

      }, e => {
        this.globalServices.showSpinner(false);
        notify('Something wrong. Data failed to load.', 'error', 2000);
      });

  }


  uploadButtonInit() {
    $(".upload-button").on('click', function () {
      $(".file-upload").click();
    });
    this.fileData = null;
  }


  uploadedFilePath: any;
  fileData: File;

  filePickerData(event) {
    const target: DataTransfer = event.target as DataTransfer;
    if (target.files && target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.profile-pic').attr('src', e.target.result);
      }
      reader.readAsDataURL(target.files[0]); // bind the picked image on a image src;
      this.fileData = target.files[0];
      console.log(target.files[0]);

    }
  }

  uploadFile(fileData, galleryObject) {
    this.globalServices.showSpinner(true);
    this.memberService.uploadFile(fileData).subscribe(result => {
      this.globalServices.showSpinner(false);

      this.uploadedFilePath = result;
      galleryObject["ImageUrl"] = this.globalServices.domain + "upload/" + this.uploadedFilePath;
      this.updateProfile(galleryObject);

    }, err => {
      this.globalServices.showSpinner(false);
      console.log(err);
    })
  }
  updateProfile(galleryObject) {

    this.globalServices.showSpinner(true);
    this.http.post("/ImageConfig/Post", galleryObject)
      .subscribe(
        d => {
          this.globalServices.showSpinner(false);
          notify("Image Added", 'success', 2000);

          this.getAllEvents();

          this.uploadButtonInit();
        },
        e => {

          this.globalServices.showSpinner(false);
          console.log(e);
          notify('Something wrong. Data failed to load.', 'error', 2000);
        }
      );
  }





}
