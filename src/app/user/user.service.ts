import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: any;
  buddyUserData: any;
  constructor() { }

  getUser() {
    const token = localStorage.getItem('token');

    if (!!token) {
      this.userData = jwt_decode(token);
      return this.userData;
    } else {
      return false;
    }
  }

  getBuddyUser() {
    const token2 = localStorage.getItem('buddyToken')
    if (!!token2) {
      this.buddyUserData = jwt_decode(token2);
      return this.buddyUserData;
    } else {
      return false;
    }
  }
}