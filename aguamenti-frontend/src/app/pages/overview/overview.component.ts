import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { changeRoute } from 'src/app/store/route-data.actions';
import { MatDialog } from '@angular/material/dialog';
import { GenericModalComponent } from 'src/app/shared/modals/generic-modal/generic-modal.component';
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
    private api: ApiService,
    private store: Store<any>,
    public dialog: MatDialog
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
    this.store.dispatch(changeRoute({ house }));
    this.router.navigate(['/dashboard']);
  }

  openAddModal(){
    const dialogRef = this.dialog.open(GenericModalComponent, {
      data: {name: "this.name", animal: "this.animal"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
