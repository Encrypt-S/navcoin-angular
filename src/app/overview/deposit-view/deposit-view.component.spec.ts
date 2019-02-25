import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositViewComponent } from './deposit-view.component';

describe('DepositViewComponent', () => {
  let component: DepositViewComponent;
  let fixture: ComponentFixture<DepositViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
