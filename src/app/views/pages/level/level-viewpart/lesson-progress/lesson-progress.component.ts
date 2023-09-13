import { Component, Input, OnInit } from '@angular/core';
import { LevelService } from '../../level.service';
import { TelemetryService } from 'src/app/telemetry.service';

@Component({
  selector: 'app-lesson-progress',
  templateUrl: './lesson-progress.component.html',
  styleUrls: ['./lesson-progress.component.scss']
})
export class LessonProgressComponent implements OnInit {

  @Input() progress: number;
  @Input() questionCount: number;


  constructor(public levelService: LevelService, public telemetryService: TelemetryService) { }

  ngOnInit(): void {
  }

  handleFeedbackSubmission(feedback: string) {
    // Process the feedback here
    console.log('Feedback received:', feedback);
    let rating = feedback === 'thumbs-up' ? 1 : -1;

    this.telemetryService.feedback(rating);
    // Optionally, you can close the feedback popup after submission
    this.levelService.showFeedbackPopup = false;
  }

}
