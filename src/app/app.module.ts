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
import {SidebarMenuComponent} from "./dashboard/sidebar-menu/sidebar-menu.component";
import {HeaderProfileComponent} from "./dashboard/header-profile/header-profile.component";
import { UserManagementComponent } from './dashboard/user-management/user-management.component';
import { ChannelPackageManagementComponent } from './dashboard/channel-package-management/channel-package-management.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		DashboardComponent,
		HomeComponent,
		SidebarMenuComponent,
		HeaderProfileComponent,
  UserManagementComponent,
  ChannelPackageManagementComponent,
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
