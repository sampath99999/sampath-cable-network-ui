import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelPackageManagementComponent } from './channel-package-management.component';

describe('ChannelPackageManagementComponent', () => {
  let component: ChannelPackageManagementComponent;
  let fixture: ComponentFixture<ChannelPackageManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChannelPackageManagementComponent]
    });
    fixture = TestBed.createComponent(ChannelPackageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
