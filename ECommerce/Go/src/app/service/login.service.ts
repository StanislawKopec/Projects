import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _isLogged = new BehaviorSubject<boolean>(false);
  public isLogged = this._isLogged.asObservable();
  private _isNotLogged = new BehaviorSubject<boolean>(true);
  public isNotLogged = this._isNotLogged.asObservable();
  private _wrongData = new BehaviorSubject<boolean>(false);
  public wrongData = this._isNotLogged.asObservable();
  private _usernameExists = new BehaviorSubject<boolean>(true);
  public usernameExists = this._usernameExists.asObservable();
  private _loggedUser = new BehaviorSubject<string>('');
  public loggedUser = this._loggedUser.asObservable();

  public subscription: Subscription;
  public logged: boolean = false;
  baseUrl = 'https://goappapi.azurewebsites.net';
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.subscription = Subscription.EMPTY;
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/login/getUsers`);
  }
  login(username: string, password: string): void {
    this.subscription = this.http
      .get(`${this.baseUrl}/api/login/${username}/${password}`, {
        observe: 'response',
      })
      .subscribe((response) => {
        if (response.status == 200 && this.logged == false) {
          this.logged = true;
          this._isLogged.next(true);
          this._isNotLogged.next(false);
          this._wrongData.next(true);
          this._loggedUser.next(username);
        }
      });
  }
  logout(): void {
    this.subscription.unsubscribe();
    this.logged = false;
    this._isLogged.next(false);
    this._isNotLogged.next(true);
  }
  // For login/register
  getUser(username: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}/api/login/checkUsername/${username}`
    );
  }
  registerUser(username: string, password: string): void {
    console.log({
      username,
      password,
    });
    this.http
      .post(`${this.baseUrl}/api/login/register`, {
        username,
        password,
      })
      .subscribe((response) => {});
  }
}
