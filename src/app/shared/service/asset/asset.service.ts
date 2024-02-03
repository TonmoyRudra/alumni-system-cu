import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private http: HttpClient, public globalService: GlobalService) {}

  assetAPI = this.globalService.apiURL_CohortConfiguration + '/v1/asset';

  createAsset(body) {
    return this.http.post(this.assetAPI, body).pipe(
      map((x: Response) => x),
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(error);
      })
    );
  }

  editAsset(body) {
    return this.http.patch(this.assetAPI + '/update', body).pipe(
      map((x: Response) => x),
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(error);
      })
    );
  }

  getAllAssets(): Observable<any> {
    return this.http.get(this.assetAPI + '/all').pipe(
      map((x: Response) => x),
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(error);
      })
    );
  }

  getAssetById(id) {
    return this.http.get(this.assetAPI + '/' + id).pipe(
      map((x: Response) => x),
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(error);
      })
    );
  }

  deleteAssetById(id) {
    return this.http.delete(this.assetAPI + '/delete/' + id).pipe(
      map((x: Response) => x),
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(error);
      })
    );
  }
}
