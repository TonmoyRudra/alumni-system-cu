import { filter } from 'rxjs/operators';
import { UploaderService } from './../../service/uploader/uploader.service';
import { GlobalService } from './../../service/global/global.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uploader-from-excel',
  templateUrl: './uploader-from-excel.component.html',
  styleUrls: ['./uploader-from-excel.component.css'],
})
export class UploaderFromExcelComponent implements OnInit {
  @Output() showUploaderClick = new EventEmitter<any>();
  @Input() catagory: string;
  @Input() subcatagory: string;
  @Input() title: string;
  @Input() downloadCSVTempleteLink: string;

  datasource: any = [];
  columns: any = [];
  fileData: File;
  failedListFound: boolean = false;
  datasourceFailed: any;

  constructor(
    public globalService: GlobalService,
    public uploaderService: UploaderService
  ) { }

  ngOnInit(): void {
    this.failedListFound = false;
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.onFileChange($event);
    // this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler($event) {
    this.onFileChange($event);
  }

  onFileChange(event: any) {
    this.failedListFound = false;

    /* wire up file reader */
    const target: DataTransfer = event.target as DataTransfer;
    // if (target.files.length !== 1) {
    //   this.globalService.showSwal('Warning!!' ,'Cannot use multiple files', 'warning');
    //   throw new Error('Cannot use multiple files');
    // }

    if (target.files[0]) {
      this.fileData = target.files[0];
      if (this.fileData.name.split('.').pop() != 'csv') {
        this.globalService.showSwal(
          'Warning!!',
          'Please choose only CSV file format.',
          'warning'
        );
      } else {
        this.datasource = [];
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(this.fileData);
        reader.onload = (e: any) => {
          /* create workbook */
          const binarystr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

          /* selected the first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];

          /* save data */
          const data = XLSX.utils.sheet_to_json(ws,{raw:false}); // to get 2d array pass 2nd parameter as object {header: 1}
          let slNo = 1;
          this.datasource = data;
          // this.datasource.forEach((element) => {
          //   element.slNo = slNo++;
          // });
          if (this.subcatagory === 'users') {
            this.setContactPrefixForUserUpload()
          }

          this.makeColumn();
          // this.columns = []; // Make Column for Grid
          // if (this.datasource.length != 0) {
          //   const key = Object.keys(this.datasource[0]);
          //   key.forEach((element) => {
          //     if (element == 'slNo') {
          //       this.columns.unshift(element);
          //     } else {
          //       this.columns.push(element);
          //     }
          //   });
          // }
          console.log(this.datasource); // Data will be logged in array format containing objects
        };

      }
    }
    // Clear the file picker.
    let fileDropElemRef: any = document.getElementById("fileDropRef");
    fileDropElemRef.value = "";
  }

  submitFile(e) {

    if (this.datasource.length == 0) {
      this.globalService.showSwal('No file or data was found!', 'Please select a valid file with data.','warning')
    } else {
      Swal.fire({
        title: 'Think!!',
        text: 'Do you want to upload bulk data?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'No',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Upload!',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.globalService.showSpinner(true);
          this.failedListFound = false;
          this.uploaderService
            .uploadFile(this.fileData, this.subcatagory)
            .subscribe(
              (result) => {
                console.log(result);
                if (result.status == "ok") {


                  if (this.subcatagory == 'staff-mapping' || this.subcatagory == 'users'
                    || this.subcatagory == 'branch-sub-district') {

                    // For Jahid vai api, staff mapping,  Users, Branch-subdistrict mapping
                    // "resultset": [
                    //   { }
                    // ]
                    if (result.resultset.length > 0) {
                      let failedList = result.resultset.filter(s => s.reason != null);
                      this.datasource = [];
                      if (failedList.length > 0) {
                        this.failedListFound = true;
                        this.datasource = failedList;
                        console.log(this.datasource);
                        this.makeColumn();
                        this.globalService.showSwal(
                          'Partially Failed',
                          'You have some failed list which one have not been uploaded',
                          'warning'
                        );
                      } else {
                        this.globalService.showSwal(
                          'Success',
                          'Data upload sucessfully done.',
                          'success'
                        );
                        this.datasource = [];
                        this.backTolist();
                      }
                    }

                  } else if (this.subcatagory == 'zone-region-branch' || this.subcatagory == 'district-zone') {
                    // For Sakib vai API, zone-region-branch and district-zone
                    // "result": {
                    //   "is_fully_success": false,
                    //   "failed_reason": "Not Found!",
                    //   "mapping_failed_list": []
                    // }
                    if (result?.result?.mapping_failed_list.length > 0) {
                      // failed list found.
                      this.failedListFound = true;
                      result?.result?.mapping_failed_list.forEach(element => {
                        element.reason = result?.result?.failed_reason;
                      });
                      this.datasource = result?.result?.mapping_failed_list;
                      this.makeColumn();
                      this.globalService.showSwal(
                        'Partially Failed',
                        'You have some failed list which one have not been uploaded',
                        'warning'
                      );

                    } else {
                      this.globalService.showSwal(
                        'Success',
                        'Data upload sucessfully done.',
                        'success'
                      );
                      this.datasource = [];
                      this.backTolist();
                    }

                  } else {
                    this.globalService.showSwal(
                      'Uploaded!!',
                      'Data is uploading..... It will take some time. Please wait and check the list',
                      'success'
                    );
                    this.datasource = [];
                    this.backTolist();
                  }
                  this.globalService.showSpinner(false);


                }
              },
              (err) => {
                console.log(err);
                this.globalService.showSpinner(false);
                var subString = 'Requested row is duplicate ';
                if (err.error.message.includes(subString)) {
                  // 👉️ substring is contained in string

                  var jsonString = JSON.parse(err.error.message.split(subString)[1]);
                  console.log(jsonString);
                  this.globalService.showSwal(
                    'Bad Request!!',
                    subString + 'For pin: ' + jsonString.pin,
                    'error'
                  );
                } else {
                  this.globalService.showSwal(
                    'Bad Request!!',
                    err.error.message,
                    'error'
                  );
                }


              }
            );
        }
      });
    }
  }
  stringDivider(str, width, spaceReplacer) {
    if (str.length > width) {
      var p = width
      for (; p > 0 && str[p] != ' '; p--) {
      }
      if (p > 0) {
        var left = str.substring(0, p);
        var right = str.substring(p + 1);
        return left + spaceReplacer + this.stringDivider(right, width, spaceReplacer);
      }
    }
    return str;
  }
  makeColumn() {
    this.columns = []; // Make Column for Grid
    if (this.datasource.length != 0) {
      const key = Object.keys(this.datasource[0]);
      key.forEach((element) => {
        if (element == 'slNo' || element == 'sl') {
          this.columns.unshift(element);
        } else {
          this.columns.push(element);
        }
      });
    }
  }
  backTolist() {
    this.showUploaderClick.emit(false);
  }

  downloadTemplete() {
    if (this.downloadCSVTempleteLink) {
      window.open(this.downloadCSVTempleteLink, '_blank');
    } else {
      Swal.fire('Warning', 'No Download file found.', 'warning');
    }
  }

  private setContactPrefixForUserUpload() {
    this.datasource.map((x) => {
      x.contact_no = x?.contact_no ? '0' + x?.contact_no.toString() : '';
    })
  }
}
