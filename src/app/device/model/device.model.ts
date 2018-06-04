// export interface Device {
export class Device {
  deviceInfo: {
    model: string;
    manufacturer: string;
    brand: string;
    androidVersion: string;
    apiLevel: string;
    buildNumber: string;
    androidDeviceId: string;
    hardwareSerialNo: string;
    instructionSets: string;
    cpuHardware: string;
    displayResolution: string;
    displayDensity: string;
    displayPhysicalSize: string;
  };

  constructor(public id: number, public imei: string, public status: string, public requestBy: string, public timestamp: Date,
    public statusText: string) {
  }

}
