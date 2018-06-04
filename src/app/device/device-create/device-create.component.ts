import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { DeviceService } from '../service/device.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css']
})
export class DeviceCreateComponent implements OnInit {
  device: any = {};
  sub: Subscription;
  statuses: any = {};

  constructor(
    public dialogRef: MatDialogRef<DeviceCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deviceService: DeviceService) { }

  ngOnInit() {
    this.statuses = this.data.statuses;
    console.log('Statuses: ', this.statuses);
    const id = this.data.id;
    if (id) {
      this.deviceService.findById(id).subscribe((device: any) => {
        console.log(device);
        if (device) {
          this.device = device;
        } else {
          console.log(`Device with id '${id}' not found, returning to list`);
          this.dialogRef.close();
        }
      });
    }
  }

  save(form: NgForm): void {
    this.deviceService.saveNgForm(form).subscribe(
      result => {
        console.log('Data saved.');
        // return true;
      },
      error => {
        console.error(error);
        // return false;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
