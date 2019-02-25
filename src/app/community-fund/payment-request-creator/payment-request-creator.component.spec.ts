import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalCreatorComponent } from './proposal-creator.component';

describe('ProposalCreatorComponent', () => {
  let component: ProposalCreatorComponent;
  let fixture: ComponentFixture<ProposalCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
