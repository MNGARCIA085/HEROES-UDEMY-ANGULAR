import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth: Auth | undefined;

  get auth(): Auth{
    // {... } es para asegurarme de no cambiarlo
    return {...this._auth!};
  }

  private baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
              .pipe(
                tap(auth => this._auth=auth),
                tap(auth => localStorage.setItem('id',auth.id))
              );
  }

  logout(){
    this._auth = undefined;
  }

}
