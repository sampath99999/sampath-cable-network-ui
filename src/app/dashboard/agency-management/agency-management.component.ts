import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { RestApiService } from 'src/app/services/rest-api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-agency-management',
  templateUrl: './agency-management.component.html',
  styleUrls: ['./agency-management.component.scss']
})
export class AgencyManagementComponent {

  agencyList: any;
  districtList: any;
  agencyName: any = '';
  agencyShortName: any = '';
  agencyAddress: any = '';
  agencyDistrictId: any = '';
  agencyEmail: any = '';
  agencyPhone: any = '';
  api = inject(RestApiService);
  loading = false;
  @ViewChild('closeModel') closeModel: any;


  createAgencyForm: FormGroup = new FormGroup<any>({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    phone_no: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    address: new FormControl(''),
    short_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    district_id: new FormControl('', [Validators.required]),
  });
  submitted: boolean = false;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {
  }
  ngOnInit() {
    this.getAgencyList();
    this.getDistrictList();
  }

  getDistrictList(): void {
    this.districtList = [];
    this.api.getData("/getDistrictList").then((resData: any) => {
      this.districtList = resData.data;
    },
    );
  }
  getAgencyList(): void {
    this.agencyList = [];
    this.api.getData("/getAllAgency").then((response: any) => {
      this.agencyList = response?.data;
    },
    );
  }


  closeModal() {
    this.closeModel.nativeElement.click();
  }

  changeAgencyStatus(status: boolean, agencyID: number, index: number): void {
    this.spinner.show();
    this.api.postData("/updateAgency", { id: agencyID, status: status }).then((resData: any) => {
      this.spinner.hide();
      Swal.fire('Success', resData?.message, 'success');
      this.agencyList[index].status = status;
    },
      (response: any) => {
        this.spinner.hide();
        Swal.fire("Warning", response?.error.message ?? "Something went wrong, Please contact technical team!", 'warning');
      }
    );
  }

  createAgency(): void {
    this.submitted = true;
    if (this.createAgencyForm.invalid) {
      return;
    }
    let data = this.createAgencyForm.value;
    this.spinner.show();
    this.api.postData("/createAgency", data).then((resData: any) => {
      this.spinner.hide();
      Swal.fire('Success', resData?.message, 'success');
      const data = resData?.data;
      let distName = '';
      for (let i = 0; i < this.districtList.length; i++) {
        if (this.districtList[i]?.id == data?.district_id) {
          distName = this.districtList[i]?.name;
        }
      }
      this.agencyList.push({
        name: data.name,
        id: data.id,
        phone_no: data.phone_no,
        short_name:data.short_name,
        email: data.email,
        status: data.status ?? true,
        address: data.address,
        district: {
          name: distName
        }
      })
      this.closeModal();
      this.createAgencyForm.reset();
      this.submitted = false;
    },
      (response: any) => {
        this.spinner.hide();
        Swal.fire("Warning", response?.error.message ?? "Something went wrong, Please contact technical team!", 'warning');
      }
    )
  }
}
