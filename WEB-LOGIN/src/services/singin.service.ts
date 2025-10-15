import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  // ✅ basePath corregido, sin duplicar /api
  private basePath = environment.hostApi + '/users';

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  signIn(email: string, password: string): Promise<any> {
    return this.http.post(`${this.basePath}/login`, { email, password }, { withCredentials: true }).toPromise().then((res: any) => {
        if (res?.response?.token) {
          localStorage.setItem('token', res.response.token);
        }
        return res;
      })

      .catch(err => {
        console.error('❌ Error al hacer login:', err);
        throw err;
      });
  }

  getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
      withCredentials: true
    };
  }

  logout() {
    localStorage.removeItem('token');
  }
}
