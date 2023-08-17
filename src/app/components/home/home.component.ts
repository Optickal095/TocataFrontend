import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public title: string;
  public identity;

  constructor(private _userService: UserService) {
    this.title = 'Bienvenido a Tocata';
    this.identity = _userService.getIdentity();
  }

  ngOnInit(): void {
    console.log('home.component cargado!!');
  }
}
