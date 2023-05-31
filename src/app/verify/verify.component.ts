import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyService } from './verify.service';
import { VerifyRequest } from '../model/verifyRequest';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit{

  email!: string;
  token!: string;
  verifyRequest = new VerifyRequest();

  constructor(
    private activeRoute: ActivatedRoute,
    private verifyService: VerifyService,
    private router: Router,
  ) {
    this.email = this.activeRoute.snapshot.queryParams['email'];
    this.token = this.activeRoute.snapshot.queryParams['token'];
    if(!this.email || !this.token) {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit(): void {
    this.verifyRequest.email = this.email;
    this.verifyRequest.token = this.token;
    this.verify();
  }

  verify() {
    this.verifyService.verifyUser(this.verifyRequest).subscribe(() =>(      
      this.router.navigate(['/login'])
    ));
  }
}
