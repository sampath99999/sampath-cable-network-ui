import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppConstants } from 'src/app/global/app-constants';

@Component({
  selector: 'app-counselling-centre-management',
  templateUrl: './counselling-centre-management.component.html',
  styleUrls: ['./counselling-centre-management.component.scss']
})
export class CounsellingCentreManagementComponent implements OnInit {
  authService = inject(AuthService);
  api = inject(RestApiService);
  router = inject(Router);
  public centreName: string = ''
  public address: string = ''
  public email: any
  // public agency: string = ''
  public selectedDistrict: string = ''
  public selectedAgency: string = ''
  public cancreatease: any
  public isPhysical: any
  public canCreateCase: any
  public isVirtual: any
  public hasFco: any
  public hasCounsellor: any
  public agencies: any = []
  public districts: any = [];
  public counsellingCentres: any = [];
  @ViewChild('closeModel') closeModel: any;

  CounsellingCentreForm: FormGroup = new FormGroup<any>({
    centreName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    shortName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNo: new FormControl('', [Validators.required]),
    districtId: new FormControl('', [Validators.required]),
    agencyId: new FormControl('', [Validators.required]),
    isVirtual: new FormControl('', [Validators.required]),
    isPhysical: new FormControl('', [Validators.required]),
    canCreateCase: new FormControl('', [Validators.required]),
    hasFco: new FormControl('', [Validators.required]),
    hasCounsellor: new FormControl('', [Validators.required])
  });
  submitted: boolean = false;
  constructor(private spinner: NgxSpinnerService) {
  }
  ngOnInit() {
    this.api.getData("/getDistrictList").then((response: any) => {
      this.districts = response?.data;
    },
      (response: any) => {
        Swal.fire("Warning", response?.error.message ?? AppConstants.ERROR_MSG, 'warning');
      }
    )

    this.api.getData("/getAllAgency").then((response: any) => {
      this.agencies = response?.data;
    },
      (response: any) => {
        Swal.fire("Warning", response?.error.message ?? AppConstants.ERROR_MSG, 'warning');
      })
    this.api.getData("/getCouncellingCentre").then((response: any) => {
      this.counsellingCentres = response?.data;
    },
      (response: any) => {
        Swal.fire("Warning", response?.error.message ?? AppConstants.ERROR_MSG, 'warning');
      }
    )


  }

  closeModal() {
    this.closeModel.nativeElement.click();
  }
  public createCc(): void {
    this.submitted = true;
    if (this.CounsellingCentreForm.invalid) {
      return;
    }
    let data = this.CounsellingCentreForm.value;
    this.spinner.show();
    this.api.postData("/createCouncellingCentre", data).then((resData: any) => {
      Swal.fire('Success', resData?.message, 'success');
      this.submitted = false;
      this.spinner.hide();
      this.closeModal();
    },
      (response: any) => {
        this.spinner.hide();
        Swal.fire("Warning", response?.error.message ?? AppConstants.ERROR_MSG, 'warning');
      }
    )
  }
}

