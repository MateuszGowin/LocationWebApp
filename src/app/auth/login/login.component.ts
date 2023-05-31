import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/model/loginRequest';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{ 
  loginError!: string;

  loginForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });

  ngOnInit(): void {
       
  }

  constructor(private authService: AuthService,private router: Router){}
  login() {
    const val = this.loginForm.value;    
    const loginRequest: LoginRequest = {
      username: val.email!,
      password: val.password!,
    };
    
    this.authService.login(loginRequest).subscribe({
      next: (loginResponse) => {
        console.log("user "+loginResponse.username+" is loggen in"); 
        this.router.navigate([this.authService.getPathForRole(loginResponse.roles)])
      },
      error: (loginError) => {
        if(loginError.status === 401)
          this.loginError = 'Niepoprawny email lub hasło'        
      }
    });

  }

}
