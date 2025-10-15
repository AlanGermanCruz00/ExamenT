import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
 


@Injectable({
  providedIn: 'root'
})

export class SinginService {
  constructor(
    private https: HttpClient,
  ) { }

  private basePath = environment.host + '/api/users';

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  singIn(email: string, password: string): Promise<any> {
    return this.https.post(`${this.basePath}/login`, { email, password }).toPromise().then((res: any) => {
      if (res?.response?.token) {
        localStorage.setItem('token', res.response.token); // Token 📁
      }
      return res;
    });
  }

  getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  logout() {
    localStorage.removeItem('token');
  }
}