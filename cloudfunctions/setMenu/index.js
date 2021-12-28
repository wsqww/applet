// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const menus = event.menus || ['a', 'b', 'c'];
  const id = event.id || 'd20aea5861c170dd014a51260a1cd320';
  let paramsErr = '';
  if (menus.length < 1) { paramsErr = 'menus: cannot be empty'; } 
  if ( id === '') { paramsErr = 'id: cannot be empty'; }
  if (paramsErr !== '') {
    return {
      status: 'error',
      msg: paramsErr
    };
  }

  await db.collection('menus')
          .where({_id: id})
          .update({
            data: {menu: menus}
          });

  return {
    status: 'ok',
    msg: 'menus: update sucess'
  }
}