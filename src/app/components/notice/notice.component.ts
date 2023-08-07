import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Notice } from 'src/app/models/notice';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { NoticeService } from 'src/app/services/notice.service';

@Component({
  selector: 'notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
  providers: [UserService, NoticeService],
})
export class NoticeComponent implements OnInit {
  @Input() user: string;
  public identity;
  public token;
  public title;
  public url;
  public imageUrl;
  public status;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public notices: Notice[] = [];
  public noMore: boolean;
  public fetchedNotices: Notice[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _noticeService: NoticeService
  ) {
    (this.title = 'Avisos'), (this.identity = this._userService.getIdentity());
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.imageUrl = GLOBAL.imageUrl;
    this.status = '';
    this.page = 1;
    this.total = 0;
    this.pages = 0;
    this.itemsPerPage = 0;
    this.user = '';
    this.noMore = false;
  }

  ngOnInit() {
    console.log('notice.component cargado correctamente');
    this.getNotices(this.page);
  }

  getNotices(page: any) {
    if (this.token) {
      this._noticeService.getNotices(this.token, page).subscribe(
        (response) => {
          console.log(response);

          if (response.notices) {
            this.fetchedNotices = response.notices;
            this.total = response.total_items;
            this.pages = response.pages;
            this.itemsPerPage = response.itemsPerPage;

            if (page > this.pages) {
              //this._router.navigate(['/home']);
            }
          } else {
            this.status = 'error';
          }
        },
        (error) => {
          this.status = 'error';
          console.log(error);
        }
      );
    } else {
      // Manejar caso de token nulo
      this.status = 'error';
      console.log('Token is null');
    }
  }

  viewMore() {
    this.page += 1;
    if (this.page == this.pages) {
      this.noMore = true;
    }
    this.getNotices(this.page);
  }
}
