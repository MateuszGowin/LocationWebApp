import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public username: Observable<string|undefined>
  constructor(private authService: AuthService, private router: Router){    
    this.username = this.authService.getCurrentUser().pipe(map((user) => user?.firstName));       
  }
  

}
