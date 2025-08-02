module.exports.config = {
  name: "tagphuc",
  version: "1.0.0",
  hasPermssion: 0,
  credit: "ThanhPhuc",
  description: "Phản hồi khi tag tên Nguyễn Thanh Phúc",
  commandCategory: "Hệ thống",
  usages: "",
  cooldowns: 5
};

module.exports.handleEvent = async ({ event, api, Users }) => {
  const { mentions, threadID, senderID } = event;

  if (!mentions || Object.keys(mentions).length === 0) return;

  // Duyệt qua tất cả những người bị tag
  for (const id of Object.keys(mentions)) {
    const name = await Users.getNameUser(id);

    // Kiểm tra nếu tên là Nguyễn Thanh Phúc
    if (name.toLowerCase() === "nguyễn thanh phúc") {
      const senderName = await Users.getNameUser(senderID);
      const replyText = [
        `tag mẹ m`,
        `câm tag cmm à`
        `cậc`
        `phiền`
      ];
      const randomReply = replyText[Math.floor(Math.random() * replyText.length)];

      return api.sendMessage(randomReply, threadID);
    }
  }
};

module.exports.run = () => {}; // Không cần xử lý gì khi gọi lệnh trực tiếp
