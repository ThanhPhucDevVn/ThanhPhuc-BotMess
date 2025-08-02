module.exports.config = {
  name: "luat",
  version: "1.0.0",
  hasPermssion: 0,
  credit: "ThanhPhuc",
  description: "Gửi nội quy nhóm",
  commandCategory: "ThanhPhuc",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;

  // 📝 Thay đổi nội quy theo ý bạn tại đây
  const rules = `
📜 Clan Born For Win Rule:

1. Không tự ái, không trẩu, không vô duyên.
2. Không quảng cáo, gửi link.
3. Tôn trọng người khác, hòa đồng.
4. Càng mõm nhiều càng tốt.
5. Không fake tên, tuổi.

Xem thêm tại:
https://clan.thanhphuc.dev
`;

  return api.sendMessage(rules, threadID, messageID);
};
