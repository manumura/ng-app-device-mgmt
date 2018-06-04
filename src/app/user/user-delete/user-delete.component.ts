import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user.model';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css'],
})
export class UserDeleteComponent {

  private user: User = this.data.user;

  constructor(public dialogRef: MatDialogRef<UserDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    if (this.user) {
      this.userService.deleteById(this.user.id).subscribe(
        res => res,
        err => {
          console.log(err);
        }
      );
    }
  }
}
