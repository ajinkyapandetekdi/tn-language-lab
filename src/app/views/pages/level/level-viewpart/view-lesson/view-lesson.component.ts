import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-view-lesson',
  templateUrl: './view-lesson.component.html',
  styleUrls: ['./view-lesson.component.scss']
})
export class ViewLessonComponent implements OnInit {
  @Input() lessonData
  modelAnsSwitch:boolean;
  option1Selected: boolean;
  option2Selected: boolean;
  option3Selected: boolean;
  textShow:boolean;

  @ViewChild('iframe1') iframe1: ElementRef;


  lessonProgress: number = 0; // Current lesson progress value
  totalQuestions: number = 4; // Total number of questions

  constructor(private sanitizer: DomSanitizer, private location: Location, private locationStrategy: LocationStrategy) { }

  ngOnInit(): void {
    window.addEventListener('message', (event: MessageEvent) => {
      if (event.data === 'start-recording') {
        this.updateLessonProgress();
      }
    });
  }


  updateLessonProgress() {
    this.lessonProgress = this.lessonProgress+1;
  }

  switchModelAnswer(option){
    if(option === 'option1'){
      this.option1Selected = true;
      this.option2Selected = false;
      this.option3Selected = false;
    }else if (option === 'option2'){
      this.option1Selected = false;
      this.option2Selected = true;
      this.option3Selected = false;
    }else{
      this.option1Selected = false;
      this.option2Selected = false;
      this.option3Selected = true;
    }
    this.modelAnsSwitch = !this.modelAnsSwitch;
  }

  getOpenStoryHtml(url) {
    let openStoryPath = "open-story/Open Story.html?file="+ this.locationStrategy.getBaseHref() + url;
    return '<iframe width=100%; height="600;" src="'+ openStoryPath +'"></iframe>'
  }

  getH5pHtml(url) {
    return '<iframe src="' + url + '" width="900" height="450" frameborder="0" allowfullscreen="allowfullscreen" allow="geolocation *; microphone *; camera *; midi *; encrypted-media *" title="Drag Name"></iframe><script src="https://h5p.org/sites/all/modules/h5p/library/js/h5p-resizer.js" charset="UTF-8"></script>'
  }

  getIframeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  showText(){
    this.textShow = !this.textShow;
  }

}
