export class DeviceType {

  deviceTypeId: number;
  name: string;
  description: string;
//  createdDateTime: Date;
//  updatedDateTime: Date;
//  isActive: boolean;

  constructor(deviceTypeId: number, name: string, description: string) {
//    createdDateTime: Date, updatedDateTime: Date, isActive: boolean
    this.deviceTypeId = deviceTypeId;
    this.name = name;
    this.description = description;
//    this.createdDateTime = createdDateTime;
//    this.updatedDateTime = updatedDateTime;
//    this.isActive = isActive;
  }

}
