// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  // env: cloud.DYNAMIC_CURRENT_ENV,
  env: 'applet-dev-2gl6hkwd97669201',
});
const db = cloud.database();
// const MAX_LIMIT = 100;

// 云函数入口函数
exports.main = async (event, context) => {
  const menus = await db.collection('menus').get();
  console.log(menu);
  return { data: menus.data };
};
