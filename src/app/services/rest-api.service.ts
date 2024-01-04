import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { Environment } from "@angular/cli/lib/config/workspace-schema";
import { Router } from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class RestApiService {

	constructor(private http: HttpClient, private router: Router) {
	}

	public getHeaders() {
		let token = localStorage.getItem("token") || '';
		return new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		})
	}

	public getData(endpoint: string, data = {}) {
		return new Promise((resolve, reject) => {
			this.http.get(env.apiURL + endpoint, { params: data, headers: this.getHeaders() }).subscribe((res) => {
				resolve(res);
			},
				(error) => {
					if (error.status == 401) {
						this.handleApiError(error);
					} else {
						reject(error);
					}
				}
			);
		});
	}

	public postData(endpoint: string, data = {}) {
		return new Promise((resolve, reject) => {
			this.http.post(env.apiURL + endpoint, data, { headers: this.getHeaders() }).subscribe((res) => {
				resolve(res);
			},
				(error) => {
					if (error.status == 401) {
						this.handleApiError(error);
					} else {
						reject(error);
					}
				}
			);
		});
	}

	public putData(endpoint: string, data = {}) {
		return new Promise((resolve, reject) => {
			this.http.put(env.apiURL + endpoint, data, { headers: this.getHeaders() }).subscribe((res) => {
				resolve(res);
			},
				(error) => {
					if (error.status == 401) {
						this.handleApiError(error);
					} else {
						reject(error);
					}
				}
			);
		});
	}

	public deleteData(endpoint: string, data = {}) {
		return new Promise((resolve, reject) => {
			this.http.delete(env.apiURL + endpoint, { headers: this.getHeaders() }).subscribe((res) => {
				resolve(res);
			},
				(error) => {
					if (error.status == 401) {
						this.handleApiError(error);
					} else {
						reject(error);
					}
				}
			);
		});
	}

	private handleApiError(errorResponse: HttpErrorResponse) {
		switch (errorResponse.status) {
			case 504:
				'504 Gateway Timeout';
				break;
			case 502:
				'502 Bad Gateway';
				break;
			case 500:
				'Internal Server Error';
				break;
			case 405:
				'Method Not Allowed';
				break;
			case 404:
				'404 Not Found';
				break;
			case 403:
				'Forbidden';
				break;
			case 401:
				localStorage.removeItem("token");
				this.router.navigate([""]);
				'Unauthorized';
				break;
			case 400:
				'error';
				break;
		}
	}
}
