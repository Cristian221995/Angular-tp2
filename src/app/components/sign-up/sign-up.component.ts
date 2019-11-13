import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  UserForm: FormGroup;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.UserForm = new FormGroup({
      email: new FormControl(this.user.email,
        [Validators.required, Validators.email]),
      password: new FormControl(this.user.password,
        [Validators.required]),
    });
  }
  get email() { return this.UserForm.get('email'); }
  get password() { return this.UserForm.get('password'); }
  addUser() {
    this.user.email = this.email.value;
    this.user.password = this.password.value;
    console.log(this.user);
    this.userService.add(this.user).subscribe(
      response => {
        window.alert('User added correctly');
        this.router.navigateByUrl('login');
      },
    error => {
      console.log(error);
    });
  }

}
