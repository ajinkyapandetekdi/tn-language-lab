import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-feedback-popup',
  templateUrl: './feedback-popup.component.html',
  styleUrls: ['./feedback-popup.component.scss']
})
export class FeedbackPopupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() feedbackSubmitted = new EventEmitter();

  submitFeedback(feedback: string) {
    this.feedbackSubmitted.emit(feedback);
  }

}
