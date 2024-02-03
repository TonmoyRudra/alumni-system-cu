import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient, public globalService: GlobalService) {}
  apiUrl = this.globalService.api_BaseURL + '/ImageConfig';

  getAllGalleryImages() {
    return this.http.get(this.apiUrl + '/GetAll').pipe(
      map((x: Response) => x),
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(error);
      })
    );
  }
}
