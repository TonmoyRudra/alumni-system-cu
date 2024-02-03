import { AutenticationService } from './../../service/autentication/autentication.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  UserName: any;
  Password :any;
  loginUser: any;
  constructor(public autenticationService: AutenticationService) { }

  isAdmin = false;
  ngOnInit(): void {
    this.loginUser = this.autenticationService.getSessionUser();

    if (this.loginUser.UserName == "admin") {
      this.isAdmin = true;
    }
  }

  logout(){
    this.autenticationService.logout();
    window.location.reload();
    this.loginUser = this.autenticationService.getSessionUser();
  }
}
