import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SMS-Web';
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor(
    public auth: AngularFireAuth,
    public fireStore: AngularFirestore,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.auth.signOut();
  }
  addUser() {
    var users = [
      {
        email: 'anh@gmail.com',
        uid: 'oq1uSzZiFvTL7zIdbM4v3o8nYSQ2',
        firstName: 'Anh',
        lastName: 'Nguyen',
        phone: '0979517820',
        address: 'Hanoi',
        dateOfBirth: '21/03/1998',
        placeOfBirth: 'Hanoi',
        gender: 'Female',
        nationality: 'Vietnam',
        image: '',
        role: 'admin'
      },
      {
        email: 'manager@gmail.com',
        uid: 'cXvO04J5MNUfsqeyEq5T2okzHkA3',
        firstName: 'Anh',
        lastName: 'Nguyen',
        phone: '0979517820',
        address: 'Hanoi',
        dateOfBirth: '21/03/1998',
        placeOfBirth: 'Hanoi',
        gender: 'Female',
        nationality: 'Vietnam',
        image: '',
        role: 'manager'
      },
      {
        email: 'lecturer@gmail.com',
        uid: '6WIC0Ry2kDbetTcdUxD9Cq2Bfw83',
        firstName: 'Anh',
        lastName: 'Nguyen',
        phone: '0979517820',
        address: 'Hanoi',
        dateOfBirth: '21/03/1998',
        placeOfBirth: 'Hanoi',
        gender: 'Female',
        nationality: 'Vietnam',
        image: '',
        role: 'lecturer'
      },
      {
        email: 'student@gmail.com',
        uid: 'tMhHdP2uUncBKGwlmwu2GRF20Aa2',
        firstName: 'Anh',
        lastName: 'Nguyen',
        phone: '0979517820',
        address: 'Hanoi',
        dateOfBirth: '21/03/1998',
        placeOfBirth: 'Hanoi',
        gender: 'Female',
        nationality: 'Vietnam',
        image: '',
        role: 'student'
      },
    ]
    users.forEach(user => {
      this.fireStore.collection("users").doc(user.uid).set({
        user
      })
        .then((docRef) => {
          console.log("Document written with ID: ");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    });
  }



}
