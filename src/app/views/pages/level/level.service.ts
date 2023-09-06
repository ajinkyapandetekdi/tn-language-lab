import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TelemetryService } from '../../../telemetry.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { LessonService } from './level-viewpart/lesson.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  itemsData: any;
  items: any;
  viewPage = 1;
  lessonData = {};
  data = '';
  userData: any;
  currentLessonScoreCount: number = 0;
  currentLessonData: any;
  nextLessonData: any[] = [];;
  nextLessonPath = '';
  nextLessonId =  '';
  lessonPoint: number = 0;
  totalPoints: any = 0;
  buddyTotalPoints: any = 0;
  unExploredLesson: number = 0;
  stars: number = 0;
  buddyStars: number = 0;
  path;
  mechanic :any;
  showFeedbackPopup = false;
  constructor(public lessonService: LessonService, private router: Router, public userService:UserService, private httpService: HttpClient, public telemetryService: TelemetryService, private _route: ActivatedRoute,
    private _router: Router) {
      this.itemsData = [
        {
          label: 'Speak with Me',
          lid: "speakWithMe",
          id: "speakWithMe_unit",
          command: (event) => this.logTelemetryEvent(event, "Speak with Me"),
          expanded: true,
          items:  [
            { icon: "pi pi-star-fill", command: (event) => this.logTelemetryEvent(event, "Explore & Learn"), routerLink: ['/level'], queryParams: {lesson: 'speakWithMe', topic: "lesson1"}, label: 'Explore & Learn', lid: "lesson1", pid: "speakWithMe"},
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event,"Play & Learn"), routerLink: ['/level'], queryParams: {lesson: 'speakWithMe',topic: "lesson2"}, label: 'Play & Learn', lid: "lesson2", pid: "speakWithMe"},
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Learn with a Friend"), routerLink: ['/level'], queryParams: {lesson: 'speakWithMe',topic: "lesson3"}, label: 'Learn with a Friend',lid: "lesson3", pid: "speakWithMe"}          ]
        },
        {
          label: 'Level 1',
          lid: 'unit1',
          id: "level2_unit",
          command: (event) => this.logTelemetryEvent(event, "Level 1"),
          items: [
            {
              label: 'Whats going on?',
              lid: 'lesson1',
              id: 'lesson1_unit',
              command: (event) => this.logTelemetryEvent(event, "Whats going on?"),
              items: [
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Describing Actions: What\'s in store today?"), routerLink: ['/level'], queryParams: {lesson: 'lesson1', topic: "introduction"}, label: 'Describing Actions: What\'s in store today?', lid: "introduction", pid: "lesson1"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Warm Up"), routerLink: ['/level'], queryParams: {lesson: 'lesson1', topic: "warmup"}, label: 'Warm Up', lid: "warmup", pid: "lesson1"},
                // { label: 'Picture Play', icon: "pi pi-star", command: (event) => this.levelService.getLesson("lesson1", "pictureplay"), lid: "pictureplay", pid: "lesson1", id: "lesson1_pictureplay"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Open Story"), routerLink: ['/level'], queryParams: {lesson: 'lesson1', topic: "openstory"}, label: 'Open Story', lid: "openstory", pid: "lesson1"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'lesson1', topic: "thinkandwrite"}, label: 'Think and Write', lid: "thinkandwrite", pid: "lesson1"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Help"), routerLink: ['/level'], queryParams: {lesson: 'lesson1', topic: "wordhelp"}, label: 'Word Help', lid: "wordhelp", pid: "lesson1"}
              ]
            },
            {
              label: 'Seasons and Weather',
              lid: 'lesson5',
              id: 'lesson5_unit',
              command: (event) => this.logTelemetryEvent(event, "Seasons and Weather"),
              items: [
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Weather: What\'s in store today?"), routerLink: ['/level'], queryParams: {lesson: 'lesson5', topic: "introduction"}, label: 'Weather: What\'s in store today?', lid: "introduction", pid: "lesson5"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Warm Up"), routerLink: ['/level'], queryParams: {lesson: 'lesson5', topic: "warmUp"}, label: 'Warm Up', lid: "warmUp", pid: "lesson5"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Play"), routerLink: ['/level'], queryParams: {lesson: 'lesson5', topic: "wordplay"}, label: 'Word Play', lid: "wordplay", pid: "lesson5"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Picture Play"), routerLink: ['/level'], queryParams: {lesson: 'lesson5', topic: "pictureplay"}, label: 'Picture Play', lid: "pictureplay", pid: "lesson5"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Lets Talk"), routerLink: ['/level'], queryParams: {lesson: 'lesson5', topic: "letstalk"}, label: 'Lets Talk', lid: "letstalk", pid: "lesson5"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'lesson5', topic: "thinkandwrite"}, label: 'Think and Write', lid: "thinkandwrite", pid: "lesson5"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Help"), routerLink: ['/level'], queryParams: {lesson: 'lesson5', topic: "wordhelp"}, label: 'Word Help', lid: "wordhelp", pid: "lesson5"}
              ]
            },
            {
              label: 'Find the Things',
              lid: "lesson6",
              id: 'lesson6_unit',
              command: (event) => this.logTelemetryEvent(event, "Find the Things"),
              items: [
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Location: What\'s in store today?"), routerLink: ['/level'], queryParams: {lesson: 'lesson6', topic: "introduction"}, label: 'Location: What\'s in store today?', lid: "introduction", pid: "lesson6"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Warm Up"), routerLink: ['/level'], queryParams: {lesson: 'lesson6', topic: "warmup"}, label: 'Warm Up', lid: "warmup", pid: "lesson6"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Play"), routerLink: ['/level'], queryParams: {lesson: 'lesson6', topic: "wordplay"}, label: 'Word Play', lid: "wordplay", pid: "lesson6"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Picture Play"), routerLink: ['/level'], queryParams: {lesson: 'lesson6', topic: "pictureplay"}, label: 'Picture Play', lid: "pictureplay", pid: "lesson6"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Lets Talk"), routerLink: ['/level'], queryParams: {lesson: 'lesson6', topic: "letstalk"}, label: 'Lets Talk', lid: "letstalk", pid: "lesson6"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'lesson6', topic: "thinkandwrite"}, label: 'Think and Write', lid: "thinkandwrite", pid: "lesson6"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Help"), routerLink: ['/level'], queryParams: {lesson: 'lesson6', topic: "wordhelp"}, label: 'Word Help', lid: "wordhelp", pid: "lesson6"}
              ]
            },
            {
              label: 'How do you feel today?',
              lid: "lesson8",
              id: 'lesson8_unit',
              command: (event) => this.logTelemetryEvent(event, "How do you feel today?"),
              items: [
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Feelings: What\'s in store today?"), routerLink: ['/level'], queryParams: {lesson: 'lesson8', topic: "introduction"}, label: 'Feelings: What\'s in store today?', lid: "introduction", pid: "lesson8"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Warm Up"), routerLink: ['/level'], queryParams: {lesson: 'lesson8', topic: "warmUp"}, label: 'Warm Up', lid: "warmUp", pid: "lesson8"},
                // { label: 'Picture Play', icon: "pi pi-star", command: (event) => this.levelService.getLesson("lesson8", "pictureplay"), lid: "pictureplay", pid: "lesson8", id: "lesson8_t3" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Lets Talk"), routerLink: ['/level'], queryParams: {lesson: 'lesson8', topic: "letstalk"}, label: 'Lets Talk', lid: "letstalk", pid: "lesson8"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'lesson8', topic: "thinkandwrite"}, label: 'Think and Write', lid: "thinkandwrite", pid: "lesson8"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Help"), routerLink: ['/level'], queryParams: {lesson: 'lesson8', topic: "wordhelp"}, label: 'Word Help', lid: "wordhelp", pid: "lesson8"}
              ]
            },
            {
              label: 'Free Time Activities',
              lid: "lesson9",
              id: 'lesson9_unit',
              command: (event) => this.logTelemetryEvent(event, "Free Time Activities"),
              items: [
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Leisure: What\'s in store today?"), routerLink: ['/level'], queryParams: {lesson: 'lesson9', topic: "introduction"}, label: 'Leisure: What\'s in store today?', lid: "introduction", pid: "lesson9"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Warm Up"), routerLink: ['/level'], queryParams: {lesson: 'lesson9', topic: "warmUp"}, label: 'Warm Up', lid: "warmUp", pid: "lesson9"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Quiz Time"), routerLink: ['/level'], queryParams: {lesson: 'lesson9', topic: "pictureplay"}, label: 'Quiz Time', lid: "pictureplay", pid: "lesson9"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Open Story"), routerLink: ['/level'], queryParams: {lesson: 'lesson9', topic: "openstory"}, label: 'Open Story', lid: "openstory", pid: "lesson9"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'lesson9', topic: "thinkandwrite"}, label: 'Think and Write', lid: "thinkandwrite", pid: "lesson9"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Help"), routerLink: ['/level'], queryParams: {lesson: 'lesson9', topic: "wordhelp"}, label: 'Word Help', lid: "wordhelp", pid: "lesson9"}
              ]
            }
          ]
        },
        {
          label: "Level 2",
          lid: 'unit2',
          id: 'level2_unit',
          command: (event) => this.logTelemetryEvent(event, "Level 2"),
          items: [
            {
              label: 'Under My Bed',
              lid: "lesson1-unit2",
              command: (event) => this.logTelemetryEvent(event, "Under My Bed"),
              items: [
                // { label: 'What\'s in store today?', icon: "pi pi-star", command: (event) => this.levelService.getLesson("lesson1-unit2", "review"), lid: "review", pid: "lesson1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Introduction"), routerLink: ['/level'], queryParams: {lesson: 'lesson1-unit2', topic: "introduction"}, label: 'Introduction', lid: "introduction", pid: "lesson1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Story Time: Under my Bed"), routerLink: ['/level'], queryParams: {lesson: 'lesson1-unit2', topic: "storytime"}, label: 'Story Time: Under my Bed', lid: "storytime", pid: "lesson1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Lets Talk"), routerLink: ['/level'], queryParams: {lesson: 'lesson1-unit2', topic: "letstalk"}, label: 'Lets Talk', lid: "letstalk", pid: "lesson1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'lesson1-unit2', topic: "thinkandwrite"}, label: 'Think and Write', lid: "thinkandwrite", pid: "lesson1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Help"), routerLink: ['/level'], queryParams: {lesson: 'lesson1-unit2', topic: "wordhelp"}, label: 'Word Help', lid: "wordhelp", pid: "lesson1-unit2" }
              ]
            },
            {
              label: 'Ramya\'s Stars',
              lid: "lesson2-unit2",
              command: (event) => this.logTelemetryEvent(event, "Ramya\'s Stars"),
              items: [
                // { label: 'What\'s in store today?', icon: "pi pi-star", command: (event) => this.levelService.getLesson("lesson2-unit2", "review"), id: "review", pid: "lesson2-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Introduction"), routerLink: ['/level'], queryParams: {lesson: 'lesson2-unit2', topic: "introduction"}, label: 'Introduction', lid: "introduction", pid: "lesson2-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Story Time: Ramya\'s Stars"), routerLink: ['/level'], queryParams: {lesson: 'lesson2-unit2', topic: "storytime"}, label: 'Story Time: Ramya\'s Stars', lid: "storytime", pid: "lesson2-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Lets Talk"), routerLink: ['/level'], queryParams: {lesson: 'lesson2-unit2', topic: "letstalk"}, label: 'Lets Talk', lid: "letstalk", pid: "lesson2-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Open Story"), routerLink: ['/level'], queryParams: {lesson: 'lesson2-unit2', topic: "openstory"}, label: 'Open Story', lid: "openstory", pid: "lesson2-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'lesson2-unit2', topic: "thinkandwrite"}, label: 'Think and Write', lid: "thinkandwrite", pid: "lesson2-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Help"), routerLink: ['/level'], queryParams: {lesson: 'lesson2-unit2', topic: "wordhelp"}, label: 'Word Help', lid: "wordhelp", pid: "lesson2-unit2" }
              ]
            },
            {
              label: 'When Amma Went to School',
              lid: "lesson3-unit2",
              command: (event) => this.logTelemetryEvent(event, "When Amma Went to School"),
              items: [
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Introduction"), routerLink: ['/level'], queryParams: {lesson: 'lesson3-unit2', topic: "introduction"}, label: 'Introduction', lid: "introduction", pid: "lesson3-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Story Time: When Amma Went to School"), routerLink: ['/level'], queryParams: {lesson: 'lesson3-unit2', topic: "storytime"}, label: 'Story Time: When Amma Went to School', lid: "storytime", pid: "lesson3-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Open Story"), routerLink: ['/level'], queryParams: {lesson: 'lesson3-unit2', topic: "openstory"}, label: 'Open Story', lid: "openstory", pid: "lesson3-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'lesson3-unit2', topic: "thinkandwrite"}, label: 'Think and Write', lid: "thinkandwrite", pid: "lesson3-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Help"), routerLink: ['/level'], queryParams: {lesson: 'lesson3-unit2', topic: "wordhelp"}, label: 'Word Help', lid: "wordhelp", pid: "lesson3-unit2" }
              ]
            },
            {
              label: 'Brushing is No Fun!',
              lid: "lesson3-1-unit2",
              command: (event) => this.logTelemetryEvent(event, "Brushing is No Fun!"),
              items: [
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Introduction"), routerLink: ['/level'], queryParams: {lesson: 'lesson3-1-unit2', topic: "introduction2"}, label: 'Introduction', lid: "introduction2", pid: "lesson3-1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Story Time: Brushing is No Fun!"), routerLink: ['/level'], queryParams: {lesson: 'lesson3-1-unit2', topic: "storytime2"}, label: 'Story Time: Brushing is No Fun!', lid: "storytime2", pid: "lesson3-1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Play"), routerLink: ['/level'], queryParams: {lesson: 'lesson3-1-unit2', topic: "wordplay"}, label: 'Word Play', lid: "wordplay", pid: "lesson3-1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Open Story"), routerLink: ['/level'], queryParams: {lesson: 'lesson3-1-unit2', topic: "openstory2"}, label: 'Open Story', lid: "openstory2", pid: "lesson3-1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'lesson3-1-unit2', topic: "thinkandwrite"}, label: 'Think and Write', lid: "thinkandwrite", pid: "lesson3-1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Help"), routerLink: ['/level'], queryParams: {lesson: 'lesson3-1-unit2', topic: "wordhelp"}, label: 'Word Help', lid: "wordhelp", pid: "lesson3-1-unit2" }
              ]
            },
            {
              label: 'Little Painters',
              lid: "lesson5_1-unit2",
              command: (event) => this.logTelemetryEvent(event, "Little Painters"),
              items: [
                // { label: 'What\'s in store today?', icon: "pi pi-star", command: (event) => this.levelService.getLesson("lesson5_1-unit2", "review"), lid: "review", pid: "lesson5_1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Introduction"), routerLink: ['/level'], queryParams: {lesson: 'lesson5_1-unit2', topic: "introduction"}, label: 'Introduction', lid: "introduction", pid: "lesson5_1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Story Time: Little Painters!"), routerLink: ['/level'], queryParams: {lesson: 'lesson5_1-unit2', topic: "storytime"}, label: 'Story Time: Little Painters!', lid: "storytime", pid: "lesson5_1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Lets Talk"), routerLink: ['/level'], queryParams: {lesson: 'lesson5_1-unit2', topic: "letstalk"}, label: 'Lets Talk', lid: "letstalk", pid: "lesson5_1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'lesson5_1-unit2', topic: "thinkandwrite"}, label: 'Think and Write', lid: "thinkandwrite", pid: "lesson5_1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Help"), routerLink: ['/level'], queryParams: {lesson: 'lesson5_1-unit2', topic: "wordhelp"}, label: 'Word Help', lid: "wordhelp", pid: "lesson5_1-unit2" }
              ]
            },
            {
              label: 'Bluie\'s World',
              lid: "lesson5_2-unit2",
              command: (event) => this.logTelemetryEvent(event, "Bluie\'s World"),
              items: [
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Introduction"), routerLink: ['/level'], queryParams: {lesson: 'lesson5_2-unit2', topic: "introduction"}, label: 'Introduction', lid: "introduction", pid: "lesson5_2-unit2"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Story Time: Bluie\'s World!"), routerLink: ['/level'], queryParams: {lesson: 'lesson5_2-unit2', topic: "storytime"}, label: 'Story Time: Bluie\'s World!', lid: "storytime", pid: "lesson5_2-unit2"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Lets Talk"), routerLink: ['/level'], queryParams: {lesson: 'lesson5_2-unit2', topic: "letstalk"}, label: 'Lets Talk', lid: "letstalk", pid: "lesson5_2-unit2"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'lesson5_2-unit2', topic: "thinkandwrite"}, label: 'Think and Write', lid: "thinkandwrite", pid: "lesson5_2-unit2"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Help"), routerLink: ['/level'], queryParams: {lesson: 'lesson5_2-unit2', topic: "wordhelp"}, label: 'Word Help', lid: "wordhelp", pid: "lesson5_2-unit2"}
              ]
            },
            {
              label: 'Samira\'s Awful Lunch',
              lid: "lesson7-unit2",
              command: (event) => this.logTelemetryEvent(event, "Samira\'s Awful Lunch"),
              items: [
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Introduction"), routerLink: ['/level'], queryParams: {lesson: 'lesson7-unit2', topic: "introduction2"}, label: 'Introduction', lid: "introduction2", pid: "lesson7-unit2"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Story Time: Samira\'s Awful Lunch"), routerLink: ['/level'], queryParams: {lesson: 'lesson7-unit2', topic: "storytime2"}, label: 'Story Time: Samira\'s Awful Lunch', lid: "storytime2", pid: "lesson7-unit2"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Quiz Time"), routerLink: ['/level'], queryParams: {lesson: 'lesson7-unit2', topic: "wordplay"}, label: 'Quiz Time', lid: "wordplay", pid: "lesson7-unit2"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'lesson7-unit2', topic: "thinkandwrite"}, label: 'Think and Write', lid: "thinkandwrite", pid: "lesson7-unit2"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Help"), routerLink: ['/level'], queryParams: {lesson: 'lesson7-unit2', topic: "wordhelp"}, label: 'Word Help', lid: "wordhelp", pid: "lesson7-unit2"}
              ]
            },
            {
              label: 'Goodnight Tinku!',
              lid: "lesson6_1-unit2",
              command: (event) => this.logTelemetryEvent(event, "Goodnight Tinku!"),
              items: [
                // { label: 'What\'s in store today?', icon: "pi pi-star", command: (event) => this.levelService.getLesson("lesson6_1-unit2", "review"), lid: "review", pid: "lesson6_1-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Introduction"), routerLink: ['/level'], queryParams: {lesson: 'lesson6_1-unit2', topic: "introduction"}, label: 'Introduction', lid: "introduction", pid: "lesson6_1-unit2"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Story Time: Goodnight Tinku!"), routerLink: ['/level'], queryParams: {lesson: 'lesson6_1-unit2', topic: "storytime"}, label: 'Story Time: Goodnight Tinku!', lid: "storytime", pid: "lesson6_1-unit2"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Lets Talk"), routerLink: ['/level'], queryParams: {lesson: 'lesson6_1-unit2', topic: "letstalk"}, label: 'Lets Talk', lid: "letstalk", pid: "lesson6_1-unit2"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'lesson6_1-unit2', topic: "thinkandwrite"}, label: 'Think and Write', lid: "thinkandwrite", pid: "lesson6_1-unit2"},
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Help"), routerLink: ['/level'], queryParams: {lesson: 'lesson6_1-unit2', topic: "wordhelp"}, label: 'Word Help', lid: "wordhelp", pid: "lesson6_1-unit2"}
              ]
            },
            {
              label: 'The Boy and the Drum',
              lid: "lesson6_2-unit2",
              command: (event) => this.logTelemetryEvent(event, "The Boy and the Drum"),
              items: [
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Introduction"), routerLink: ['/level'], queryParams: {lesson: 'lesson6_2-unit2', topic: "introduction"}, label: 'Introduction', lid: "introduction", pid: "lesson6_2-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Story Time: The Boy and the Drum"), routerLink: ['/level'], queryParams: {lesson: 'lesson6_2-unit2', topic: "storytime"}, label: 'Story Time: The Boy and the Drum', lid: "storytime", pid: "lesson6_2-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Lets Talk"), routerLink: ['/level'], queryParams: {lesson: 'lesson6_2-unit2', topic: "letstalk"}, label: 'Lets Talk', lid: "letstalk", pid: "lesson6_2-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Quiz Time"), routerLink: ['/level'], queryParams: {lesson: 'lesson6_2-unit2', topic: "clixtime"}, label: 'Quiz Time', lid: "clixtime", pid: "lesson6_2-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'lesson6_2-unit2', topic: "thinkandwrite"}, label: 'Think and Write', lid: "thinkandwrite", pid: "lesson6_2-unit2" },
                { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Help"), routerLink: ['/level'], queryParams: {lesson: 'lesson6_2-unit2', topic: "wordhelp"}, label: 'Word Help', lid: "wordhelp", pid: "lesson6_2-unit2" }
              ]
            }
          ]
        },
        {
          label: 'Help',
          lid: "help",
          id: "help_unit",
          command: (event) => this.logTelemetryEvent(event, "Help"),
          items: [
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Let\'s Get Started!"), routerLink: ['/level'], queryParams: {lesson: 'help', topic: "lets_get_started"}, label: 'Let\'s Get Started!', lid: "lets_get_started", pid: "help"},
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Introduction to Mozhigal"), routerLink: ['/level'], queryParams: {lesson: 'help', topic: "introduction_to_mozhigal"}, label: 'Introduction to Mozhigal', lid: "introduction_to_mozhigal", pid: "help"},
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Let\'s talk"), routerLink: ['/level'], queryParams: {lesson: 'help', topic: "lets_talk"}, label: 'Let\'s talk', lid: "lets_talk", pid: "help"},
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Open Story"), routerLink: ['/level'], queryParams: {lesson: 'help', topic: "open_story"}, label: 'Open Story', lid: "open_story", pid: "help"},
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Quiz Time"), routerLink: ['/level'], queryParams: {lesson: 'help', topic: "quiz_time"}, label: 'Quiz Time', lid: "quiz_time", pid: "help"},
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Word Play"), routerLink: ['/level'], queryParams: {lesson: 'help', topic: "word_play"}, label: 'Word Play', lid: "word_play", pid: "help"},
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Picture Play"), routerLink: ['/level'], queryParams: {lesson: 'help', topic: "picture_play"}, label: 'Picture Play', lid: "picture_play", pid: "help"},
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Think and Write"), routerLink: ['/level'], queryParams: {lesson: 'help', topic: "think_and_write"}, label: 'Think and Write', lid: "think_and_write", pid: "help"},
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Glossary: Word Help"), routerLink: ['/level'], queryParams: {lesson: 'help', topic: "word_help"}, label: 'Glossary: Word Help', lid: "word_help", pid: "help"},
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Explore and Learn"), routerLink: ['/level'], queryParams: {lesson: 'help', topic: "explore_and_learn"}, label: 'Explore and Learn', lid: "explore_and_learn", pid: "help"},
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Learn with Friends"), routerLink: ['/level'], queryParams: {lesson: 'help', topic: "learn_with_friends"}, label: 'Learn with Friends', lid: "learn_with_friends", pid: "help"},
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "HT Lab settings"), routerLink: ['/level'], queryParams: {lesson: 'help', topic: "ht_lab_settings"}, label: 'HT Lab settings', lid: "ht_lab_settings", pid: "help"},
            { icon: "pi pi-star", command: (event) => this.logTelemetryEvent(event, "Health Check"), routerLink: ['/level'], queryParams: {lesson: 'help', topic: "mic_check"}, label: 'Health Check', lid: "mic_check", pid: "help"},
          ]
        }
      ]
      this.itemsData.forEach(lesson => {
        lesson.items.forEach(topic => {
          if (!topic.items){
            this.nextLessonData.push({ lid: topic.lid, pid: topic.pid })
          }else{
            topic.items.forEach(chapter => {
              this.nextLessonData.push({ lid: chapter.lid, pid: chapter.pid })
            })
          }
        })
      })
    }

  getJson(basePath,lid) {
    return this.httpService.get('../../../../assets/lessons/'+ basePath +'/'+lid+'/'+lid+'.json');
  }

  getCollection(){
    return this.httpService.get('../../../../assets/jsons/collection.json');
  }

  playNextLesson(){
    this.currentLessonData = this.getNextLesson();
    this._router.navigate(['/level'], {
      queryParams: {
        lesson: this.currentLessonData.pid,
        topic: this.currentLessonData.lid
      }
    });
  }

  getNextLesson(){
    let index = 0;
    let nextId = '';
    this.nextLessonData.forEach(lesson => {
      index++;
      this.currentLessonData = this.currentLessonData ? this.currentLessonData : {lid: "lesson1", pid: "speakWithMe"}
      if(this.currentLessonData.lid === lesson.lid && this.currentLessonData.pid === lesson.pid){
        nextId = this.nextLessonData[index];
      }

    })
    return nextId;
  }

  getLesson(basePath,lessonId){
    if(basePath){
      setTimeout(function(){
        instance.saveScore(lessonId+basePath, 0.5);
      },0)
    }
    let instance = this;
    this.currentLessonData = {lid: lessonId, pid: basePath};
    this.telemetryService.impression("level", this._router.url,"ET");
    localStorage.setItem("basePath", JSON.stringify(basePath));
    localStorage.setItem("lessonId", JSON.stringify(lessonId));
    this.getJson(basePath, lessonId).subscribe(res =>
      this.lessonData = res
    );
  }

  getStudentScore(studentId: number): Observable<number> {
    return this.lessonService.getStudentScore(studentId).pipe(
      map(response => response.totalScore),
      catchError((error) => {
        console.error('An error occurred:', error);
        return of(0);
      })
    );
  }

  getLessonsData(studentId: number): Observable<{ [key: string]: any }> {
    return this.lessonService.getLessonsData(this.userService.getCurrentUserId()).pipe(
      map(response => {
        const lessonObjects: { [key: string]: any } = {};
        response.forEach(lesson => {
          lessonObjects[lesson.lesson_id] = lesson;
        });
        return lessonObjects;
      }),
      catchError(error => {
        console.error('An error occurred:', error);
        return of({});
      })
    );
  }

  getBuddyLessonsData(studentId: number): Observable<{ [key: string]: any }> {
    return this.lessonService.getLessonsData(this.userService.getBuddyUser()?.emis_username).pipe(
      map(response => {
        const lessonObjects: { [key: string]: any } = {};
        response.forEach(lesson => {
          lessonObjects[lesson.lesson_id] = lesson;
        });
        return lessonObjects;
      }),
      catchError(error => {
        console.error('An error occurred:', error);
        return of({});
      })
    );
  }

  showBuddyScore(){
    this.buddyStars = 0;
    if (this.userService.isBuddyLoggedIn()){
      this.getStudentScore(this.userService.getBuddyUser()?.emis_username).subscribe(
        (score) => {
          this.buddyTotalPoints = score;
        }
      );
    }

    if (this.userService.isBuddyLoggedIn()){
      this.getBuddyLessonsData(this.userService.getBuddyUser()?.emis_username).subscribe(
        (response) => {
          console.log("buddy", response);
          this.userData = response;
          const iconStates = this.userData || {};

          this.currentLessonScoreCount = iconStates[this.currentLessonData.lid+this.currentLessonData.pid]?.score

          for (const key in iconStates) {
            const score = iconStates[key]?.score || 0;
            if (score >= 0.5) {
              this.buddyStars++;
            }
          }
        }
      );
    }
  }

  showScore(){
    this.stars = 0;
    this.getStudentScore(this.userService.getCurrentUserId()).subscribe(
      (score) => {
        this.totalPoints = score;
      }
    );
    this.getLessonsData(this.userService.getCurrentUserId()).subscribe(
      (response) => {
        console.log(response);
        this.userData = response;
        const iconStates = this.userData || {};

        this.currentLessonScoreCount = iconStates[this.currentLessonData.lid+this.currentLessonData.pid]?.score

        for (const key in iconStates) {
          const score = iconStates[key]?.score || 0;
          if (score >= 0.5) {
            this.stars++;
          }
        }
      }
    );
  }

  saveScore(label: string, scoreIncrement: number) {
    this.lessonService.postLessonScore(this.userService.getCurrentUserId(), label, scoreIncrement).subscribe(
      (response) => {
        this.showScore();
        console.log('Score saved successfully');
      },
      (error) => {
        console.error('Error saving score', error);
      }
    );

    if (this.userService.isBuddyLoggedIn()){
      this.lessonService.postLessonScore(this.userService.getBuddyUser()?.emis_username, label, scoreIncrement).subscribe(
        (response) => {
          this.showBuddyScore();
          console.log('Score saved successfully');
        },
        (error) => {
          console.error('Error saving score', error);
        }
      );
    }
  }

  loadUserData() {
    this.getLessonsData(this.userService.getCurrentUserId()).subscribe(
      (response) => {
        this.userData = response;
        const iconStates = this.userData || {};
        this.itemsData.forEach(lesson => {
          let lessonHasAllCheckOrStar = true;

          lesson.items.forEach(topic => {
            let topicHasAllCheckOrStar = true;
            let topicHasAllChaptersCheckOrStar = true;

            if (!topic.items) {
              const storedIconValue = iconStates[topic.lid + topic.pid]?.score;
              if (storedIconValue >= 0.5) {
                topic.icon = 'pi pi-star-fill';
              } else {
                topicHasAllCheckOrStar = false;
              }
            } else {
              topic.items.forEach(chapter => {
                const storedIconValue = iconStates[chapter.lid + chapter.pid]?.score;
                if (storedIconValue >= 0.5) {
                  chapter.icon = 'pi pi-star-fill';
                } else {
                  topicHasAllChaptersCheckOrStar = false;
                }
              });

              if (topicHasAllChaptersCheckOrStar) {
                topic.icon = 'pi pi-check';
              } else {
                topic.icon = '';
                topicHasAllCheckOrStar = false; // Update the flag
              }
            }

            if (!topicHasAllCheckOrStar) {
              lessonHasAllCheckOrStar = false;
            }
          });

          if (lessonHasAllCheckOrStar) {
            lesson.icon = 'pi pi-check';
          } else {
            lesson.icon = '';
          }
        });
        this.items = this.itemsData;
      }
    );
  }

  logTelemetryEvent(event, lesson){
    if(event.item.pid){
      event.item.icon = 'pi pi-star-fill';
    }
    this.telemetryService.interact(lesson, 'level',"ET")
  }
}
