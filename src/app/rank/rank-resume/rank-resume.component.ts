import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Rank } from 'src/app/class/Rank';

@Component({
  selector: 'app-rank-resume',
  templateUrl: './rank-resume.component.html',
  styleUrls: ['./rank-resume.component.css']
})
export class RankResumeComponent implements OnChanges {



  @Input()
  rank: Rank[];


  public lastRank: Rank;
  subscription: Subscription;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.lastRank = null;

    if (this.rank !== undefined) {
      this.lastRank = this.rank[this.rank.length - 1];
    }
  }


  /**
   * Set le last rank
   * @param rank 
   */
  public setLastRank(rank: Rank): void {
    this.lastRank = rank
  }
}
