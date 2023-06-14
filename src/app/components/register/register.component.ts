import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  public title: String;
  public user: User;
  public status: String;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Registrate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', true, '');
    this.status = '';
  }

  ngOnInit(): void {
    console.log('Componente de registro cargado');
  }

  onSubmit(form: NgForm) {
    this._userService.register(this.user).subscribe(
      (response) => {
        if (response.user && response.user._id) {
          this.status = 'success';
          this.user = new User('', '', '', '', '', '', 'ROLE_USER', true, '');
          form.resetForm();
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
    );
  }
}
