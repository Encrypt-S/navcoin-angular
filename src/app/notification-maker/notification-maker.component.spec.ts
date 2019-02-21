import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMakerComponent } from './notification-maker.component';

describe('NotificationMakerComponent', () => {
  let component: NotificationMakerComponent;
  let fixture: ComponentFixture<NotificationMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
