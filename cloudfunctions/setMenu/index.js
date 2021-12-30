// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const menus = event.menus || [];
  if (menus.length < 1) {
    return {
      status: 'error',
      msg: 'menus: cannot be empty'
    };
  }

  if (event.type === 'update') {
    return updateMenu(event, context);
  }
  // private 首次保存 需要新增数据
  if (event.type === 'add') {
    return addMenu(event, context);
  }
}

function updateMenu(event, context) {
  const id = event.id || '';
  if ( id === '') {
    return {
      status: 'error',
      msg: 'id: cannot be empty'
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

function addMenu(event, context) {
  const { OPENID } = cloud.getWXContext();

  await db.collection('menus')
          .add({
            data: {
              menu: event.menus,
              name: '蓄谋已久',
              type: 'private',
              userId: OPENID
            }
          });

  return {
    status: 'ok',
    msg: 'menus: add sucess'
  }
}
