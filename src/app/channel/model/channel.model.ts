export class Channel {

  distChannelId: number;
  name: string;
  description: string;
//  createdDateTime: Date;
//  updatedDateTime: Date;
//  isActive: boolean;

  constructor(distChannelId: number, name: string, description: string) {
//    createdDateTime: Date, updatedDateTime: Date, isActive: boolean
    this.distChannelId = distChannelId;
    this.name = name;
    this.description = description;
//    this.createdDateTime = createdDateTime;
//    this.updatedDateTime = updatedDateTime;
//    this.isActive = isActive;
  }

}
