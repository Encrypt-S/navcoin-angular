import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPasswordComponent } from './update-ui-password.component';

describe('UiPasswordComponent', () => {
  let component: UiPasswordComponent;
  let fixture: ComponentFixture<UiPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
