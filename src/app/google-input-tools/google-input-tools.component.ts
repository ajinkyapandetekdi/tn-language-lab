import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-google-input-tools',
  templateUrl:'google-input-tools.component.html',
  styleUrls: ['./google-input-tools.component.scss'],
//   template: ``
})

export class GoogleInputToolsComponent {
  userInput: string = '';
  suggestions: any = [];
  showSuggestions: boolean = false;
  cursorPosition: number = 0;
  cursorLocation: { x: number; y: number } = { x: 0, y: 0 };
  questionIndex: number = 0;
  userInputs: string[] = ['', '', '']; 
  questions: string[] = [
    'What did you learn in this lesson?',
    'What was easy for you?',
    'What was difficult for you?'
  ];
  questionsInTamil: string[]=[
    'இந்த பாடத்தில் நீங்கள் என்ன கற்றுக்கொண்டீர்கள்?',
    'உங்களுக்கு எது எளிதாக இருந்தது?',
    'உங்களுக்கு என்ன கடினமாக இருந்தது?'
  ];
  lang:string = 'ta';
  caretPos: number = 0;

  constructor(private http: HttpClient) {}

  @ViewChild('myFrame') iframe: ElementRef;

  hideH1() {
    const iframeEl = this.iframe.nativeElement as HTMLIFrameElement;
    const iframeDocument = iframeEl.contentWindow.document;
    const h1Element = iframeDocument.getElementsByTagName('h1')[0];
    console.log(h1Element);

    

    if (h1Element) {
      h1Element.style.display = 'none';
    }
  }

// myFunction() {
//   var iframe = document.getElementById("myFrame");
//   var element = iframe.contentWindow.document.getElementsByTagName("H1")[0];
//   element.style.display = "none";
// }  

  async fetchSuggestions(word: string,event: Event) {
    event.preventDefault();
    if (!word) {
      this.suggestions = [];
      return;
    }
    let array = word.split(' ');
    let lastWord = array[array.length-1] || ""
    // console.log(lastWord);
    
    try {
      let response: any = await this.http
        .get<any[]>(
          `https://www.google.com/inputtools/request?text=${encodeURIComponent(
            lastWord
          )}&itc=${encodeURIComponent(`${this.lang}-t-i0-und`)}&num=${encodeURIComponent(
            '8'
          )}`
        )
        .toPromise();

      let newSuggestions = response[1][0][1];
      this.suggestions = newSuggestions;
      this.showSuggestions = this.suggestions.length > 0;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }



  applySuggestion(suggestion: string) {
    let deleteLastWord = this.userInputs[this.questionIndex].split(' ')
    deleteLastWord[deleteLastWord.length-2] = suggestion
    
    this.userInputs[this.questionIndex] = deleteLastWord.join(' ');
    this.showSuggestions = false;
  }

  updateCursorLocation(event: KeyboardEvent) {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      const inputElement = event.target as HTMLTextAreaElement;
      const textBeforeCursor = inputElement.value.substring(0, inputElement.selectionStart);
      const hindiLetters = textBeforeCursor.match(/[\u0900-\u097F]/g);
      
      let columnCountBeforeCursor = 0;
      if (hindiLetters) {
        const hindiTextBeforeCursor = hindiLetters.join('');
        columnCountBeforeCursor = hindiTextBeforeCursor.length;
      }
  
      const linesBeforeCursor = textBeforeCursor.split('\n');
      const lastLineBeforeCursor = linesBeforeCursor[linesBeforeCursor.length - 1];
      const lineCountBeforeCursor = linesBeforeCursor.length;
  
      const lineHeight = 18; // Adjust this value based on your styling
      const fontSize = 14; // Adjust this value based on your styling
  
      const x = columnCountBeforeCursor * fontSize;
      const y = lineCountBeforeCursor * lineHeight;
  
      this.cursorLocation = { x, y };
    }
  }
  

  onKeyDown(event: KeyboardEvent) {    
    if(this.userInputs[this.questionIndex] === ''){
      this.suggestions = []
    }
    if (event.key === ' ') {
      event.preventDefault(); // Prevent the default spacebar behavior (inserting a space)
      if (this.suggestions.length > 0) {
        this.applySuggestion(this.suggestions[0]+" ");
      }
    }
  }
  
  previousQuestion() {
    this.suggestions = []
    if (this.questionIndex > 0) {
      this.questionIndex--;
    }
  }

  nextQuestion() {
    this.suggestions = []
    if (this.questionIndex < this.questions.length - 1) {
      this.questionIndex++;
    }
  }
}
