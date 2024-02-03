import { Component, OnInit, } from '@angular/core';
import { AutenticationService } from '../../../shared/service/autentication/autentication.service';
import { List, Service } from '../service.service';
import { Router } from '@angular/router';

import {
  NgModule,  ViewChild, enableProdMode,
} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  DxDrawerComponent, DxDrawerModule, DxListModule, DxRadioGroupModule, DxToolbarModule,
} from 'devextreme-angular';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css']
})
export class AdminlayoutComponent implements OnInit {
  loginUser: any;


  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent;

  navigation: List[];

  showSubmenuModes: string[] = ['slide', 'expand'];

  positionModes: string[] = ['left', 'right'];

  showModes: string[] = ['push', 'shrink', 'overlap'];

  text: string;

  selectedOpenMode = 'shrink';

  selectedPosition = 'left';

  selectedRevealMode = 'slide';

  isDrawerOpen = true;

  elementAttr: any;

  constructor(public autenticationService : AutenticationService,public service: Service,public router: Router) {  
    this.text = service.getContent();
    this.navigation = service.getNavigationList();
  }

  toolbarContent = [{
    widget: 'dxButton',
    location: 'before',
    options: {
      icon: 'menu',
      onClick: () => this.isDrawerOpen = !this.isDrawerOpen,
    },
  }];

  ngOnInit(): void {
    this.loginUser = this.autenticationService.getSessionUser();    
  }

  onItemClick(e){
    this.router.navigateByUrl('/admin/' + e.itemData.url );
  }
}

