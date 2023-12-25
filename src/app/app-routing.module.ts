import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from './dashboard/home/home.component';
const routes: Routes = [
	{ path: '', component: LoginComponent },
	{
		path: 'dashboard', component: DashboardComponent, children: [
			{
				path: "",
				component: HomeComponent
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
