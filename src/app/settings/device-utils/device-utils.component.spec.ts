import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceUtilsComponent } from './device-utils.component';

describe('DeviceUtilsComponent', () => {
  let component: DeviceUtilsComponent;
  let fixture: ComponentFixture<DeviceUtilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceUtilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
