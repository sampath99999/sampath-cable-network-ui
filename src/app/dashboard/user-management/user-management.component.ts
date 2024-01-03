import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
	selector: 'app-user-management',
	templateUrl: './user-management.component.html',
	styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
	api = inject(RestApiService);
	fb = inject(FormBuilder);

	userCreateForm = this.fb.group({
		full_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
		email: ['', [Validators.email]],
		phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
		role_id: ['', [Validators.required]],
		username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
		password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
	});
	ucf: any = this.userCreateForm.controls

	roles = [];
	formSubmitted = false;

	ngOnInit(): void {
		this.getRoles();
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
	}

	isFieldInvalid(name: any): boolean {
		return (this.ucf[name].touched || this.ucf[name].dirty || this.formSubmitted) && this.ucf[name].invalid
	}
}
