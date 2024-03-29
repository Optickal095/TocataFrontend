import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public title: String;
  public user: User;
  public status: String;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Identificate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', true, '');
    this.status = '';
  }
  ngOnInit(): void {
    console.log('Componente de login cargado');
  }

  onSubmit() {
    this._userService.singup(this.user).subscribe(
      (response) => {
        if (response && response.access && response.user) {
          const accessToken = response.access;
          const user = response.user;

          console.log(accessToken); // Imprime el token de acceso
          console.log(user); // Imprime el objeto User

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('user', JSON.stringify(user));

          this.getCounters();
        } else {
          this.status = 'error';
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

  getCounters() {
    this._userService.getCounters().subscribe(
      (response) => {
        localStorage.setItem('stats', JSON.stringify(response));
        this.status = 'success';
        this._router.navigate(['/']);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
