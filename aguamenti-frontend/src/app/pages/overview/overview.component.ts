import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  house$: Observable<any>;
  user: string = "";

  constructor(
    private router: Router,
    private api: ApiService
  ) {
    this.house$ = this.api.getAllHouses().pipe(
      tap(data => {
        this.user = data.message.substring(data.message.indexOf(":") + 2)
      }),
      map(data => data.result),
    );
  }

  ngOnInit(): void {

  }

  onClickHandler(house: any) {
    console.log(house);
    
    this.router.navigate(['/']);
  }

}
