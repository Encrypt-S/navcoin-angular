import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericRpcFormComponent } from './generic-rpc-form.component';

describe('GenericRpcFormComponent', () => {
  let component: GenericRpcFormComponent;
  let fixture: ComponentFixture<GenericRpcFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericRpcFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericRpcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
