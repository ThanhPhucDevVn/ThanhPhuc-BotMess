module.exports.config = {
    name: "anti",
    version: "4.1.6",
    hasPermssion: 0,
    credits: "BraSL",
    description: "Anti change Box chat vip pro & Khôi fix",
    commandCategory: "Tiện ích",
    usages: "anti dùng để bật tắt",
    cooldowns: 5,
    images: [],
    dependencies: {
        "fs-extra": "",
    },
}
    const { readFileSync, writeFileSync, existsSync } = require("fs-extra");
    const path = require('path');
    const fs = require('fs')
    module.exports.handleReply = async function ({ api, event, handleReply, Threads }) {
        const { senderID, threadID, messageID, args } = event;
        const { author, permssion } = handleReply;
        const pathData = global.anti;
        const dataAnti = JSON.parse(readFileSync(pathData, "utf8"));

        if (author !== senderID) return api.sendMessage(`❎ Bạn không phải người dùng lệnh`, threadID, async (err, info) => {            
            await new Promise(resolve => setTimeout(resolve, 30 * 1000));
            return api.unsendMessage(info.messageID);
        }, messageID);

        // Thu hồi menu sau khi người dùng reply
        api.unsendMessage(handleReply.messageID);
        
        let bựa = event.senderID != 100018277053087;
        var number = args.filter(i => !isNaN(i));

        for (const num of number) {
            switch (num) {
                case "1": {
                    if (permssion < 1 && bựa)
                        return api.sendMessage(
                            "⚠️ Bạn không đủ quyền hạn để sử dụng lệnh này",
                            threadID,
                            messageID
                        );
                    var NameBox = dataAnti.boxname;
                    const antiImage = NameBox.find(
                        (item) => item.threadID === threadID
                    );
                    if (antiImage) {
                        dataAnti.boxname = dataAnti.boxname.filter((item) => item.threadID !== threadID);
                        api.sendMessage(
                            "☑️ Tắt thành công chế độ anti đổi tên box ",
                            threadID,
                            messageID
                        );
                    } else {
                        var threadName = (await api.getThreadInfo(event.threadID)).threadName;
                        dataAnti.boxname.push({
                            threadID,
                            name: threadName
                        });
                        api.sendMessage(
                            "☑️ Bật thành công chế độ anti đổi tên box",
                            threadID,
                            messageID
                        );
                    }
                    writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
                    break;
                }
                case "2": {
                    if (permssion < 1 && bựa)
                        return api.sendMessage(
                            "⚠️ Bạn không đủ quyền hạn để sử dụng lệnh này",
                            threadID,
                            messageID
                        );
                    const antiImage = dataAnti.boximage.find(
                        a => a.threadID === threadID
                    );
                    if (antiImage) {
                        dataAnti.boximage = dataAnti.boximage.filter(a => a.threadID !== threadID);
                        api.sendMessage(
                            "☑️ Tắt thành công chế độ anti đổi ảnh box",
                            threadID,
                            messageID
                        );
                    } else {
                        var threadInfo = await api.getThreadInfo(event.threadID);
                        let d = await require('axios').get(threadInfo.imageSrc, { responseType: 'stream' });
                        d.data.pipe(require('fs').createWriteStream(`${__dirname}/data/anti-gaudev/${threadID}.png`));
                        await dataAnti.boximage.push({
                            threadID,
                            url: `${__dirname}/data/anti-gaudev/${threadID}.png`
                        });
                        api.sendMessage(
                            "Bật ✅ ",
                            threadID,
                            messageID
                        );
                    }
                    writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
                    break;
                }
                case "3": {
                    if (permssion < 1 && bựa)
                        return api.sendMessage(
                            "⚠️ Bạn không đủ quyền hạn để sử dụng lệnh này",
                            threadID,
                            messageID
                        );
                    const NickName = dataAnti.antiNickname.find(
                        (item) => item.threadID === threadID
                    );

                    if (NickName) {
                        dataAnti.antiNickname = dataAnti.antiNickname.filter((item) => item.threadID !== threadID);
                        api.sendMessage(
                            "☑️ Tắt thành công chế độ anti đổi biệt danh",
                            threadID,
                            messageID
                        );
                    } else {
                        const nickName = (await api.getThreadInfo(event.threadID)).nicknames;
                        dataAnti.antiNickname.push({
                            threadID,
                            data: nickName
                        });
                        api.sendMessage(
                            "☑️ Bật thành công chế độ anti đổi biệt danh",
                            threadID,
                            messageID
                        );
                    }
                    writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
                    break;
                }
                case "4": {
                    if (permssion < 1 && bựa)
                        return api.sendMessage(
                            "⚠️ Bạn không đủ quyền hạn để sử dụng lệnh này",
                            threadID,
                            messageID
                        );
                    const antiout = dataAnti.antiout;
                    if (antiout[threadID] == true) {
                        antiout[threadID] = false;
                        api.sendMessage(
                            "☑️ Tắt thành công chế độ anti out",
                            threadID,
                            messageID
                        );
                    } else {
                        antiout[threadID] = true;
                        api.sendMessage(
                            "☑️ Bật thành công chế độ anti out",
                            threadID,
                            messageID
                        );
                    }
                    writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
                    break;
                }
                case "5": {
                    const filepath = path.join(__dirname, 'data', 'antitheme.json');
                    let data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
                    let theme = "";
                    try {
                        const threadInfo = await Threads.getInfo(threadID);
                        theme = threadInfo.threadTheme.id;
                    } catch (error) {
                        console.error("Error fetching thread theme:", error);
                    }
                    if (!data.hasOwnProperty(threadID)) {
                        data[threadID] = {
                            themeid: theme || "",
                            themeEnabled: true
                        };
                        fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
                    } else {
                        data[threadID].themeEnabled = !data[threadID].themeEnabled;
                        if (data[threadID].themeEnabled) {
                            data[threadID].themeid = theme || "";
                        }
                        fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
                    }
                    const statusMessage = data[threadID].themeEnabled ? "Bật" : "Tắt";
                    api.sendMessage(`☑️ ${statusMessage} thành công chế độ anti theme`, threadID, messageID);
                    break;
                }
                case "6": {
                    const dataAntiPath = __dirname + '/data/antiqtv.json';
                    const info = await api.getThreadInfo(event.threadID);
                    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID()))
                        return api.sendMessage('❎ Bot cần quyền quản trị viên để có thể thực thi lệnh', event.threadID, event.messageID);
                    let data = JSON.parse(fs.readFileSync(dataAntiPath));
                    if (!data[threadID]) {
                        data[threadID] = true;
                        api.sendMessage(`☑️ Bật thành công chế độ anti qtv`, threadID, messageID);
                    } else {
                        data[threadID] = false;
                        api.sendMessage(`☑️ Tắt thành công chế độ anti qtv`, threadID, messageID);
                    }
                    fs.writeFileSync(dataAntiPath, JSON.stringify(data, null, 4));
                    break;
                };
                case "7": {
                    if (permssion < 1 && bựa)
                        return api.sendMessage("⚠️ Bạn không đủ quyền hạn để sử dụng lệnh này", threadID, messageID);
                    if (!dataAnti.antiTagall) dataAnti.antiTagall = {};
                    dataAnti.antiTagall[threadID] = !dataAnti.antiTagall[threadID];
                    writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
                    api.sendMessage(
                        `Đã ${dataAnti.antiTagall[threadID] ? 'bật' : 'tắt'} chế độ anti tagall ✅`,
                        threadID,
                        messageID
                    );
                    break;
                }
                case "8": {
                    const themePath = path.join(__dirname, 'data', 'antitheme.json');
                    const qtvPath = path.join(__dirname, 'data', 'antiqtv.json');
                    let antitheme = {}, antiqtv = {};

                    if (fs.existsSync(themePath)) antitheme = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                    if (fs.existsSync(qtvPath)) antiqtv = JSON.parse(fs.readFileSync(qtvPath, 'utf8'));


                    // Hàm helper emoji
                    const getStatus = (condition) => condition ? "✅ Bật" : "❌ Tắt";

                    // Kiểm tra trạng thái từng tính năng
                    const antiBoxname = getStatus(dataAnti.boxname.some(item => item.threadID === threadID));
                    const antiBoximage = getStatus(dataAnti.boximage.some(item => item.threadID === threadID));
                    const antiNickname = getStatus(dataAnti.antiNickname.some(item => item.threadID === threadID));
                    const antiOut = getStatus(!!dataAnti.antiout[threadID]);
                    const themeStatus = getStatus(antitheme[threadID]?.themeEnabled);
                    const qtvStatus = getStatus(!!antiqtv[threadID]);


                    const message = `[ CHECK ANTI BOX ]
──────────
|› 1. anti namebox: ${antiBoxname}
|› 2. anti imagebox: ${antiBoximage}
|› 3. anti nickname: ${antiNickname}
|› 4. anti out: ${antiOut}
|› 5. anti theme: ${themeStatus}
|› 6. anti qtv: ${qtvStatus}
──────────`;

                    api.sendMessage(message, threadID, async (err, info) => {
                        await new Promise(resolve => setTimeout(resolve, 30 * 1000));
                        return api.unsendMessage(info.messageID);
                    }, messageID);
                    break;
                }
                default: {
                    return api.sendMessage(`❎ Số bạn chọn không có trong lệnh`, threadID);
                }
            }
        }
    };


module.exports.run = async ({ api, event, permssion }) => {
    const { threadID, messageID, senderID } = event;
    return api.sendMessage(
`╭─────────────⭓
│ 🛡️ Anti Change Info Group
├─────────────⭔
│ 1️⃣ anti namebox
│ 2️⃣ anti boximage
│ 3️⃣ anti nickname
│ 4️⃣ anti out
│ 5️⃣ anti theme
│ 6️⃣ anti qtv
│ 7️⃣ anti tagall
│ 8️⃣ check trạng thái anti của nhóm
│    → Xem các chế độ nào đang bật/tắt
├─────────────⭔
│ 📌 Vui lòng phản hồi (reply) theo số thứ tự
│    để chọn chế độ bạn muốn bật hoặc tắt.
╰─────────────⭓`,
        threadID, async (error, info) => {
            if (error) {
                return api.sendMessage("❎ Đã xảy ra lỗi!", threadID);
            } else {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: senderID,
                    permssion
                });
            }
        }, messageID);
};