import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-staffList',
    templateUrl: 'staffList.html'
})
export class StaffList {

	users: any;

    constructor(public navCtrl: NavController, http: Http) {
		http.get("https://giscn-backend.herokuapp.com/users")
		//http.get("http://127.0.0.1:3000/users")
		.toPromise()
		.then((response) => {
			this.users = response.json();
		})
		.catch((err) => {
			console.log(err);
		});
    }

}
