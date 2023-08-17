import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { Notice } from 'src/app/models/notice';
import { NoticeService } from 'src/app/services/notice.service';
import { DpaService } from 'src/app/services/dpa.service';
import { RegionData, Region } from 'src/app/models/region';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'addnotice',
  templateUrl: './addnotice.component.html',
  styleUrls: ['./addnotice.component.css'],
  providers: [UserService, NoticeService, DatePipe],
})
export class addNoticeComponent implements OnInit {
  public identity: any;
  public token: string;
  public url: string;
  public status: string;
  public notice: Notice;
  public regionData: RegionData = { regiones: [] };
  public selectedRegionComunas: string[] = [];
  public formattedDate: string = '';

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
    this.formattedDate = '';
  }

  ngOnInit() {
    console.log('addnotice.component cargado correctamente');
    this.getRegionData();
  }

  onSubmitAddNotice() {
    const isoDate = this.formattedDate
      ? moment(this.formattedDate, 'YYYY-MM-DDTHH:mm').toISOString()
      : null;

    const noticeData = {
      title: this.notice.title,
      text: this.notice.text,
      datetime: isoDate,
      region: this.notice.region,
      city: this.notice.city,
      phone: this.notice.phone,
      email: this.notice.email,
    };

    this._noticeService.saveNotice(this.token, noticeData).subscribe(
      (response) => {
        console.log('Aviso creado correctamente:', response);
        this._router.navigate(['/avisos', 1]);
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

  onDateChange(event: Event) {
    const dateValue = (event.target as HTMLInputElement).value;
    const unixDate = moment(dateValue, 'YYYY-MM-DDTHH:mm').unix();
    this.notice.date = unixDate.toString();
  }
}
