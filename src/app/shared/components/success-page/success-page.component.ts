import { GlobalService } from 'src/app/shared/service/global/global.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import * as DeviceDetector from 'device-detector-js';
import { AutenticationService } from '../../service/autentication/autentication.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css'],
})
export class SuccessPageComponent implements OnInit {
  multipass: any;
  accessToken: any;
  mainURLForOpenApp: string;

  constructor(
    public route: ActivatedRoute,
    public authService: AutenticationService,
    public globalService: GlobalService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.multipass = params.multipass;
      this.accessToken = params.access_token;
      if (this.multipass && this.accessToken) {
        this.authService.setToken(this.accessToken);
        this.authService.setSessionUser(this.accessToken);
        this.authService.setBracToken(this.multipass);
      }
    });
    //this.gotoPage();
  }

  // gotoPage() {
  //   const deviceDetector = new DeviceDetector();
  //   const userAgent = navigator.userAgent;
  //   const device = deviceDetector.parse(userAgent);

  //   console.log(device);

  //   if (device.device.type == 'desktop') {
  //     setTimeout(() => {
  //       const domain = new URL(window.location.href);
  //       window.location.href = domain.origin;
  //     }, 1500);
  //   } else {
  //     setTimeout(() => {
  //       this.openApp();
  //     }, 1500);
  //   }
  // }

  openApp() {
    const domainURL = this.globalService.domain.replace('https', 'intent');
    this.mainURLForOpenApp = '';
    this.mainURLForOpenApp =
      domainURL +
      'success?access_token=' +
      this.accessToken +
      '&multipass=' +
      this.multipass +
      '#Intent;action=android.intent.action.VIEW;scheme=https;end';
    console.log(this.mainURLForOpenApp);

    setTimeout(() => {
      document.getElementById('clickForApp').click();
    }, 500);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
