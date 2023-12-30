import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
	userCreateForm = new FormGroup({
		full_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
		email: new FormControl('', [Validators.email]),
		phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
		role_id: new FormControl('', [Validators.required]),
		username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
		password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)])
	});
}
