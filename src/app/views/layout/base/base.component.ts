import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
// import { AuthenticationService } from 'src/app/core/services/authentication.service';
// import { UserSessionService } from 'src/app/core/services/usersession.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { TelemetryService } from 'src/app/telemetry.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isLoading: boolean;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  displayModal: boolean;
  iat: any;
  timeleft: any;

  constructor(public telemetryService: TelemetryService, private router: Router,
    private idle: Idle,
    // private userSessionService:UserSessionService,
    // private authService:AuthenticationService
    ) {

    // Spinner for lazyload modules
    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
    idle.setIdle(1800);
    // sets a timeout period of 1800 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(10);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle';
      this.reset();
      this.displayModal=false;
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.onLogout();
      this.displayModal=false;
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState =  countdown.toString();
      this.displayModal=true;
    });

    // sets the ping interval to 15 seconds
    // keepalive.interval(15);

    // keepalive.onPing.subscribe(() => (this.lastPing = new Date()));
    if (window.location.pathname.includes('/login')) {
      idle.stop();
    } else {
      idle.watch();
      this.timedOut = false;
    }


  }

  ngOnInit(): void {
    // this.iat = this.userSessionService.iat();
    // this.expireLogout();
  }
  reset() {
    this.idle.watch();
    //xthis.idleState = 'Started.';
    this.timedOut = false;
  }
  onLogout() {
    this.idle.stop();
    // var path = this.userSessionService.localStorageSessionKey;
    // localStorage.removeItem(path);
    // this.authService.logOut();
    this.telemetryService.end();
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }

  displayModalbutton(){

  }

  expireLogout() {
    const result = new Date((this.iat + 19800) * 1000)
      .toISOString()
      .slice(11, 19);
    const [hr, min, sec] = result.split(':');
    var tokenTime = ((+hr) * 3600) + ((+min) * 60) + +sec;
    var currentTime =
      new Date().getHours() * 3600 +
      new Date().getMinutes() * 60 +
      new Date().getSeconds();
    if ((tokenTime + 14400) < currentTime) {
      this.onLogout();
      window.location.reload();
    } else {
      this.timeleft = (tokenTime + 14400) - currentTime;
      var interval = setInterval(() => {
        if (this.timeleft > 0) {
          this.timeleft--;
        } else {
          clearInterval(interval);
          this.onLogout();
          window.location.reload();
        }
      }, 1000);
    }
  }
  menuHide(){
    //$(".submenu").css("display", "none")
  }

}
