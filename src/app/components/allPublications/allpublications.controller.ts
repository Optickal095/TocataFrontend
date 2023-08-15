import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from 'src/app/services/publication.service';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-all-publications',
  templateUrl: './allpublications.component.html',
  styleUrls: ['./allpublications.component.css'],
})
export class AllPublicationsComponent implements OnInit {
  public publications: Publication[] = [];
  public page = 1;
  public token: string = '';
  public url = GLOBAL.url;
  public imageUrl = GLOBAL.imageUrl;
  public showImage: any;
  constructor(
    private _publicationService: PublicationService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadPublications();
    this.token = this._userService.getToken() || '';
    this.showImage = '';
  }

  loadPublications() {
    this._publicationService
      .getAllPublications(this.token, this.page)
      .subscribe(
        (response) => {
          console.log(response);
          this.publications = response.publications;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  loadMorePublications() {
    this.page += 1;
    this._publicationService
      .getAllPublications(this.token, this.page)
      .subscribe(
        (response) => {
          console.log(response);
          this.publications = this.publications.concat(response.publications);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  showThisImage(publicationId: string) {
    this.showImage = publicationId;
  }

  hideThisImage(publicationId: string) {
    this.showImage = null;
  }
}
