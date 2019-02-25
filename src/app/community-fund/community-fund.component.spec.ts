import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityFundComponent } from './community-fund.component';

describe('CommunityFundComponent', () => {
  let component: CommunityFundComponent;
  let fixture: ComponentFixture<CommunityFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
