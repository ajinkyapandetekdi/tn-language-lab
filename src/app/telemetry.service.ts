import { Injectable, EventEmitter } from '@angular/core';
import { CsTelemetryModule } from '@project-sunbird/client-services/telemetry';
import { UtilService } from './util.service';
import { UserService } from './user/user.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TelemetryService {
  private contentSessionId: string;
  private playSessionId: string;
  private telemetryObject: any;
  private context;
  public config;
  public TELEMETRY_MODE = environment.telemetry_mode;

  startDuration: number;

  constructor(
    public userService: UserService,
    private utilService: UtilService
  ) {
    this.contentSessionId = this.utilService.uniqueId();
    localStorage.setItem('contentSessionId', this.contentSessionId);
  }


  telemetryMode(currentMode){
    if (
      (this.TELEMETRY_MODE === 'ET' && currentMode === 'ET') ||
      (this.TELEMETRY_MODE === 'NT' &&
        (currentMode === 'ET' || currentMode === 'NT')) ||
      (this.TELEMETRY_MODE === 'DT' &&
        (currentMode === 'ET' || currentMode === 'NT' || currentMode === 'DT'))
    ){
      return true;
    }
    return false;

  }

  public initialize({ context, config, metadata }) {
    this.context = context;
    this.config = config;
    this.playSessionId = this.utilService.uniqueId();

    if (!CsTelemetryModule.instance.isInitialised) {
      CsTelemetryModule.instance.init({});
      const telemetryConfig: any = {
        config: {
          pdata: context.pdata,
          env: 'languagelab.portal',
          channel: context.channel,
          did: context.did,
          authtoken: context.authToken || '',
          uid: context.uid || 'anonymous',
          sid: context.sid,
          batchsize: 10,
          mode: context.mode,
          host: context.host,
          apislug: context.apislug,
          endpoint: context.endpoint,
          tags: context.tags,
          cdata: [
            { id: this.contentSessionId, type: 'ContentSession' },
            { id: this.playSessionId, type: 'PlaySession' },
          ],
        },
        userOrgDetails: {},
      };
      if (context.dispatcher) {
        telemetryConfig.config.dispatcher = context.dispatcher;
      }
      CsTelemetryModule.instance.telemetryService.initTelemetry(
        telemetryConfig
      );
    }

    this.telemetryObject = {
      id: metadata.identifier,
      type: 'Content',
      ver: metadata.pkgVersion + '' || '1.0',
      rollup: context.objectRollup || {},
    };
  }

  public start(pageid) {
    this.startDuration = new Date().getTime();
    CsTelemetryModule.instance.telemetryService.raiseStartTelemetry({
      options: this.getEventOptions(),
      edata: { type: 'content', mode: 'play', pageid: pageid },
    });
  }
  


  public log(type, message, pageid, data, currentMode) {
    if (this.telemetryMode(currentMode)) {
      this.startDuration = new Date().getTime();
      CsTelemetryModule.instance.telemetryService.raiseLogTelemetry({
        options: this.getEventOptions(),
        edata: {
          type: type || 'system', // Required. Type of log (system, process, api_access, api_call, job, app_update etc)
          level: 'INFO', // Required. Level of the log. TRACE, DEBUG, INFO, WARN, ERROR, FATAL
          message: message || 'log', // Required. Log message
          pageid: pageid || '', // Optional. Page where the log event has happened
          params: [data], // Optional. Additional params in the log message
        },
      });
    }
  }

  public end() {
    CsTelemetryModule.instance.telemetryService.raiseEndTelemetry({
      edata: {
        type: 'content',
        mode: 'play',
        pageid: 'language-lab',
        summary: [],
        duration: new Date().getTime() - this.startDuration,
      },
      options: this.getEventOptions(),
    });
  }

  public response(data, currentMode) {
    if (this.telemetryMode(currentMode))  {
      CsTelemetryModule.instance.telemetryService.raiseResponseTelemetry(
        data,
        this.getEventOptions()
      );
    }
  }

  public interact(id, currentPage, currentMode) {
    if (this.telemetryMode(currentMode)) {      
      CsTelemetryModule.instance.telemetryService.raiseInteractTelemetry({
        options: this.getEventOptions(),
        edata: { type: 'TOUCH', subtype: '', id, pageid: currentPage + '' },
      });
    }
  }

  public search(id, currentMode) {
    if (this.telemetryMode(currentMode))  {
      CsTelemetryModule.instance.telemetryService.raiseSearchTelemetry({
        options: this.getEventOptions(),
        edata: {
          // Required
          type: 'content', // Required. content, assessment, asset
          query: id, // Required. Search query string
          filters: {}, // Optional. Additional filters
          sort: {}, // Optional. Additional sort parameters
          correlationid: '', // Optional. Server generated correlation id (for mobile app's telemetry)
          size: 0, // Required. Number of search results
          topn: [{}], // Required. top N (configurable) results with their score
        },
      });
    }
  }

  public impression(currentPage, uri, currentMode) {
    if (this.telemetryMode(currentMode))  {
      CsTelemetryModule.instance.telemetryService.raiseImpressionTelemetry({
        options: this.getEventOptions(),
        edata: {
          type: 'workflow',
          subtype: '',
          pageid: currentPage + '',
          uri: uri,
        },
      });
    }
  }

  public error(
    error: any,
    data: { err: string; errtype: string },
    currentMode
  ) {
    if (this.telemetryMode(currentMode))  {
      CsTelemetryModule.instance.telemetryService.raiseErrorTelemetry({
        options: this.getEventOptions(),
        edata: {
          err: data.err,
          errtype: data.errtype,
          stacktrace: error.toString() || '',
        },
      });
    }
  }

  public feedback(data) {
    CsTelemetryModule.instance.telemetryService.raiseFeedBackTelemetry({
      options: this.getEventOptions(),
      edata: {
        "contentId": "", // Required. Id of the content
        "rating": data, // Optional. Numeric score (+1 for like, -1 for dislike, or 4.5 stars given in a rating)
        "comments": "User entered feedback" // Optional. Text feedback (if any)
      }
    });
  }

  private getEventOptions() {
    return {
      object: {},
      context: {
        channel: this.context.channel,
        pdata: this.context.pdata,
        env: 'languagelab.portal',
        sid: this.context.sid,
        uid: this.userService.getUser().emis_username || 'anonymous',
        cdata: [
          { id: this.contentSessionId, type: 'ContentSession' },
          { id: this.playSessionId, type: 'PlaySession' },
        ],
        rollup: this.context.contextRollup || {},
      },
    };
  }
}
