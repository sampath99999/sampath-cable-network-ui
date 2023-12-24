import { Component, OnInit, inject } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppConstants } from 'src/app/global/app-constants';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit {
  authService = inject(AuthService);
  api = inject(RestApiService);
  router = inject(Router);
  public natureOfHarassment: any = []
  ngOnInit() {
    this.getnatureOfHarassment();
  }
  getnatureOfHarassment(): void {

    this.api.getData("/getnatureOfHarassment").then((response: any) => {
      this.natureOfHarassment = response?.data;
    },
      (response: any) => {
        Swal.fire("Warning", response?.error.message ?? AppConstants.ERROR_MSG, 'warning');
      }
    )
  }
  createNatureOfHarassment(){
console.log('ss');
  }
  
}

