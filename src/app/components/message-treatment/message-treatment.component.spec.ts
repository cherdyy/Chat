import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTreatmentComponent } from './message-treatment.component';

describe('MessageTreatmentComponent', () => {
  let component: MessageTreatmentComponent;
  let fixture: ComponentFixture<MessageTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
