import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.loginApiUrl;

  constructor(private router: Router, private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const credentials = {records: { emis_username: email, emis_password: password }};
    return this.http.post(this.apiUrl, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('buddyToken');
    localStorage.removeItem('guestUser');
  }

  isLoggedIn(){
    const token = localStorage.getItem('token') || localStorage.getItem('guestUser');
    return !!token;
  }
}
