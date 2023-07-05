import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from 'src/app/services/publication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService, PublicationService],
})
export class SidebarComponent implements OnInit {
  public identity: any;
  public token: string;
  public stats: any;
  public url: string;
  public imageUrl: string;
  public status: string;
  public publication: Publication;

  constructor(
    private userService: UserService,
    private publicationService: PublicationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken() || '';
    this.stats = this.userService.getStats();
    this.url = GLOBAL.url;
    this.imageUrl = GLOBAL.imageUrl;
    this.status = '';
    this.publication = new Publication('', '', '', '', this.identity._id);
  }

  ngOnInit() {
    console.log('sidebar.component cargado correctamente');
  }

  onSubmit(form: NgForm) {
    this.publicationService
      .addPublication(this.token, this.publication)
      .subscribe(
        (response) => {
          console.log(response);

          if (response && response._id) {
            this.status = 'success';
            this.publication = new Publication(
              '',
              '',
              '',
              '',
              this.identity._id
            );
            form.resetForm();
            this._router.navigate(['/timeline']);
          } else {
            this.status = 'error';
          }
        },
        (error) => {
          this.status = 'error';
        }
      );
  }

  @Output() sended = new EventEmitter();
  sendPublication(event: any) {
    console.log(event);
    this.sended.emit({ send: 'true' });
  }
}
