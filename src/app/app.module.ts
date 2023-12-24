import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './dashboard/home/home.component';
import { AgencyManagementComponent } from './dashboard/agency-management/agency-management.component';
import { CounsellingCentreManagementComponent } from './dashboard/counselling-centre-management/counselling-centre-management.component';
import { MasterDataComponent } from './dashboard/master-data/master-data.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		DashboardComponent,
		HomeComponent,
		AgencyManagementComponent,
		CounsellingCentreManagementComponent,
  MasterDataComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgxSpinnerModule,
		BrowserAnimationsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
