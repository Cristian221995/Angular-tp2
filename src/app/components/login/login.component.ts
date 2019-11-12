import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginForm: FormGroup;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(this.user.email,
        [Validators.required, Validators.email]),
      password: new FormControl(this.user.password,
        [Validators.required]),
    });
  }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  login() {
    this.user.email = this.email.value;
    this.user.password = this.password.value;
    this.userService.login(this.user).subscribe(
      response => {
        console.log('/////Response', response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
