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
  }

  ngOnInit() {
    console.log('sidebar.component cargado correctamente');
  }

  onSubmit(form: NgForm) {
    this.publicationService
      .addPublication(this.token, this.publication)
      .subscribe(
        (response) => {
          // Maneja la respuesta de la creación de la publicación
          console.log(response);

          if (response && response._id) {
            // Publicación creada exitosamente
            this.status = 'success';

            // Reinicia el formulario y la variable de publicación
            this.publication = new Publication(
              '',
              '',
              '',
              '',
              this.identity._id
            );
            form.resetForm();

            // Navega al timeline u otra ruta deseada después de agregar la publicación
            this._router.navigate(['/timeline']);

            // Subir la imagen después de agregar la publicación, si hay archivos seleccionados
            if (this.filesToUpload.length > 0) {
              this._uploadService
                .uploadFile(
                  `${this.url}/publication/`,
                  this.filesToUpload,
                  this.token,
                  'file'
                )
                .then(
                  (result: any) => {
                    // Maneja el resultado de la subida de la imagen si es necesario
                    console.log(result);
                  },
                  (error: any) => {
                    // Maneja errores en la subida de la imagen si es necesario
                    console.error(error);
                  }
                );
            }
          } else {
            // Error al crear la publicación
            this.status = 'error';
          }
        },
        (error) => {
          // Maneja errores al agregar la publicación
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
