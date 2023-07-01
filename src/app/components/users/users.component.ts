import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService],
})
export class UsersComponent implements OnInit {
  public title: string;
  public imageUrl: string;
  public identity: any;
  public token: string;
  public page;
  public nextPage: number;
  public prevPage: number;
  public total;
  public pages;
  public users: User[] = [];
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Gente';
    this.imageUrl = GLOBAL.imageUrl;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken() || '';
    this.page = 0;
    this.nextPage = 0;
    this.prevPage = 0;
    this.status = '';
    this.total = 0;
    this.pages = 0;
  }

  ngOnInit() {
    console.log('users.component ha sido cargado');
    this.actualPage();
  }

  actualPage() {
    this._route.params.subscribe((params: Params) => {
      let page = +params['page'];
      this.page = page || 1;

      if (this.page < 1) {
        this.page = 1;
      }

      this.nextPage = this.page + 1;
      this.prevPage = this.page - 1;

      if (this.prevPage < 1) {
        this.prevPage = 1;
      }

      this.getUsers(this.page);
    });
  }

  getUsers(page: any) {
    this._userService.getUsers(page).subscribe(
      (response) => {
        if (!response.users) {
          this.status = 'error';
        } else {
          this.total = response.total;
          this.users = response.users;
          this.pages = response.pages;
          if (page > this.pages) {
            this._router.navigate(['/gente', 1]);
          }
        }
      },
      (error) => {
        let errorMessage: any = error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
}
