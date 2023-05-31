import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  const role = route.data['role'];
  const isAuthorized = authService.getCurrentUser().pipe(map((user) => user?.roles?.includes(role)));    
  return authService.isLoggedIn().pipe(
    tap((isLoggenin) => {
      if(!isLoggenin) {
        router.navigate(['/login']);
      }
    })    
  );
};
