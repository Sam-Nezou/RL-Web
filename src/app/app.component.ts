import { Component } from '@angular/core';
import * as Constante from './class/Constante'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rocketLeague'; 
  constante = Constante;


  
}
