import {Channel} from '../../channel/model/channel.model';
import {DeviceType} from '../../device/model/device-type.model';
import {LinkedApplication} from './linked-application.model';

export class Application {

//  createdDateTime: Date;
//  updatedDateTime: Date;
//  isActive: boolean;

  constructor(public appId?: number, public name?: string, public description?: string, public apkData?: Blob, public apkName?: string,
    public channel?: Channel, public deviceType?: DeviceType, public dependencyList?: Array<LinkedApplication>) {
//    createdDateTime: Date, updatedDateTime: Date, isActive: boolean
  }

}
