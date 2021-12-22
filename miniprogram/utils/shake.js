/**
 * 摇一摇
 */


export default class Shake {

  constructor() {}

  shakeInfo = {
    openFlag: false,  // 是否开启摇一摇，如果是小程序全局监听摇一摇，这里默认为true
    shakeSpeed: 5,  //设置阈值,越小越灵敏
    shakeStep: 1000,  //摇一摇成功后间隔 ms
    lastTime: 0,  //此变量用来记录上次摇动的时间
    x: 0,
    y: 0,
    z: 0,
    lastX: 0,
    lastY: 0,
    lastZ: 0, //分别记录对应 x、y、z 三轴的数值和上次的数值
  };

  onShake = () => {};

  /**
   * @param {*} config
   * @param config.onSake 摇一摇成功回调
   */
  openShakeEvent(config = {}) {
    this.shakeInfo.openFlag = true;
    // 配置
    if (config.hasOwnProperty('onShake')) {
      this.onShake = config.onShake;
    }

    wx.startAccelerometer({
      success: () => {
        // console.log('shake start success');
        this.onAccelerometerChange();
      },
      fail: () => {
        console.log('shake start fail');
      }
    });

  }

  onAccelerometerChange() {
    // console.log('change ?');
    wx.onAccelerometerChange(res => {
      if (!this.shakeInfo.openFlag) { return false; }
      const nowTime = new Date().getTime();
      // 两次摇动 时间间隔
      if (nowTime - this.shakeInfo.lastTime < this.shakeInfo.shakeStep ) { return false; }
      const diffTime = nowTime - this.shakeInfo.lastTime;
      this.shakeInfo.lastTime = nowTime;
      this.shakeInfo.x = res.x;
      this.shakeInfo.y = res.y;
      this.shakeInfo.z = res.z;
      // 计算摇一摇的速度
      const speed = Math.abs(
        (this.shakeInfo.x + this.shakeInfo.y + this.shakeInfo.z) -
        (this.shakeInfo.lastX + this.shakeInfo.lastY + this.shakeInfo.lastZ)
      ) / diffTime * 10000;
      // console.log(speed);
      // 摇一摇幅度足够大，成功
      if (speed > this.shakeInfo.shakeSpeed) {
        // console.log('shake success');
        this.onShake();
      }
      this.shakeInfo.lastX = res.x;
      this.shakeInfo.lastY = res.y;
      this.shakeInfo.lastZ = res.z;
    });
  }

  closeShakeEvent() {
    this.shakeInfo.openFlag = false;
    wx.stopAccelerometer();
  }

}
