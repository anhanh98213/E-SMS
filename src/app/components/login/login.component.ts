import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	constructor(public authService: AuthService) { }

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

	// Sign in with email/password
	async login(email: string, password: string) {
		var user = await this.authService.login(email, password)
		if(user){
			console.log(user);
			let element: HTMLElement = document.getElementById('close') as HTMLElement;
			element.click()
		}	
	}
}
