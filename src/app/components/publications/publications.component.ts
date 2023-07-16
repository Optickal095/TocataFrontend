import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from 'src/app/models/publication';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { PublicationService } from 'src/app/services/publication.service';
import * as $ from 'jquery';

@Component({
  selector: 'publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers: [UserService, PublicationService],
})
export class PublicationsComponent implements OnInit {
  @Input() user: string;
  public identity;
  public token;
  public title: string;
  public url: string;
  public imageUrl: string;
  public status: string;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public publications: Publication[] = [];
  public noMore: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService
  ) {
    this.title = 'Publicaciones';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.imageUrl = GLOBAL.imageUrl;
    this.status = '';
    this.page = 1;
    this.total = 0;
    this.pages = 0;
    this.itemsPerPage = 0;
    this.noMore = false;
    this.user = '';
  }

  ngOnInit() {
    console.log('publications.component cargado correctamente');
    this.getPublications(this.user, this.page);
  }

  getPublications(user: string, page: any, adding = false) {
    if (this.token) {
      this._publicationService
        .getPublicationsUser(this.token, user, page)
        .subscribe(
          (response) => {
            console.log(response);

            if (response.publications) {
              this.total = response.total_items;
              this.pages = response.pages;
              this.itemsPerPage = response.itemsPerPage;
              if (!adding) {
                this.publications = response.publications;
              } else {
                let arrayA = this.publications;
                let arrayB = response.publications;
                this.publications = arrayA.concat(arrayB);

                $('html, body').animate(
                  { scrollTop: $('html').prop('scrollHeight') },
                  1000
                );
              }

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
    this.getPublications(this.user, this.page, true);
  }
}
