// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();
const db = cloud.database();
// const MAX_LIMIT = 100;

// 云函数入口函数
exports.main = async (event, context) => {
  const menu = await db.collection('menus').get();
  console.log(menu);
  return { menu };
};
