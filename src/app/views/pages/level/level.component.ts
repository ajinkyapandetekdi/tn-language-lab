import { Component, OnInit } from '@angular/core';
import { LevelService } from './level.service';
import { TelemetryService } from 'src/app/telemetry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LogsService } from 'src/app/logs.service';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {
  lesson: string;
  topic: string;
  isBuddyLogin =this.userService.isBuddyLoggedIn();
  isGuestUser: string | null;
  isHamburgerOn:boolean = false;
  currentlang:boolean = localStorage.getItem('lang') == 'en';

  constructor(private router:Router, public authService:AuthService, public userService: UserService, public levelService: LevelService,  public telemetryService: TelemetryService, private route: ActivatedRoute, private _router: Router, public logService: LogsService) { }
  
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.lesson = params.lesson
      this.topic = params.topic
    });
    this.isGuestUser = localStorage.getItem('guestUser');
  }
  
  gotoNextpage(){
    this.levelService.viewPage = this.levelService.viewPage + 1;
  }
  toggleLanguage(event: any) {
    if (event.target.checked) {
      this.currentlang=false
      this.switchToTamil();
    } else {
      this.switchToEnglish();
      this.currentlang = true;
    }
  }
  switchToTamil() {
    localStorage.setItem('lang', 'ta');
  }
  switchToEnglish() {
    localStorage.setItem('lang', 'en');
  }

  buddyLogin()
  {
    this.router.navigate(['/buddy-login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
