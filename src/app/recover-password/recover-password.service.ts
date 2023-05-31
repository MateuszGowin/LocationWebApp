import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResetPassword } from '../model/resetPassword';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {
  private recoverUrl='http://localhost:8080/api/auth/resetPassword'; 

  constructor(private http: HttpClient) { }

  resetPassword(resetPassword: ResetPassword): Observable<void> {
    return this.http.post<any>(`${this.recoverUrl}`,resetPassword);
  }
}
