import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  title: String;

  constructor() {
    this.title = 'Registrate';
  }
  ngOnInit(): void {
    console.log('Componente de registro cargado');
  }
}
