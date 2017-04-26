import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class Profile {

	public firstName;
	public lastName;
	public color = "black";
	public status;
	public id;

    constructor(public navCtrl: NavController, public params: NavParams, public http: Http) {
		this.http.get("https://giscn-backend.herokuapp.com/" + params.get("id") + "/profile")
		//this.http.get("http://127.0.0.1:3000/" + params.get("id") + "/profile")
		.toPromise()
		.then((response) => {
			console.log(response.json());
			this.firstName = response.json().firstName;
			this.lastName = response.json().lastName;
			this.id = params.get('id');

			if(response.json().status == 0) {
				this.color = "green";
			}
			else if(response.json().status == 1) {
				this.color = "orange";
			}
			else if(response.json().status == 2) {
				this.color = "red";
			}
		})
		.catch((err) => {
			console.log(err);
		});
    }

	updateStatus(){
		console.log(this.status);

		this.http.post("https://giscn-backend.herokuapp.com/" + this.id + "/status", {status: this.status})
		//this.http.post("http://127.0.0.1:3000/" + this.id + "/status", {status: this.status})
		.toPromise()
		.then((response) => {
			console.log(response);
			this.http.get("https://giscn-backend.herokuapp.com/" + this.id + "/profile")
			//this.http.get("http://127.0.0.1:3000/" + this.id + "/profile")
			.toPromise()
			.then((response) => {
				console.log(response);

				if(response.json().status == 0) {
					this.color = "green";
				}
				else if(response.json().status == 1) {
					this.color = "orange";
				}
				else if(response.json().status == 2) {
					this.color = "red";
				}
			})
			.catch((err) => {
				console.log(err);
			});
		})
		.catch((err) => {
			console.log(err);
		});
	}

}
