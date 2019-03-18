import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRPCAuthComponent } from './change-rpc-auth.component';

describe('ChangeRPCAuthComponent', () => {
  let component: ChangeRPCAuthComponent;
  let fixture: ComponentFixture<ChangeRPCAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeRPCAuthComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRPCAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
