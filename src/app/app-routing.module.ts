import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from './dashboard/home/home.component';
import { AgencyManagementComponent } from './dashboard/agency-management/agency-management.component';
import { CounsellingCentreManagementComponent } from './dashboard/counselling-centre-management/counselling-centre-management.component';
import { MasterDataComponent } from './dashboard/master-data/master-data.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{
		path: 'dashboard', component: DashboardComponent, children: [
			{
				path: "",
				component: HomeComponent
			},
			{
				path: "agency-management",
				component: AgencyManagementComponent
			},
			{
				path:"counselling-centre-management",
				component:CounsellingCentreManagementComponent
			},
			{
				path:"master-data",
				component:MasterDataComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
