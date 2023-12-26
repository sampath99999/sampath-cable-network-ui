import { afterRender, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
	selector: 'app-sidebar-menu',
	templateUrl: './sidebar-menu.component.html',
	styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
	userMenus: any = [];
	menusLoaded = false;
	errorOccurred = false;

	constructor(private api: RestApiService, public router: Router) {
	}

	ngOnInit(): void {
		this.api.getData("/getMenus").then((response: any) => {
			this.userMenus = response.data;
		}, () => {
			this.errorOccurred = true;
		}).finally(() => {
			this.menusLoaded = true;
		})
	}
}
