import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TelemetryService } from '../telemetry.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  errorMessage: string;
  loginError: boolean = false;
  passwordLength: number;
  isPasswordVisible: boolean = false;

  constructor(public userService: UserService, public telemetryService: TelemetryService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.telemetryService.impression("Login", "/login");
        $(document).ready(function(){
        $("#eng").click(function(){
          localStorage.setItem('lang','en');
          document.location.reload();
        });
        $("#de").click(function(){
          localStorage.setItem('lang','ta');
          document.location.reload();
        });
        });
  }
  loginAsGuest(){
    localStorage.removeItem('token');
    this.telemetryService.interact("LoginAsGuest", 'Login')
    localStorage.setItem('guestUser', 'true');
    this.router.navigate(['/level']);
  }
  login() {
    this.telemetryService.interact("Submit", 'Login')
    this.authService.login(this.email, this.password).subscribe(
      (data) => {
        if (data.dataStatus)
        {
          localStorage.setItem('token', data?.records?.token);
          let users = this.userService.getUser();
          this.telemetryService.log(
            'api_login_call',
            'Successfully logged in',
            'login',
            users
          );

          this.router.navigate(['/level']);

          this.loginError = false;
        }else{
          this.telemetryService.error(data?.message, {
            err: data?.message, errtype: data?.status
          });
          // alert(data.message)
          this.loginError = true;
        }
      },
      error => {
        console.log(error)
        this.errorMessage = error.message;
      }
    );
  }
  calculatePasswordLength() {
    this.passwordLength = this.password ? this.password.length : 0;
  }
  ngOnChanges() {
    this.calculatePasswordLength();
  }
  getPasswordIcon() {
    return this.passwordLength !== 0 ? '../../assets/images/eye.svg' : '../../assets/images/password.svg';
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}
