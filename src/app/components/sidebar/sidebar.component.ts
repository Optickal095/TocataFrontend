import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from 'src/app/services/publication.service';
import { UploadService } from 'src/app/services/upload.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService, PublicationService, UploadService],
})
export class SidebarComponent implements OnInit {
  public identity: any;
  public token: string;
  public stats: any;
  public url: string;
  public imageUrl: string;
  public status: string;
  public publication: Publication;
  public filesToUpload: Array<File>;
  public file: File;

  constructor(
    private userService: UserService,
    private publicationService: PublicationService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken() || '';
    this.stats = this.userService.getStats();
    this.url = GLOBAL.url;
    this.imageUrl = GLOBAL.imageUrl;
    this.status = '';
    this.publication = new Publication(
      '',
      '',
      '',
      '',
      this.identity?._id || ''
    );

    this.filesToUpload = [];
    this.file = new File([], '');
  }

  ngOnInit() {
    console.log('sidebar.component cargado correctamente');
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      console.log('El formulario no es válido. Verifica los campos.');
      return;
    }
    this.publicationService
      .addPublication(this.token, this.publication, this.file)
      .subscribe(
        (response) => {
          console.log(response);

          if (response && response._id) {
            this.publication = new Publication(
              '',
              '',
              '',
              '',
              this.identity._id
            );

            this._uploadService
              .makeFileRequest(
                this.url + 'upload-image-pub/' + response._id,
                [], // Si tienes algún dato adicional para enviar en la solicitud, puedes agregarlo aquí
                this.filesToUpload,
                this.token,
                'file'
              )
              .then((result: any) => {
                // Aquí puedes procesar la respuesta de subida de imagen si lo necesitas
                // this.publication.file = result.image;
                this.status = 'success';
                form.reset();
                this._router.navigate(['/timeline']);
              });
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

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
