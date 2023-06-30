import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserService],
})
export class UserEditComponent implements OnInit {
  public title: string;
  public user: User;
  public identity;
  public token;
  public status: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Actualizar mis datos';
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    console.log(this.user);

    console.log('user-edit.component se ha cargado!!');
  }

  onSubmit() {
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      (response) => {
        console.log(response.user);

        if (!response.user) {
          this.status = 'error';
        } else {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;
        }
      },
      (error) => {
        let errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
}
