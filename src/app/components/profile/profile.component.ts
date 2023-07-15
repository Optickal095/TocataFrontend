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
  public user: User;
  public status: string;
  public identity;
  public token;
  public stats;
  public url;
  public imageUrl;
  public follow;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService
  ) {
    this.title = 'Perfil';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', true, '');
    this.status = '';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = '';
    this.url = GLOBAL.url;
    this.imageUrl = GLOBAL.imageUrl;
    this.follow = '';
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
        if (response.user) {
          this.user = response.user;
          console.log(response);
        } else {
          this.status = 'error';
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
        this.status = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
