import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GetCategorieResponse } from 'src/app/models/interfaces/categories/responses/GetCategorieResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    })
  }


  constructor(private http: HttpClient, private cookie: CookieService) {}

  getAllCategories(): Observable<Array<GetCategorieResponse>> {
    return this.http.get<Array<GetCategorieResponse>>(
      `${this.API_URL}/categories`,
      this.httpOptions
    );
  }

  deleteCategory(requestDatas: { category_id: string }): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/category/delete`, {
      ...this.httpOptions,
      params: {
        category_id: requestDatas?.category_id,
      },
    });
  }
}
