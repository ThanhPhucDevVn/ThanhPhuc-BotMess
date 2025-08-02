module.exports.config = {
  name: "donate",
  version: "1.0.0",
  hasPermssion: 0,
  credit: "ThanhPhuc",
  description: "Donate",
  commandCategory: "ThanhPhuc",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;

  // 📝 Thay đổi nội quy theo ý bạn tại đây
  const rules = `
Donate Cho Admin Bot:

1. MBBank: 780380
2. MBBank: 11111222229999
3. Momo: 0968884450

Thanks Kiu Sô Múch
`;

  return api.sendMessage(rules, threadID, messageID);
};
