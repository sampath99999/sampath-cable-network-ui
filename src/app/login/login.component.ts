import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../services/rest-api.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	errors = [];
	submitted = false;
	loading = false;
	loginForm: FormGroup = new FormGroup<any>({
		username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
		password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)])
	});

	constructor(private api: RestApiService, private router: Router, private authService: AuthService) {
	}

	ngOnInit() {
		if (localStorage.getItem("token")) {
			this.router.navigate(["dashboard"]);
		}
	}

	async login() {
		this.loading = true;
		let credentials: { username: string, password: string } = this.loginForm.value;
		this.authService.login(credentials, () => {
			this.loading = false;
		});
	}
}
