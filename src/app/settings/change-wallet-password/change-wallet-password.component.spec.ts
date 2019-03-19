import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeWalletPasswordComponent } from './change-wallet-password.component';

describe('ChangeWalletPasswordComponent', () => {
  let component: ChangeWalletPasswordComponent;
  let fixture: ComponentFixture<ChangeWalletPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeWalletPasswordComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeWalletPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
