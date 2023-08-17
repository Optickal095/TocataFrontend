import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notice } from 'src/app/models/notice';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { NoticeService } from 'src/app/services/notice.service';
import * as moment from 'moment';

@Component({
  selector: 'notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
  providers: [UserService, NoticeService],
})
export class NoticeComponent implements OnInit {
  @Input() user: string = '';

  public identity;
  public token;
  public title: string = 'Avisos';
  public url: string;
  public imageUrl: string;
  public status: string = '';
  public fetchedNotices: Notice[] = [];
  public noMoreNotices: boolean = false;
  public pageNotices: number = 1;
  public pagesNotices: number = 0;
  public formattedDate: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _noticeService: NoticeService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.imageUrl = GLOBAL.imageUrl;
    this.formattedDate = '';
  }

  ngOnInit(): void {
    console.log('notice.component cargado correctamente');
    this.getNotices(this.pageNotices);
  }

  getNotices(page: number, adding = false) {
    if (this.token) {
      this._noticeService.getNotices(this.token, page).subscribe(
        (response) => {
          console.log(response);

          if (response.notices) {
            this.pagesNotices = response.pages;

            if (!adding) {
              this.fetchedNotices = response.notices;
            } else {
              this.fetchedNotices = this.fetchedNotices.concat(
                response.notices
              );
            }

            this.noMoreNotices = this.pageNotices >= this.pagesNotices;

            // Formatear todas las fechas utilizando Moment.js
            this.fetchedNotices.forEach((notice: Notice) => {
              if (notice.date && !isNaN(new Date(notice.date).getTime())) {
                const date = new Date(notice.date);
                const formattedDate = `${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
                notice.date = formattedDate;
              } else {
                notice.date = 'Fecha inválida';
              }
            });
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
      this.status = 'error';
      console.log('Token is null');
    }
  }

  viewMoreNotices() {
    this.pageNotices += 1;
    this.getNotices(this.pageNotices, true);
  }
}
