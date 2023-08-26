import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, cancelBtnName: string, confirmBtnName: string },
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.dialogRef.afterClosed().subscribe(data => {
      if (!data) this._snackBar.open("Action cancelled");
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  onConfirm(): void {
    this.dialogRef.close({ action: "confirmed", data: {} });
  }

}
