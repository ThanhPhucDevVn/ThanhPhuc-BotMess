const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "adminbot",
  version: "1.0.0",
  hasPermssion: 0,
  credit: "ThanhPhuc",
  description: "Hiển thị thông tin admin bot ",
  commandCategory: "Thông tin",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;

  const adminInfo = `
👤 𝐀𝐝𝐦𝐢𝐧 𝐁𝐨𝐭 👤

Name: Nguyễn Thanh Phúc
Birth: 11/11/2007
Local: Ho Chi Minh City, VN
Job: Developer
============
Website: https://ThanhPhuc.Dev
FaceBook: https://fb.com/NgThPhuc.profile
IG: _.th.phuc
TikTok: _th.phuc
Telegram: @ThanhPhucDev
============
  `;

  // Đường dẫn đến ảnh trong thư mục hiện tại
  const imagePath = path.join(__dirname, "ThanhPhuc.jpg");

  // Kiểm tra nếu ảnh tồn tại
  if (!fs.existsSync(imagePath)) {
    return api.sendMessage("❌ Không tìm thấy ảnh admin trong thư mục.", threadID, messageID);
  }

  // Gửi tin nhắn kèm ảnh
  return api.sendMessage(
    {
      body: adminInfo,
      attachment: fs.createReadStream(imagePath)
    },
    threadID,
    messageID
  );
};
