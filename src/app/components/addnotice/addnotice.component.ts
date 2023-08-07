import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { Notice } from 'src/app/models/notice';
import { NoticeService } from 'src/app/services/notice.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'addnotice',
  templateUrl: './addnotice.component.html',
  styleUrls: ['./addnotice.component.css'],
  providers: [UserService, NoticeService],
})
export class addNoticeComponent implements OnInit {
  public identity: any;
  public token: string;
  public url: string;
  public status: string;
  public notice: Notice;

  constructor(
    private _userService: UserService,
    private _noticeService: NoticeService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken() || '';
    this.url = GLOBAL.url;
    this.status = '';
    this.notice = new Notice(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      this.identity._id || '',
      ' ',
      ''
    );
  }

  ngOnInit() {
    console.log('addnotice.component cargado correctamente');
  }

  onSubmitAddNotice() {
    console.log('Nuevo aviso:', this.notice);

    // Llamamos al servicio para guardar el nuevo aviso
    this._noticeService.saveNotice(this.token, this.notice).subscribe(
      (response) => {
        console.log('Aviso creado correctamente:', response);
        // Aquí puedes redireccionar a otra página o realizar alguna acción después de crear el aviso
        // Por ejemplo, volver a la lista de avisos
        this._router.navigate(['/notices']);
      },
      (error) => {
        console.error('Error al crear el aviso:', error);
      }
    );
  }
}