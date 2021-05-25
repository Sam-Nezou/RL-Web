

export class Rank{
    rating : number;
    tier : string;
    division : string;
    tierId : number;
    divisionId : number;
    collectDate : string;
  
  
    constructor(rating: number, 
                tier : string,
                division: string,
                tierId : number,
                divisionId : number,
                collectDate : string
                )
    {
     this.rating = rating;
     this.tier = tier;
     this.division = division;
     this.tierId = tierId;
     this.divisionId = divisionId;
     this.collectDate = collectDate;
  
    }
  
  }



  export class selectRank{
    name: string;
    value: number;
  }