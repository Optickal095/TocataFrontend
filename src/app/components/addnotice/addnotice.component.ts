import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { Notice } from 'src/app/models/notice';
import { NoticeService } from 'src/app/services/notice.service';
import { DpaService } from 'src/app/services/dpa.service';
import { RegionData, Region } from 'src/app/models/region';
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
  public regionData: RegionData = { regiones: [] };
  public selectedRegionComunas: string[] = [];

  constructor(
    private _userService: UserService,
    private _noticeService: NoticeService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dpaService: DpaService
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
    this.regionData = { regiones: [] };
  }

  ngOnInit() {
    console.log('addnotice.component cargado correctamente');
    this.getRegionData();
  }

  onSubmitAddNotice() {
    console.log('Nuevo aviso:', this.notice);

    this._noticeService.saveNotice(this.token, this.notice).subscribe(
      (response) => {
        console.log('Aviso creado correctamente:', response);

        this._router.navigate(['/notices']);
      },
      (error) => {
        console.error('Error al crear el aviso:', error);
      }
    );
  }

  getRegionData() {
    this._dpaService.getRegionData().subscribe(
      (data: RegionData) => {
        this.regionData = data;
      },
      (error) => {
        console.log('Error al obtener los datos:', error);
      }
    );
  }

  onRegionChange() {
    const selectedRegion = this.regionData.regiones.find(
      (region) => region.region === this.notice.region
    );
    if (selectedRegion) {
      this.selectedRegionComunas = selectedRegion.comunas;
    } else {
      this.selectedRegionComunas = [];
    }
  }
}
