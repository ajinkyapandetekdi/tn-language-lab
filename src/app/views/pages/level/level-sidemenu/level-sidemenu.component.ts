import {Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelService } from '../level.service';
import { TelemetryService } from '../../../../telemetry.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-level-sidemenu',
  templateUrl: './level-sidemenu.component.html',
  styleUrls: ['./level-sidemenu.component.scss']
})
export class LevelSidemenuComponent implements OnInit {
  constructor(public userService: UserService, public telemetryService: TelemetryService, public levelService: LevelService, private route: ActivatedRoute, private _router: Router) { }
  Items: any;
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      if(params.lesson && params.topic){
        this.levelService.getLesson(params.lesson, params.topic)
      }else{
        this._router.navigate(['/level'], {
          queryParams: {
            lesson: "speakWithMe",
            topic: "lesson1"
          }
        });
      }
    }
  );
  }

  ngAfterViewInit(){
    let instance = this;
    setTimeout(function(){
      instance.levelService.loadUserData();
    },0)

  }
}
