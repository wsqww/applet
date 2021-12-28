// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const code = event.vipCode || [];
  if (code.length < 1) { return {status: 'error', msg: `vipCode: cannot be empty`}; }
  const { OPENID } = cloud.getWXContext();

  const allVip = await db.collection('menus')
                        .where({type: 'vip'})
                        .field({vipCode: true})
                        .get();
  const allVipCode = allVip.data.map(item => item.vipCode);
  
  // 无效 code
  const invalidCode = code.filter(item => !allVipCode.includes(item));
  // console.log(invalidCode);
  if (invalidCode.length > 0) {
    return {
      status: 'error',
      msg: `vipCode ['${invalidCode.join('\", \"')}']: does not exist`
    };
  }

  const vipUser = await db.collection('user')
                          .where({userId: OPENID})
                          .field({userId: true})
                          .get();
  if (vipUser.data.length > 0) {
    await db.collection('user')
            .where({userId: OPENID})
            .update({
              data: {vipCode: code}
            });
  } else {
    await db.collection('user')
            .add({
              data: {
                userId: OPENID,
                vipCode: code
              }
            });
  }

  return {
    status: 'ok',
    msg: `vipCode: update success`
  };
}