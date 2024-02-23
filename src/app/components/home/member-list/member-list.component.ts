import { Component, OnInit } from '@angular/core';
import { AutenticationService } from '../../../shared/service/autentication/autentication.service';
import { HttpService } from '../../../shared/service/http/http.service';
import { GlobalService } from '../../../shared/service/global/global.service';
import notify from 'devextreme/ui/notify';
import Swal from 'sweetalert2';
import { MemberService } from 'src/app/shared/service/member/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  loginUser: any;
  profilePictureFullUrl: string;

  constructor(public autenticationService: AutenticationService,
    public globalServices: GlobalService, public http: HttpService, public memberService : MemberService) {

  }
  ngOnInit(): void {
    this.loginUser = this.autenticationService.getSessionUser();

    this.getAllMembers();
    this.profilePictureFullUrl =   this.globalServices.domain+"upload/";
  }
  /*[21:00, 18/01/2023] Tonmoy Rudra Bsrm It Ctg: To get all event registration with this API.

  http://alumnibackend.rexsystemsbd.com/swagger/ui/index#/Transaction/Transaction_GetAll

  where EventId=0 (static)
  [21:02, 18/01/2023] Tonmoy Rudra Bsrm It Ctg: after this you approve this transection with this API

  http://alumnibackend.rexsystemsbd.com/swagger/ui/index#/Transaction/Transaction_Approve */
  SelectedRegionList = [];
  memberList = [];
  getAllMembers() {

    this.memberList = [];
    this.globalServices.showSpinner(true);
    this.memberService.getAllMember().subscribe(result => {
      this.globalServices.showSpinner(false);
      var data = JSON.parse(JSON.stringify(result));
      // Using Set to remove duplicates based on email
      let uniqueEmails = new Set(data.map(obj => obj.Email));

      // Converting unique emails back to objects
      let uniqueObjects = [...uniqueEmails].map(Email => {
          return data.find(obj => obj.Email === Email);
      });
      this.memberList = uniqueObjects.sort(this.globalServices.dynamicSort('CreateDate'));
      this.memberList = this.memberList.filter(s => s.IsActive == true);
       //+ this.memberInfo.ProfilePicture : '../../../../assets/images/team1.jpg';




    }, err => {
      this.globalServices.showSpinner(false); 
      notify('Something wrong. Data failed to load.', 'error', 2000);
    })
 

  }
 

  onRowPrepared(e) {
    if (e.rowElement.rowIndex % 2 != 0) {
      e.rowElement.bgColor = "#C0FFC0";
    }
  }

  isDialogVisible: boolean = false;
  memberDetails = {};
  ShowDetails(EventData) {
    this.memberDetails = {};
    this.memberDetails = EventData;
    this.isDialogVisible = true;
  }
  closeDetails() {
    this.isDialogVisible = false;
  }

}
