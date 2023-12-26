import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-header-profile',
	templateUrl: './header-profile.component.html',
	styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {
	userDetails = {};

	constructor(public authService: AuthService, private spinner: NgxSpinnerService) { }

	async ngOnInit() {
		this.spinner.show();
		await this.authService.getUserDetails();
		this.spinner.hide();
	}

	logout() {
		this.authService.logout();
	}
}
