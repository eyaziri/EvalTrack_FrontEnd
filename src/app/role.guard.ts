import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Exemple d'authentification

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const userRole = this.authService.getUserRole(); // Supposons que vous récupérez le rôle de l'utilisateur depuis le service d'authentification
    const requiredRole = next.data['role']; // Récupère le rôle requis pour accéder à cette route

    if (userRole !== requiredRole) {
      // Si le rôle de l'utilisateur ne correspond pas à celui requis, rediriger vers une autre page
      this.router.navigate(['/access-denied']); // Exemple de page d'accès interdit
      return false;
    }
    return true;
  }
}
