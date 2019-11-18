import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginForm: FormGroup;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

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
    this.user.email = this.loginForm.get('email').value;
    this.user.password = this.loginForm.get('password').value;

    const observable = this.authService.login(this.user);
    observable.subscribe(
      response => {
        this.router.navigate(['/list']);
      },
      errors => {
          window.alert('Ha ocurrido un error');
      }
    );
  }
}
