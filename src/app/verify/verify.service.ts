import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VerifyRequest } from '../model/verifyRequest';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  private verifyUrl='http://localhost:8080/user/verify';
  
  constructor(private http: HttpClient) { }

  verifyUser(verifyRequest: VerifyRequest):Observable<void> {
    return this.http.post<any>(`${this.verifyUrl}`,verifyRequest);
  }
}
