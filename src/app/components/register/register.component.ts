import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  title: String;
  user: User;

  constructor(private _route: ActivatedRoute, private _router: Router) {
    this.title = 'Registrate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', true, '');
  }

  onSubmit(form: NgForm) {
    console.log(this.user);
  }

  ngOnInit(): void {
    console.log('Componente de registro cargado');
  }
}
