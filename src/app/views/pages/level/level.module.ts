import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LevelSidemenuComponent } from './level-sidemenu/level-sidemenu.component';
import { LevelViewpartComponent } from './level-viewpart/level-viewpart.component';
import { LevelComponent } from './level.component';
import {AccordionModule} from 'primeng/accordion';
import {PanelModule} from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from 'primeng/dragdrop';
import { WordplayComponent } from './level-viewpart/wordplay/wordplay.component';
import { OpenStoryComponent } from './level-viewpart/open-story/open-story.component';
import { LetsTalkComponent } from './level-viewpart/lets-talk/lets-talk.component';
import { WarmUpComponent } from './level-viewpart/warm-up/warm-up.component';
import { ThinkAndWriteComponent } from './level-viewpart/think-and-write/think-and-write.component';
import { WordHelpComponent } from './level-viewpart/word-help/word-help.component';
import { ViewLessonComponent } from './level-viewpart/view-lesson/view-lesson.component';
import { SafePipe } from '../../../safePipe';
import { LessonProgressComponent } from './level-viewpart/lesson-progress/lesson-progress.component';
import { FeedbackPopupComponent } from './level-viewpart/feedback-popup/feedback-popup.component';



const routes: Routes = [
  {
    path: '',
    component: LevelComponent
  },
  {
    path: 'level_sidemenu',
    component: LevelSidemenuComponent
  },
  {
    path: 'level_viewpart',
    component: LevelViewpartComponent
  }
]

@NgModule({
  declarations: [
    LevelComponent,
    LevelSidemenuComponent,
    LevelViewpartComponent,
    WordplayComponent,
    OpenStoryComponent,
    LetsTalkComponent,
    WarmUpComponent,
    ThinkAndWriteComponent,
    WordHelpComponent,
    ViewLessonComponent,
    SafePipe,
    LessonProgressComponent,
    FeedbackPopupComponent

  ],
  imports: [
    CommonModule,
    AccordionModule,
    PanelModule,
    ReactiveFormsModule,
    RadioButtonModule,
    PanelMenuModule,
    DragDropModule,
    RouterModule.forChild(routes),
  ],
  exports:[SafePipe]
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LevelModule { }
