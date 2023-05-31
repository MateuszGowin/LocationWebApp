import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoverPasswordService } from './recover-password.service';
import { ResetPassword } from '../model/resetPassword';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit{
  
  recoverForm = new FormGroup({
    newPassword: new FormControl('',Validators.compose([
      Validators.minLength(8),
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    ]))
  });

  email!: string;
  token!: string;
  resetPassword = new ResetPassword();
  
  constructor(
    private activeRoute: ActivatedRoute,
    private recoverPasswordService: RecoverPasswordService,
    private router: Router,
  ) {
    this.email = this.activeRoute.snapshot.queryParams['email'];
    this.token = this.activeRoute.snapshot.queryParams['token'];
    if(!this.email || !this.token){
      this.router.navigate(['/login']) 
    }
  }
  ngOnInit(): void {
    this.resetPassword.email = this.email;
    this.resetPassword.token = this.token; 
  }
  recover() {
    this.resetPassword.password = this.recoverForm.value.newPassword!;  
    this.recoverPasswordService.resetPassword(this.resetPassword).subscribe(() =>(   
        this.router.navigate(['/login'])      
    ));
  }
}
