import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public userDetails: any = null;
	constructor(private api: RestApiService, private router: Router, private spinner: NgxSpinnerService) {
		if (!this.userDetails && localStorage.getItem("token")) {
			this.spinner.show();
			this.api.getData("/getUserDetails").then((response: any) => {
				this.userDetails = response.data;
				this.userDetails.shortName = response.data.name.match(/\b\w/g).join('')
			}).then(() => {
				this.spinner.hide();
			})

		}
	}

	login(credentials: any, callback: any) {
		this.api.postData("/login", credentials).then(
			(response: any) => {
				localStorage.setItem("token", response.data.token);
				this.userDetails = response.data.user;
				this.router.navigate(["dashboard"]);
			},
			(response: any) => {
				Swal.fire("Warning", response?.error.message ?? "Something went wrong, Please contact technical team!", 'warning');
			}
		).then(() => {
			callback();
		})
	}

	logout() {
		this.spinner.show();
		this.api.getData("/logout").then((response) => {
			localStorage.removeItem("token");
			this.router.navigate([""]);
		}, (error) => {
			Swal.fire("Something Went Wrong", "Error while Logout please try again!", "warning");
		}).then(() => {
			this.spinner.hide();
		});
	}
}
