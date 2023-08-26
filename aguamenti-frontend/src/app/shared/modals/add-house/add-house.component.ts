import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.scss']
})
export class AddHouseComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<AddHouseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, house: any },
    private _snackBar: MatSnackBar
  ) { }

  houseName = new FormControl(this.data.house?.name ?? '',
    [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9 ]*$/)]
  );

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onConfirm(): void {
    if (this.houseName.invalid) {
      let message = '';
      if (this.houseName.errors?.required) {
        message = 'House name must not be empty';
      }
      else if (this.houseName.errors?.pattern) {
        message = 'House name must start with a capital alphabet';
      }
      this._snackBar.open(message);
      return;
    }
    const house = {
      name: this.houseName.value,
      house_id: this.data.house?._id
    };
    this.dialogRef.close({ house });

  }
}
