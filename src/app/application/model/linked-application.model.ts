import {Channel} from '../../channel/model/channel.model';
import {DeviceType} from '../../device/model/device-type.model';

export class LinkedApplication {

  constructor(public appId?: number, public name?: string, public description?: string,  public apkName?: string,
    public channel?: Channel, public deviceType?: DeviceType) {
  }
}
