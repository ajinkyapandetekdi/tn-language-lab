import { Component, HostListener, OnInit } from '@angular/core';
import { SpinnerComponent } from './views/component/spinnercomponent/spinner.component';
import { TelemetryService } from './telemetry.service';
import { LogsService } from './logs.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  spinnerComponent = SpinnerComponent;
  title = 'TNEMIS';

  constructor(
    public telemetryService: TelemetryService,public logsService: LogsService,
    private _router: Router
  ) {
  }
  @HostListener('document:TelemetryEvent', ['$event'])
  onTelemetryEvent(event) {
   // console.log('event===============', event);
  }

   /**
   * dispatch telemetry window unload event before browser closes
   * @param  event
   */
   @HostListener('window:beforeunload', ['$event'])
   public beforeunloadHandler($event) {
     this.telemetryService.end();
   }

  ngOnInit() {
    // console.log(environment)
    this.telemetryService.initialize({
      context: {
        mode: 'play',  // To identify preview used by the user to play/edit/preview
        authToken: environment.telemetryContext.authToken, // Auth key to make  api calls
        env:environment.telemetryContext.env, // Current logged in user id
        pdata: environment.telemetryContext.pdata,
        channel: environment.telemetryContext.channel,
        tags: [],
        timeDiff: 0,  // Defines the time difference// Defines the object roll up data
        host: environment.telemetryContext.host,
        apislug: environment.telemetryContext.apislug,
        endpoint: environment.telemetryContext.endpoint
      },
      config: {
      },
      // tslint:disable-next-line:max-line-length
      metadata: {
      }
    });
    //
    this.telemetryService.start(this._router.url);
  }
}
