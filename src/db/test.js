const mongoose = require('mongoose');

const uri = "mongodb+srv://DawNLighX:Xli328516HBND@dawnlighxdb.yooydno.mongodb.net/?appName=DawNLighXDB";

async function connectTest() {
  console.log('正在尝试连接...');
  try {
    // 直接连接，不指定数据库
    await mongoose.connect(uri);
    console.log('✅ 连接成功！正在验证...');
    // 发送一个ping命令验证连接有效
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('✅ Ping验证成功！Atlas连接一切正常。');
    console.log('🔍 连接问题很可能出在：“数据库名拼接方式”或“项目环境变量”上。');
    process.exit(0); // 成功退出
  } catch (error) {
    console.error('❌ 连接失败！');
    console.error('错误名称:', error.name);
    console.error('错误信息:', error.message);
    
    // 【根据错误锁定问题根源】
    if (error.message.includes('Authentication failed')) {
      console.log('\n💡 诊断结果：密码错误。');
      console.log('👉 请去Atlas控制台 “Security” -> “Database Access” 页面，检查“DawNLighX”用户的密码，并确保替换了代码中的“你的密码”。');
    } else if (error.message.includes('getaddrinfo') || error.message.includes('ENOTFOUND')) {
      console.log('\n💡 诊断结果：网络或域名解析问题。');
      console.log('👉 请检查你的网络，并确认连接字符串中的主机名 “dawnlighxdb.yooydno.mongodb.net” 没有拼写错误。');
    } else {
      // 其他未知错误，需要看完整堆栈
      console.error('\n📄 完整错误堆栈:');
      console.error(error);
    }
    process.exit(1); // 失败退出
  }
}

connectTest();