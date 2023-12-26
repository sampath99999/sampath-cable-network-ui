import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from './dashboard/home/home.component';
import {UserManagementComponent} from "./dashboard/user-management/user-management.component";
const routes: Routes = [
	{ path: '', component: LoginComponent },
	{
		path: 'dashboard', component: DashboardComponent, children: [
			{
				path: "",
				component: HomeComponent,
			},
			{
				path: "user-management",
				component: UserManagementComponent
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
