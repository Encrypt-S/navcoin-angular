import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToViewComponent } from './send-to-view.component';

describe('SendToViewComponent', () => {
  let component: SendToViewComponent;
  let fixture: ComponentFixture<SendToViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendToViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
