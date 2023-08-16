import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TelemetryService } from '../telemetry.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import { Location } from '@angular/common';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-buddy-login',
  templateUrl: './buddy-login.component.html',
  styleUrls: ['./buddy-login.component.scss']
})
export class BuddyLoginComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string;
  loginError: boolean = false;
  passwordLength: number;
  isPasswordVisible: boolean = false;
  lockSVG = '../../assets/images/eye.svg';
  eyeSVG = '../../assets/images/password.svg';

  constructor(public userService: UserService,
    public telemetryService: TelemetryService,
    private authService: AuthService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.telemetryService.impression('BuddyLogin', '/buddy-login', 'ET');
  }

  loginAsBuddy() {
    this.telemetryService.interact('Submit', 'BuddyLogin', 'NT');
    if(this.userService.getUser().emis_username === this.email)
    {
      alert("User Already Exists");
      return;
    }
    
    this.authService.login(this.email, this.password).subscribe(
      (data) => {
        if (data.dataStatus) {
          localStorage.setItem('buddyToken', data?.records?.token);
          let users = this.userService.getBuddyUser();
          this.telemetryService.log(
            'api_login_call',
            'Successfully logged in',
            'BuddyLogin',
            users,
            'ET'
          );

          window.location.href = '/level';

          this.loginError = false;
        } else {
          this.telemetryService.error(
            data?.message,
            {
              err: data?.message,
              errtype: data?.status,
            },
            'DT'
          );
          this.loginError = true;
        }
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.message;
      }
    );
  }
  switchToEnglish() {
    localStorage.setItem('lang', 'en');
    document.location.reload();
  }
  switchToTamil() {
    localStorage.setItem('lang', 'ta');
    document.location.reload();
  }

  calculatePasswordLength() {
    this.passwordLength = this.password ? this.password.length : 0;
  }
  ngOnChanges() {
    this.calculatePasswordLength();
  }
  getPasswordIcon() {
    return this.passwordLength !== 0 ? this.lockSVG : this.eyeSVG;
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}
