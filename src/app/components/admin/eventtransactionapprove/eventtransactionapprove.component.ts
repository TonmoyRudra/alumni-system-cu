import { Component, OnInit } from '@angular/core';
import { AutenticationService } from '../../../shared/service/autentication/autentication.service';
import { HttpService } from '../../../shared/service/http/http.service';
import { GlobalService } from '../../../shared/service/global/global.service';
import notify from 'devextreme/ui/notify';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-eventtransactionapprove',
  templateUrl: './eventtransactionapprove.component.html',
  styleUrls: ['./eventtransactionapprove.component.css']
})
export class EventtransactionapproveComponent implements OnInit {
  loginUser: any;

  constructor(public autenticationService: AutenticationService,
    public globalServices: GlobalService, public http: HttpService) {

  }
  ngOnInit(): void {
    this.loginUser = this.autenticationService.getSessionUser();

    this.getAllEvents();
  }
  /*[21:00, 18/01/2023] Tonmoy Rudra Bsrm It Ctg: To get all event registration with this API.

  http://alumnibackend.rexsystemsbd.com/swagger/ui/index#/Transaction/Transaction_GetAll

  where EventId=0 (static)
  [21:02, 18/01/2023] Tonmoy Rudra Bsrm It Ctg: after this you approve this transection with this API

  http://alumnibackend.rexsystemsbd.com/swagger/ui/index#/Transaction/Transaction_Approve */
  SelectedRegionList = [];
  RegionList = [];
  getAllEvents() {

    this.RegionList = [];
    this.globalServices.showSpinner(true);
    this.http.get("/Transaction", { "eventId": 0 })
      .subscribe(
        d => {

          this.globalServices.showSpinner(false);
          var data = JSON.parse(JSON.stringify(d));

          data.forEach(element => {
            element["TotalCount"] = element["MemberCount"] + element["SpouseCount"] + element["ChildCount"] + element["DriverCount"] + element["OtherCount"];
          });

          this.RegionList = data.sort(this.globalServices.dynamicSort('CreateDate'));


        },
        e => {

          this.globalServices.showSpinner(false);
          console.log(e);
          notify('Something wrong. Data failed to load.', 'error', 2000);
        }
      );

  }
  Approve(Id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Approve this payment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.globalServices.showSpinner(true);
        this.http.post("/Transaction/Approve?transactionId=" + Id, {})
          .subscribe(
            d => {

              this.globalServices.showSpinner(false);
              if (d == 1) {
                notify("Transaction has been approved", 'success', 2000);
              } else {
                notify("Transaction has not been approved", 'error', 2000);
              }

              this.getAllEvents();


            },
            e => {

              this.globalServices.showSpinner(false);
              console.log(e);
              notify('Something wrong. Data failed to load.', 'error', 2000);
            }
          );
      }
    });


  }

  DeApprove(Id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to DisApprove this payment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.globalServices.showSpinner(true);
        this.http.post("/Transaction/DeApprove?transactionId=" + Id, {})
          .subscribe(
            d => {

              this.globalServices.showSpinner(false);
              if (d == 1) {
                notify("Transaction has been disapproved", 'success', 2000);
              } else {
                notify("Transaction has not been disapproved", 'error', 2000);
              }

              this.getAllEvents();


            },
            e => {

              this.globalServices.showSpinner(false);
              console.log(e);
              notify('Something wrong. Data failed to load.', 'error', 2000);
            }
          );
      }
    });

  }
  onRowPrepared(e) {
    if (e.rowElement.rowIndex % 2 != 0) {
      e.rowElement.bgColor = "#C0FFC0";
    }
  }

  isDialogVisible: boolean = false;
  EventData = {};
  ShowDetails(EventData) {
    this.EventData = {};
    this.EventData = EventData;
    this.isDialogVisible = true;
  }
  closeDetails() {
    this.isDialogVisible = false;
  }
}
