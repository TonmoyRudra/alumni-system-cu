import { Component, OnInit } from '@angular/core';
//import * as DeviceDetector from 'device-detector-js';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
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
  //       // window.location.href = 'https://www.google.com/';
  //     }, 1500);
  //   }
  // }
}
