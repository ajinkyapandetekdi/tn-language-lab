import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from './views/layout/layout.module';
// import { AuthGuard } from './core/guard/auth.guard';

import { AppComponent } from './app.component';
// import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import { DataService } from './core/services/data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertService } from './core/services/alert.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './views/component/components.module';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NoAccessComponent } from './views/pages/no-access/no-access.component';
import { HomeComponent } from './views/pages/home/home.component';
import { RouterModule } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ResearchComponent } from './views/pages/research/research.component';
import { ComingComponent } from './views/pages/coming/coming.component';
import { LearnTommorowComponent } from './views/pages/learn-tommorow/learn-tommorow.component';
import { DownloadTelemetryComponent } from './download-telemetry/download-telemetry.component';
import {
  I18NextModule,
  ITranslationService,
  I18NEXT_SERVICE,
  defaultInterpolationFormat,
} from 'angular-i18next';

import en from "../locales/en/translation.json"
import ta from "../locales/ta/translation.json";
import { LoginComponent } from './login/login.component';
import { BuddyLoginComponent } from './buddy-login/buddy-login.component'

export function appInit(i18next: ITranslationService) {
  let lang = localStorage.getItem('lang');
  const data = i18next.init({
    fallbackLng: lang ? lang : "en" ,
    debug: true,
    returnEmptyString: false,
    resources: {
      en: {
        translation: en
      },
      ta:{
        translation: ta
      }
    },
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      format: I18NextModule.interpolationFormat(defaultInterpolationFormat),
    },
  });
  return () => data;
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true,
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NoAccessComponent,
    HomeComponent,
    ResearchComponent,
    ComingComponent,
    LearnTommorowComponent,
    DownloadTelemetryComponent,
    LoginComponent,
    BuddyLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    LayoutModule,
    RouterModule,
    CarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule,
    NgHttpLoaderModule.forRoot(),
    I18NextModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    FormsModule,
  ],

  providers: [
    // AuthGuard,
    I18N_PROVIDERS,
    DataService,
    ToastrService,
    AlertService,

    // {
    //   provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
    //   useValue: {
    //     coreLibraryLoader: () => import('highlight.js/lib/core'),
    //     languages: {
    //       xml: () => import('highlight.js/lib/languages/xml'),
    //       typescript: () => import('highlight.js/lib/languages/typescript'),
    //       scss: () => import('highlight.js/lib/languages/scss'),
    //     }
    //   }
    // }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
