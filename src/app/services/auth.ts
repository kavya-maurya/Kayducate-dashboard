import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthUser {
  id: string | null;
  name: string;
  email: string;
  role: string;
  token: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<AuthUser | null>(this.getStoredUser());
  user$: Observable<AuthUser | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/API/auth/login`, { email, password }).pipe(
      tap((res) => this.handleAuthResponse(res))
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/API/auth/register`, { name, email, password });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  get currentUser(): AuthUser | null {
    return this.userSubject.value;
  }

  private handleAuthResponse(res: any): void {
    const token = res?.accessToken || res?.token || null;
    const user: AuthUser = {
      id: res?._id || res?.id || res?.user?._id || res?.user?.id || null,
      name: res?.name || res?.user?.name || '',
      email: res?.email || res?.user?.email || '',
      role: res?.role || res?.user?.role || 'student',
      token,
    };

    if (token) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
    } else {
      this.userSubject.next(null);
    }
  }

  private getStoredUser(): AuthUser | null {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      return null;
    }

    try {
      const parsed = JSON.parse(storedUser);
      return parsed?.token ? parsed : null;
    } catch {
      return null;
    }
  }
}
