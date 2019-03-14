import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletStatusComponent } from './wallet-status.component';

describe('WalletStatusComponent', () => {
  let component: WalletStatusComponent;
  let fixture: ComponentFixture<WalletStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WalletStatusComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
