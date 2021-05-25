import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { Rank } from '../class/Rank';


@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit { 

  error ='';
  data: Rank[][];

  constructor(private APIservice : APIService) { 
    this.data = [];
  }

  ngOnInit(): void 
  {
    this.APIservice.getRank().subscribe(
      (res ) => {
        this.data = res;
      },
      (err) => {
        this.error = err;
      }
    )
  }
}
