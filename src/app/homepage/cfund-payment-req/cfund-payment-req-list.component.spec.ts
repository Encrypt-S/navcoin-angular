import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CFundPaymentRequestListComponent } from './cfund-payment-req-list.component';

describe('CFundPaymentRequestListComponent', () => {
  let component: CFundPaymentRequestListComponent;
  let fixture: ComponentFixture<CFundPaymentRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CFundPaymentRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CFundPaymentRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
