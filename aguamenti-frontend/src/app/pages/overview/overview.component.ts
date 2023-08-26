import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ActionModalComponent } from 'src/app/shared/modals/action-modal/action-modal.component';
import { AddHouseComponent } from 'src/app/shared/modals/add-house/add-house.component';
import { changeRoute } from 'src/app/store/route-data.actions';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  house$: Observable<any>;
  user: string = "";
  reloadSubj = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private api: ApiService,
    private store: Store<any>,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) {

    this.house$ = this.reloadSubj.pipe(
      switchMap(_ => {
        return this.api.getAllHouses().pipe(
          tap(data => {
            // extracting the username in a clever way
            this.user = data.message.substring(data.message.indexOf(":") + 2)
          }),
          map(data => data.result),
        )
      }
      )
    );

  }

  ngOnInit(): void {
    this.reloadSubj.next(true);
  }

  onHouseCardEvent(event: { action: "open" | "delete" | "edit", house: any }) {
    switch (event.action) {
      case "open":
        {
          this.store.dispatch(changeRoute({ house: event.house }));
          this.router.navigate(['/dashboard']);
          break;
        }
      case "edit":
        {
          console.log("opening edit modal");
          const dialogRef = this.dialog.open(AddHouseComponent, {
            data: { title: "Edit House", house: event.house }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (!result)
              this._snackbar.open("Action cancelled");
            else {
              console.log('The dialog was closed', result);
              this.api.updateHouse({...result.house}).subscribe(data => {
                this._snackbar.open(data.message);
                this.reloadSubj.next(true);
              });
            }
          });
          break;
        }
      case "delete":
        {
          const dialogRef = this.dialog.open(ActionModalComponent, {
            data: { title: "Delete House" }
          });

          dialogRef.afterClosed().pipe(
            switchMap(result => {
              if (result?.action === 'confirmed') {
                return this.api.deleteHouse({ house_id: event.house._id })
              }
              return new Observable<{ code: 500 | number, message: 'internal error' | string }>();
            })
          ).subscribe((result) => {
            if (result) {
              this._snackbar.open(result?.message);
              this.reloadSubj.next(true);
            }
          }
          );
          break;
        }
    }
  }

  openAddModal() {
    const dialogRef = this.dialog.open(AddHouseComponent, {
      data: { title: "Add New House" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result)
        this._snackbar.open("Action cancelled");
      else {
        console.log(result);

        this.api.createHouse({ name: result?.house?.name }).subscribe(data => {
          this._snackbar.open(data.message);
          this.reloadSubj.next(true);
        });
      }
    });
  }

}
