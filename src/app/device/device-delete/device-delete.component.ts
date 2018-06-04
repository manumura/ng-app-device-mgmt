import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../service/device.service';

@Component({
  selector: 'app-delete-device',
  templateUrl: './device-delete.component.html',
  styleUrls: ['./device-delete.component.css']
})
export class DeviceDeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeviceDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  remove() {
    this.deviceService.deleteById(this.data.id).subscribe(result => {},
      error => console.error(error));
  }
}
