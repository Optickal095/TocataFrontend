import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { Follow } from 'src/app/models/follow';
import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, FollowService],
})
export class ProfileComponent implements OnInit {
  public title: string;
  public user: any;
  public status: string;
  public identity;
  public token;
  public stats: any = {};
  public url;
  public imageUrl;
  public followed: boolean;
  public following: boolean;
  public followUserOver: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService
  ) {
    this.title = 'Perfil';
    this.user = this.loadPage();
    this.status = '';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = '';
    this.url = GLOBAL.url;
    this.imageUrl = GLOBAL.imageUrl;
    this.followed = false;
    this.following = false;
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    console.log('profile.component cargado correctamente');
    this.loadPage();
  }

  loadPage() {
    this._route.params.subscribe((params) => {
      let id = params['id'];

      this.getUser(id);
      this.getCounters(id);
    });
  }

  getUser(id: any) {
    this._userService.getUser(id).subscribe(
      (response) => {
        console.log(response);

        if (response.user) {
          this.user = response.user;

          if (response && response.following && response.following._id) {
            this.following = true;
          } else {
            this.following = false;
          }
        } else {
          this.status = 'error';
        }

        if (response && response.followed && response.followed._id) {
          this.followed = true;
        } else {
          this.followed = false;
        }
      },
      (error) => {
        console.log(error);
        this._router.navigate(['/perfil', this.identity._id]);
      }
    );
  }

  getCounters(id: any) {
    this._userService.getCounters(id).subscribe(
      (response) => {
        this.stats = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  followUser(followed: string) {
    if (this.token) {
      let follow = new Follow('', this.identity._id, followed);

      this._followService.addFollow(this.token, follow).subscribe(
        (response) => {
          this.following = true;
        },
        (error) => {
          console.log(<any>error);
        }
      );
    }
  }

  unfollowUser(followed: string) {
    if (this.token) {
      this._followService.deleteFollow(this.token, followed).subscribe(
        (response) => {
          this.following = false;
        },
        (error) => {
          console.log(<any>error);
        }
      );
    }
  }

  mouseEnter(user_id: any) {
    this.followUserOver = user_id;
  }

  mouseLeave() {
    this.followUserOver = 0;
  }
}
