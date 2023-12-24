import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellingCentreManagementComponent } from './counselling-centre-management.component';

describe('CounsellingCentreManagementComponent', () => {
  let component: CounsellingCentreManagementComponent;
  let fixture: ComponentFixture<CounsellingCentreManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounsellingCentreManagementComponent]
    });
    fixture = TestBed.createComponent(CounsellingCentreManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });
});
