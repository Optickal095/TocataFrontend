import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from 'src/app/models/publication';
import { User } from 'src/app/models/user';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { PublicationService } from 'src/app/services/publication.service';
import * as $ from 'jquery';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [UserService, PublicationService],
})
export class TimelineComponent implements OnInit {
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
  public users: User[] = [];
  public noMore: boolean;
  public loading: boolean;
  public showImage;

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
    this.loading = false;
    this.showImage = '';
  }

  ngOnInit() {
    console.log('timeline.component cargado correctamente');
    this.getPublications(this.page);
  }

  getPublications(page: any, adding = false) {
    this.loading = true;
    if (this.token) {
      this._publicationService.getPublications(this.token, page).subscribe(
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
                { scrollTop: $('body').prop('scrollHeight') },
                1000
              );
            }

            if (page > this.pages) {
              //this._router.navigate(['/home']);
            }
          } else {
            this.status = 'error';
          }
          this.loading = false;
        },
        (error) => {
          this.status = 'error';
          console.log(error);
          this.loading = false;
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
    this.getPublications(this.page, true);
  }

  refresh() {
    this.getPublications(1);
  }

  showThisImage(id: any) {
    this.showImage = id;
  }

  hideThisImage(id: any) {
    this.showImage = '';
  }

  deletePublication(id: any) {
    if (this.token && typeof id === 'string') {
      this._publicationService.deletePublication(this.token, id).subscribe(
        (response) => {
          this.refresh();
        },
        (error) => {
          console.log(<any>error);
        }
      );
    } else {
      console.log(
        'El token o el ID de la publicación son nulos o no son válidos.'
      );
    }
  }
}
