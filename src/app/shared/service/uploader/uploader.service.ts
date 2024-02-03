import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from '../global/global.service';
@Injectable({
  providedIn: 'root',
})
export class UploaderService {
  masterDataUploadAPIOld =  this.globalService.api_BaseURL + '/masterdata/upload';
  masterDataUploadAPI =  this.globalService.api_BaseURL + '/master-data/upload';

  // https://hub.sensor.buzz/masterdata-upload/api/v1/masterdata/upload/district-zone
  fileUploaderAPI = this.globalService.domain + 'upg-files/api/v1';

  host = this.globalService.domain;

  // fileUploaderAPI = 'http://localhost:3002/api/v1/files/';
  constructor(
    private router: Router,
    private http: HttpClient,
    public globalService: GlobalService
  ) {}

  uploadFile(file, typeModule) {
    const formData = new FormData();
    formData.append('file', file);

    if(typeModule =='geolocation'){
      return this.http
      .post<any>(this.masterDataUploadAPIOld + '/' + typeModule, formData)
      .pipe(
        map((x: Response) => x),
        map((x: any) => x),
        catchError((error: Response) => {
          return throwError(error);
        })
      );
    } else {
      return this.http
      .post<any>(this.masterDataUploadAPI + '/' + typeModule, formData)
      .pipe(
        map((x: Response) => x),
        map((x: any) => x),
        catchError((error: Response) => {
          return throwError(error);
        })
      );
    }


  }

  allFileUpload(files) {
    const formData = new FormData();
    formData.append('Content-Type', 'multipart/form-data');
    files.forEach((element) => {
      formData.append('files', element);
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Host-Override': this.host,
      }),
    };

    return this.http
      .post<any>(this.fileUploaderAPI + '/files/upload', formData, httpOptions)
      .pipe(
        map((x: Response) => x),
        map((x: any) => x),
        catchError((error: Response) => {
          return throwError(error);
        })
      );
  }

  // deleteFile(resourceId, fileId) {
  //   return this.http
  //     .delete(
  //       'http://localhost:3002/api/v1/files/resources/' +
  //         resourceId +
  //         '/' +
  //         fileId +
  //         '/remove'
  //     )
  //     .pipe(
  //       map((x: Response) => x),
  //       map((x: any) => x),
  //       catchError((error: Response) => {
  //         return throwError(error);
  //       })
  //     );
  // }
}
