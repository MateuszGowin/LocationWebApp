import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';

export const appGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isLoggedIn().pipe(
    tap(isLoggedIn => {
      if(isLoggedIn) {
        router.navigate(['/places']);
      }
    }),
    map(isLoggedIn => !isLoggedIn)
  );
};
