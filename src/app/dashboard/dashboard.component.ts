import { Component, OnInit, inject } from '@angular/core';
import { RestApiService } from "../services/rest-api.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	userDetails: any = {};
	authService = inject(AuthService);
	api = inject(RestApiService);
	router = inject(Router);
	spinner = inject(NgxSpinnerService);
	constructor() {
	}
	ngOnInit() {
		if (!localStorage.getItem("token")) {
			this.router.navigate([""]);
			return;
		}
	}
}
