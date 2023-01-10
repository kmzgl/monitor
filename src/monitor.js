
import DeviceInfo from "./device";

class Monitor {
  constructor() {
    //默认配置
    this.getDevice = true;//是否获取浏览器设备信息
  }

  /**
   * 处理异常信息初始化
   * @param {*} options 
   */
  init(options) {
    options = options || {};
    this.getDevice = !(options.getDevice.switch === false);
    if (this.getDevice) {
      var deviceData= DeviceInfo.getDeviceInfo({domain:options.getDevice.domain?options.getDevice.domain:'',info:options.getDevice.info?options.getDevice.info:[]});
      console.log(deviceData);
    }
  }
}

export default Monitor;