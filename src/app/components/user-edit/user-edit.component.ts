import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService, UploadService],
})
export class UserEditComponent implements OnInit {
  public title: string;
  public user: User;
  public identity;
  public token;
  public status: string = '';
  public filesToUpload: Array<File> = [];
  public url: string;
  public imageUrl: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _uploadService: UploadService
  ) {
    this.title = 'Actualizar mis datos';
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.imageUrl = GLOBAL.imageUrl;
  }

  ngOnInit(): void {
    console.log(this.user);

    console.log('user-edit.component se ha cargado!!');
  }

  onSubmit() {
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      (response) => {
        if (response.user == 'undefined') {
          this.status = 'error';
        } else {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;

          this._uploadService
            .makeFileRequest(
              this.url + 'upload-image-user/' + this.user._id,
              [],
              this.filesToUpload,
              this.token ?? '', // <-- Usar el operador de fusión nula para proporcionar una cadena vacía en caso de que this.token sea nulo
              'avatar'
            )
            .then((result: any) => {
              this.user.avatar = result.user.avatar;
              localStorage.setItem('identity', JSON.stringify(this.user));
            });
        }
      },
      (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }
}
