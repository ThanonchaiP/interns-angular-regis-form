import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<User>;
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(null!);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(data: User) {
    return this.http
      .post(`${this.apiUrl}/users/sign_in`, {
        user: data,
      })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('access_token', res.jwt);
          this.getUserProfile().subscribe((res: any) => {
            this.currentUserSubject.next(res.user);
            // localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['show'], { replaceUrl: true });
          });
        },
      });
  }

  getUserProfile() {
    return this.http.get(`${this.apiUrl}/users/me`);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  logout() {
    if (this.isLoggedIn) {
      this.http.delete(`${this.apiUrl}/users/sign_out`).subscribe(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      });
    }
    this.currentUserSubject.next(null!);
    this.router.navigate(['login']);
  }
}
