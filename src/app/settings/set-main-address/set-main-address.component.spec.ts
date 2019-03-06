import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMainAddressComponent } from './set-main-address.component';

describe('SetMainAddressComponent', () => {
  let component: SetMainAddressComponent;
  let fixture: ComponentFixture<SetMainAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SetMainAddressComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMainAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
