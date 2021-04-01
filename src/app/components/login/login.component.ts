import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { User } from 'src/app/shared/services/user';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	userData: any; // Save logged in user data

	constructor(
		public afs: AngularFirestore,   // Inject Firestore service
		public router: Router,
		public ngZone: NgZone // NgZone service to remove outside scope warning
	) {
		/* Saving user data in localstorage when logged in and setting up null when logged out */
		// this.afAuth.authState.subscribe(user => {
		//   if (user) {
		//     this.userData = user;
		//     localStorage.setItem('user', JSON.stringify(this.userData));
		//     JSON.parse(localStorage.getItem('user'));
		//   } else {
		//     localStorage.setItem('user', null);
		//     JSON.parse(localStorage.getItem('user'));
		//   }
		// })
	}

	ngOnInit(): void {
	}

	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.minLength(4),
	]);

	passwordFormControl = new FormControl('', [
		Validators.required,
		Validators.minLength(6),
	]);


	getErrorMessage() {
		if (this.emailFormControl.hasError('required')) {
			return 'You must enter a value';
		}
		return this.passwordFormControl.hasError('email') ? 'Not a valid email' : '';
	}

	login(email: string, password: string) {
		firebase.auth().signInWithEmailAndPassword(email, password).then(async (userCredential) => {
			var user = await firebase.auth().currentUser
			// var name, email, photoUrl, uid, emailVerified;

			// if (user != null) {
			//   name = user.displayName;
			//   email = user.email;
			//   photoUrl = user.photoURL;
			//   emailVerified = user.emailVerified;
			//   uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
			//   // this value to authenticate with your backend server, if
			//   // you have one. Use User.getToken() instead.
			// }
			this.ngZone.run(() => {
				this.router.navigate(['addMajor']);
			});
			this.SetUserData(user);
		})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
			});
	}

	/* Setting up user data when sign in with username/password, 
	sign up with username/password and sign in with social auth  
	provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
	SetUserData(user: any) {
		console.log(user.uid);
		console.log(user.email);

		const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
		const userData: User = {
			uid: user.uid,
			email: user.email,
		}
		return userRef.set(userData, {
			merge: true
		})
	}

}
