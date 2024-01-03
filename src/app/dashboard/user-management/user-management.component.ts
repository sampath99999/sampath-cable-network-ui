import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import { RestApiService } from 'src/app/services/rest-api.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-user-management',
	templateUrl: './user-management.component.html',
	styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
	api = inject(RestApiService);
	fb = inject(FormBuilder);
	spinner = inject(NgxSpinnerService)

	userCreateForm = this.fb.group({
		name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
		email: ['', [Validators.email]],
		phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
		role_id: ['', [Validators.required]],
		username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[a-zA-Z0-9\-_]+$')]],
		password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
	});
	ucf: any = this.userCreateForm.controls

	roles = [];
	formSubmitted = false;
	userList: Array<any> = [];

	ngOnInit(): void {
		this.getUserList();
		this.getRoles();
	}

	getUserList() {
		this.api.getData("/user/getAll").then(
			(response: any) => {
				this.userList = response.data;
			}
		)
	}

	getRoles() {
		this.api.getData("/user/roles").then(
			(response: any) => {
				this.roles = response?.data?.roles;
			}
		)
	}

	createUser() {
		this.formSubmitted = true;
		if (this.userCreateForm.invalid) return;
		this.spinner.show();
		this.api.postData("/user/create", this.userCreateForm.value).then(
			(response: any) => {
				Swal.fire("Success", "User Created Successfully!", "success");
				this.userCreateForm.reset();
				this.formSubmitted = false;
				// Update User List
			},
			(response: any) => {
				Swal.fire("Warning", response?.error?.message ?? "Something Went Wrong!", "warning");
			}
		).finally(() => {
			this.spinner.hide();
		})
	}

	isFieldInvalid(name: any): boolean {
		return (this.ucf[name].touched || this.ucf[name].dirty || this.formSubmitted) && this.ucf[name].invalid
	}

	async changeStatus(index: any, status: any) {
		let confirm = await Swal.fire({
			title: "",
			html: "Are you sure you want to " + (status ? "Activate" : "DeActivate"),
			icon: "question",
			showConfirmButton: true,
			showCancelButton: true
		});
		if (!confirm.isConfirmed) return;
		this.spinner.show();
		this.api.putData('/user/changeStatus', { id: this.userList[index].id, status }).then(
			() => {
				Swal.fire("Success", "Updated Successfully", "success");
				this.userList[index].status = status;
			},
			(response) => {
				Swal.fire("Warning", response?.error?.message ?? "Something Went Wrong!", "warning");
			}
		).finally(() => {
			this.spinner.hide();
		})
	}
}
