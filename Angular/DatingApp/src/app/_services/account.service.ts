import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { response } from 'express';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root',

})
@NgModule({
  declarations: [
    
  ],
  imports: [
    
    HttpClientModule
  ],
  providers: [],
  bootstrap: [],
})

export class AccountService {
  readonly APIUrl = "https://localhost:7239";
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.APIUrl + '/login', model).pipe(
      map((response :User) => {
        const user = response;
        if(user) {
          //storing information
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user);

        }
      })
    )
  }
  register(model:any){
    return this.http.post<User>(this.APIUrl + '/register', model).pipe(
      map(user =>{
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user
      })
    )
  }
  setCurrentUser(user: User){
    this.currentUserSource.next(user)
  }


  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null)
  }
}
