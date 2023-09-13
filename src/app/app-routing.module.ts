import { NgModule } from '@angular/core';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NoAccessComponent } from './views/pages/no-access/no-access.component';
import { HomeComponent } from './views/pages/home/home.component';
import { WordplayComponent } from './views/pages/level/level-viewpart/wordplay/wordplay.component';
import { ResearchComponent } from './views/pages/research/research.component';
import { ComingComponent } from './views/pages/coming/coming.component';
import { LearnTommorowComponent } from './views/pages/learn-tommorow/learn-tommorow.component';
import { DownloadTelemetryComponent } from './download-telemetry/download-telemetry.component';
import { LoginComponent } from './login/login.component';
import { BuddyLoginComponent } from './buddy-login/buddy-login.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { 
    path:'buddy-login',
    component: BuddyLoginComponent,
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },{
        path: 'DownloadTelemetry',
        canActivate: [AuthGuard],
        component: DownloadTelemetryComponent
      },
      {
        path: 'level',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/level/level.module').then(m => m.LevelModule)
      },
      {
        path: 'word-play',
        component: WordplayComponent
      },
      {
        path: 'research',
        component: ResearchComponent
      },
      {
        path: 'learn-tommorow',
        component: LearnTommorowComponent
      },
      {
        path: 'coming',
        component: ComingComponent
      },

      // {
      //   path: 'competition',
      //   loadChildren: () => import('./views/pages/competition/competition.module').then(m => m.CompetitionModule)
      // },
      {
        path: 'no-access',
        loadChildren: () => import('./views/pages/no-access/no-access.module').then(m => m.NoAccessModule),
        data: {
          breadcrumb: 'No Access'
        }
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
  // ,
  // {
  //   path: 'error',
  //   component: ErrorPageComponent,
  //   data: {
  //     'type': 404,
  //     'title': 'Page Not Found',
  //     'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
  //   }
  // },
  // {
  //   path: 'error/:type',
  //   component: ErrorPageComponent
  // },
  // { path: '**', redirectTo: 'error', pathMatch: 'full' },


  ];


@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
