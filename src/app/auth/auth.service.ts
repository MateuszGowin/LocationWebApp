import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { LoginRequest } from '../model/loginRequest';
import { LoginResponse } from '../model/loginResponse';
import { Role } from '../model/role';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl='http://localhost:8080/api/auth/signin';  
  user!: User;

  constructor(
    private router: Router,
    private http: HttpClient,     
  ) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}`,loginRequest)
    .pipe(tap((res) => {
      this.setToken(res)
      this.user = this.getUser(res.accessToken);
    }));
  }
  private setToken(loginResponse: LoginResponse): void {    
    console.log(loginResponse.accessToken);
    localStorage.setItem('accessToken',loginResponse.accessToken);
  }
  logout() {
    console.log("Wylogowano");
    localStorage.removeItem('accessToken');
  }
  getPathForRole(roles: string[]): string{
    if(roles.includes("ROLE_ADMIN")){
      console.log("Jest Adminem");      
      return "/places";
    } else {
      console.log("Nie jest adminem");
      this.logout();
      return "/login";
    }    
  }
  getCurrentUser(): Observable<User|undefined> {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) {
      const encodedPayload = accessToken.split(".")[1];
      const payload = window.atob(encodedPayload);  
      return of(JSON.parse(payload));
    } else {
      return of(undefined);
    }
  }
  getUser(token: string): User{
    return JSON.parse(window.atob(token.split(".")[1])) as User;
  }
  getCUser(): User{
    return this.user;
  }
  isLoggedIn(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map((user) => !!user),
      catchError(() => of(false))
    );
  }

  getToken(){
    return localStorage.getItem('accessToken');
  }
  
}
