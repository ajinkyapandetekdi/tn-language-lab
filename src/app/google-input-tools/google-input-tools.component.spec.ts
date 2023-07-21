import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleInputToolsComponent } from './google-input-tools.component';

describe('GoogleInputToolsComponent', () => {
  let component: GoogleInputToolsComponent;
  let fixture: ComponentFixture<GoogleInputToolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleInputToolsComponent]
    });
    fixture = TestBed.createComponent(GoogleInputToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
