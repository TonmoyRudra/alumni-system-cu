import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { IErrorResponse } from '../../interface/error-response.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private spinner: NgxSpinnerService) {}
  // public buildType = 'prod';
  // public domain: string = 'https://upgbd.brac.net/'; // Prod Server

  //  public buildType = 'stage';
  //  public domain: string = 'https://upgapstg.brac.net/'; // Staging Server

  public buildType = 'dev';
  public domain = 'https://alumnibackend.rexsystemsbd.com/'; // Dev Server

  public api_BaseURL : string = this.domain + 'api';

  public SSOSiteURL =
    this.buildType == 'dev' ? 'https://school.jogajog.com.bd/' : this.domain;
  public ssoBracUrl =
    'http://sso.brac.net/auth/isoap/login/session?site=' + this.SSOSiteURL;
  public sheetTempleteURL = './assets/sheetTemplate/';
  public optionForm: any = {
    options: [{ name: '', isRequiredSubQuestion: false }],
  };
  public rowSize = 10;

  validationRegex = [
    {
      id: '1',
      value: '^[0-9]*$',
      displayName: 'Numeric',
    },
    {
      id: '2',
      value: '^[a-zA-Z]*$',
      displayName: 'Alphabet',
    },
    {
      id: '3',
      value: '^[a-zA-Z0-9]*$',
      displayName: 'Alphanumeric',
    },
    {
      id: '4',
      value: '^[+-]?(\\d+\\.?\\d*|\\.\\d+)$',
      displayName: 'Decimal',
    },
  ];
  showSwal(title: string, message: string, type: any) {
    // type = "success", "error", "warning", "info" or "question"
    // Swal.fire('OPS Sorry', 'Username or Password  not match', 'warning');
    // Swal.fire(title, message, type);
    Swal.fire({
      icon: type,
      title,
      //text: message
      html: message,
      allowOutsideClick: false,
    });
  }

  showSpinner(boolData : boolean){
    if(boolData) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }
  errorResponseHandler(error: IErrorResponse){
    if (error.code == 400 || error.code == 404 || error.code == 409) {
      this.showSwal(
        'Warning',
        error.message,
        'warning'
      );
    } else {
      this.showSwal(
        'Warning',
        'Something went wrong',
        'error'
      );
    }
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

  formattedDate(dateValue : string): string {
    var date = new Date(dateValue);

    // Get year, month, and day part from the date
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = year + "-" + month + "-"  + day;

    return formattedDate;
  }

 

}
      //
      // DropDown - 0
      // Textfield - 1
      // radio button 2
      // checkbox 3
      // multiple text field 4
      // label 5
      // multi select 6
      // text area 7
      // formula text field 8
