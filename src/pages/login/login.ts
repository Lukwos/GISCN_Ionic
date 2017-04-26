import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Profile } from '../profile/profile';

import { Platform, NavController } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class Login {

	public phoneNumber;
	public password;
	public error;
	private token;

    constructor(public navCtrl: NavController, public http: Http, private platform: Platform, public firebase: Firebase) {
		this.firebase.getToken()
		.then((token) => {
			this.token = token;
		});
    }

	login() {
		this.http.post("https://giscn-backend.herokuapp.com/login", { phoneNumber: this.phoneNumber, password: this.password, fcmToken: this.token })
		//this.http.post("http://127.0.0.1:3000/login", { phoneNumber: this.phoneNumber, password: this.password, fcmToken: token })
		.toPromise()
		.then((response) => {
			console.log(response);
			if(response.status == 200) {
				console.log(response.json());
				this.navCtrl.setRoot(Profile, response.json());
			}
			else if(response.status == 401) {
				console.log("Bad password or phoneNumber");
			}
			else {
				console.log("Error database");
			}
		})
		.catch((err) => {
			console.log(err);
		});
	}

}
