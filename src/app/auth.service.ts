import { Injectable } from '@angular/core';
import { HttpClientModule, HttpResponse, HttpClient } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router'
import { shareReplay, tap, catchError} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebRequestService, private router: Router) { }

  

  login(email: string, password: string){
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {

        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));

        
        console.log(res);
      })
      
  )

  }

  signup(email: string, password: string){
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {

        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));

        console.log("SIGN UP SUCESS");
        
      })
    )
  }

  logout(){
    this.removeSession();

    this.router.navigate(['/login']);
  }

  getAccessToken(){
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken(){
    return localStorage.getItem('x-refresh-token');
  }

  getUserId(){
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string){
    localStorage.setItem('x-access-token', accessToken);
  }

  private setSession(userId: string, accessToken: any, refreshToken: any){
    localStorage.setItem("user-id", userId);
    localStorage.setItem("x-access-token", accessToken);
    localStorage.setItem("x-refresh-token", refreshToken);
  }

  private removeSession(){
    localStorage.removeItem("user-id");
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("x-refresh-token");
  }

  

  

}
