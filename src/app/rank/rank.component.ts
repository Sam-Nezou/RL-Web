import { Component, OnInit, Input, NgModule, EventEmitter, Output } from '@angular/core';
import { Rank, selectRank } from '../class/Rank';
import { RankService } from './rank.service';
import * as Constante from '../class/Constante'
import { Observable, interval, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RankResumeComponent } from './rank-resume/rank-resume.component';


@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  error = '';
  data: Rank;
  result: Rank[][];
  selectedRank: number;
  @Output()
  itemAdded = new EventEmitter<Rank>();

  @Input() userId: number;
  /**
   * Graphique
   */
  public configGraph: any[];

  /**
   * Contient les données a afficher dans le graph
   */
  public layout: object;
  public config: object;

  subscription: Subscription;

  selectRank: selectRank[] = [
    { name: "UNRANKED", value: Constante.UN_RANKED },
    { name: "1V1", value: Constante.RANKED_1V1 },
    { name: "2V2", value: Constante.RANKED_2V2 },
    { name: "3V3", value: Constante.RANKED_3V3 },
    { name: "TOURNOIS", value: Constante.TOURNAMENT },
    { name: "SNOWDAY", value: Constante.SNOWDAY },
    { name: "RUMBLE", value: Constante.RUMBLE },
    { name: "HOOPS", value: Constante.HOOPS },
  ];

  tableColumn: string[] = ['tier', 'division', 'rating']


  constructor(private RankService: RankService) {
    this.selectedRank = 0;
  }



  ngOnInit(): void {

    this.initGraph();
    this.subscription = timer(0, 25000).pipe(
      switchMap(() => this.RankService.getRank(this.userId))).subscribe(
        (res) => {
          this.result = res;
        },
        (err) => {
          this.error = err;
        }
      )
    this.setGraph(this.result[0]);
  }

  /**
   * 
   */
  initGraph(): void {
    this.configGraph = [];
    this.configGraph.push({
      type: 'scatter',
      mode: 'lines+points',
      // fill: 'tozero',
      x: ['Date'],
      y: ['rating']
    });
    this.layout = {
      title: 'Stat',
      autosize: true
    };
    this.config = {
      responsive: false
    };
  }

  /**
   * Set le graph
   * 
   * @param ranks 
   */
  setGraph(ranks: Rank[]): void {

    console.log(ranks);
    // Order rating by date
    ranks.sort((a, b) => a.collectDate < b.collectDate ? -1 : 1);
    let xTemp: object[] = [];
    let yTemp: number[] = [];
    ranks.forEach(element => {
      this.layout = {
        title: element.tier + ' ' + element.division,
      };
      this.data = element;
      xTemp.push(new Date(element.collectDate));
      yTemp.push(element.rating);
    });
    this.configGraph[0].x = xTemp;
    this.configGraph[0].y = yTemp;
  }



}
