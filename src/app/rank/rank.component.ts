import { Component, OnInit, Input, NgModule} from '@angular/core';
import { Rank, selectRank } from '../class/Rank';
import { RankService } from './rank.service';
import * as Constante from '../class/Constante'
import { Observable,interval,Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  error ='';
  data: Rank[];
  result: Rank[][];
  selectedRank : number;


 @Input() userId: number;
/**
 * Graphique
 */
  public allData: any[];
  public layout: object;
  public config: object;

  subscription : Subscription;

  selectRank: selectRank[] = [
    { name : "UNRANKED" , value : Constante.UN_RANKED },
    { name : "1V1", value : Constante.RANKED_1V1 },
    { name : "2V2", value : Constante.RANKED_2V2 },
    { name : "3V3", value : Constante.RANKED_3V3 },
    { name : "TOURNOIS", value : Constante.TOURNAMENT },
    { name : "SNOWDAY", value : Constante.SNOWDAY },
    { name : "RUMBLE", value : Constante.RUMBLE },
    { name : "HOOPS", value : Constante.HOOPS },
  ];

  tableColumn: string[] = ['tier','division','rating']

  
  constructor(private RankService : RankService) { 
    this.data = [];
    this.selectedRank = 0;
  }


  
  ngOnInit(): void 
  {
    this.initGraph();
    this.subscription = timer(0,25000).pipe(
      switchMap(() => this.RankService.getRank(this.userId))).subscribe(
      (res ) => {
        this.result = res;

      },
      (err) => {
        this.error = err;
      }
    )

    this.setGraph(this.result[0]);
      
  }


  initGraph(){
    this.allData = [];
    this.allData.push({
        type: 'scatter',
        mode: 'lines+points',
        x: [],
        y: []
    });        
    this.layout = {
        title: 'Stat',
        autosize: true
    };
    this.config = {
        responsive: false
    }; 
  }


  setGraph(ranks: Rank[]) : void{

    let xTemp: object[] = [];
    let yTemp: number[] = [];
    ranks.forEach(element => {
      this.layout ={
        title: element.tier + ' ' + element.division ,
      };
      xTemp.push(new Date(element.collectDate));
      yTemp.push(element.rating);
    });
    this.allData[0].x =xTemp;
    this.allData[0].y =yTemp;
  }



}
