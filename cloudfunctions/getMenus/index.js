// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  // env: 'applet-dev-2gl6hkwd97669201',
});
const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  // console.log(event, context);
  const { OPENID } = cloud.getWXContext();
  const public = await db.collection('menus')
                          .where({type: 'public'})
                          .field({name: true, menu: true})
                          .get();
  const private = await db.collection('menus')
                          .where({type: 'private', userId: OPENID})
                          .field({name: true, menu: true})
                          .get();
  const vipUser = await db.collection('user')
                          .where({
                            vipCode: _.exists(true),
                            userId: OPENID
                          })
                          .field({vipCode: true})
                          .get();
  let vip = [];
  if (vipUser.data.length > 0) {
    const vipCode = vipUser.data[0].vipCode;
    vip = await db.collection('menus')
                  .where({type: 'vip', vipCode: _.in(vipCode)})
                  .field({name: true, menu: true})
                  .get();
  }
  const data = {
    public: public.data,
    private: private.data,
    vip: vip.data
  };
  // console.log(result);
  return {
    status: 'ok',
    msg: 'get menus: ok',
    data
  };
};
