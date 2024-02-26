import { AutenticationService } from './../../../shared/service/autentication/autentication.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginUser: any;
  isNoticeDialogVisible: boolean;
  bKashNumber = '01716498248, 01610009090';
  nagadNumber = '01715500243, 01716498248'
    // DX Scroll View Config
    scrollByContent = true;
    scrollByThumb = true;
    scrollbarMode: string = 'always';

  constructor(public autenticationService : AutenticationService,
     ) { }

  ngOnInit(): void {
    this.loginUser = this.autenticationService.getSessionUser();

  }
  showNotice(){
    this.isNoticeDialogVisible = true;
  }
}
