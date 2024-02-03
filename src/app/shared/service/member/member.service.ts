import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http: HttpClient, public globalService: GlobalService) {}

  apiUrl = this.globalService.api_BaseURL + '/Member';
  transectionApiUrl = this.globalService.api_BaseURL + '/Transaction';
  uploadApiUrl = this.globalService.api_BaseURL + '/Upload';

  create(body) {
    return this.http.post(this.apiUrl + '/Save', body).pipe(
      map((x: Response) => x),
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(error);
      })
    );
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.uploadApiUrl, formData).pipe(
      map((x: Response) => x),
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(error);
      })
    );
  }
  // editAsset(body) {
  //   return this.http.patch(this.assetAPI + '/update', body).pipe(
  //     map((x: Response) => x),
  //     map((x: any) => x),
  //     catchError((error: Response) => {
  //       return throwError(error);
  //     })
  //   );
  // }

  // getAllAssets(): Observable<any> {
  //   return this.http.get(this.assetAPI + '/all').pipe(
  //     map((x: Response) => x),
  //     map((x: any) => x),
  //     catchError((error: Response) => {
  //       return throwError(error);
  //     })
  //   );
  // }

  getMemberById(id) {
    return this.http.get(this.apiUrl + '/GetById?id=' + id).pipe(
      map((x: Response) => x),
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(error);
      })
    );
  }

  registerEventTransection(body) {
    return this.http.post(this.transectionApiUrl + '/Save', body).pipe(
      map((x: Response) => x),
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(error);
      })
    );
  }

  getTransectionByMobile(eventid, mobile) {
    return this.http.get(this.transectionApiUrl + '/GetByMobile?eventId=' + eventid + '&mobile=' + mobile).pipe(
      map((x: Response) => x),
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(error);
      })
    );
  }

  // deleteAssetById(id) {
  //   return this.http.delete(this.assetAPI + '/delete/' + id).pipe(
  //     map((x: Response) => x),
  //     map((x: any) => x),
  //     catchError((error: Response) => {
  //       return throwError(error);
  //     })
  //   );
  // }
}
