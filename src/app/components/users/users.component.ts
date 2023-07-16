import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { Follow } from 'src/app/models/follow';
import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService, FollowService],
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
  public follows: any;
  public status: string;
  public followUserOver: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService
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
    this.follows = [];
    this.followUserOver = 0;
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
          this.follows = response.users_following;

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

  mouseEnter(user_id: any) {
    this.followUserOver = user_id;
  }

  mouseLeave(user_id: any) {
    this.followUserOver = 0;
  }

  followUser(followed: any) {
    let follow = JSON.parse(
      '{ "_id":"\'\'", "user":"' +
        this.identity._id +
        '", "followed":"' +
        followed +
        '" }'
    );

    this._followService.addFollow(this.token, follow).subscribe(
      (response) => {
        if (!response.followStored) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.follows.push(followed);
          this.followUserOver = followed;

          this.getUsers(this.page);
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

  unfollowUser(followed: any) {
    this._followService.deleteFollow(this.token, followed).subscribe(
      (response) => {
        let search = this.follows.indexOf(followed);
        if (search != -1) {
          this.follows.splice(search, 1);
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
