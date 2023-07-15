import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly apiUrl = 'https://localhost:7087/api/Authentication/login';
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor(private http: HttpClient, private router: Router) { }


  login(username: string, password: string): Observable<boolean> {
    const data = {username, password };
return this.http.post(`${this.apiUrl}`, data, { observe: 'response' })
.pipe(
  map((response: { status: number; }) => {
    if (response.status === 200) {
        localStorage.setItem('Admin', JSON.stringify(data));
       localStorage.setItem('lastActivityW', JSON.stringify(Date.now()));
      this.startTimer();
      return true;
    } else {
      return false;
    }
  })
);
 
} 


  logout(): void {
    localStorage.removeItem('Admin');
    localStorage.removeItem('lastActivityW');
    this.stopTimer();
   
}


private startTimer(): void {
  this.timer = setTimeout(() => {
      this.logout();
      this.router.navigate(['/login']);
  }, 120 * 60 * 1000);

  document.addEventListener('click', this.resetTimerHandler);
  document.addEventListener('keypress', this.resetTimerHandler);
}

private stopTimer(): void {
  if (this.timer) {
      clearTimeout(this.timer);
      document.removeEventListener('click', this.resetTimerHandler);
      document.removeEventListener('keypress', this.resetTimerHandler);
  }
}

private resetTimer(): void {
  this.stopTimer();
  this.startTimer();
}

private resetTimerHandler = () => {
  this.resetTimer();
}

isLoggedIn(): boolean {
  return !!localStorage.getItem('Admin');
}

}
