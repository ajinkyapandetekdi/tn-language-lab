import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddyLoginComponent } from './buddy-login.component';

describe('BuddyLoginComponent', () => {
  let component: BuddyLoginComponent;
  let fixture: ComponentFixture<BuddyLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuddyLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuddyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
