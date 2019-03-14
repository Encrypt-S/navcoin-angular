import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletUtilsComponent } from './wallet-utils.component';

describe('WalletUtilsComponent', () => {
  let component: WalletUtilsComponent;
  let fixture: ComponentFixture<WalletUtilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletUtilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
