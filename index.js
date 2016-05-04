var login = require("facebook-chat-api");
var request = require('request');
var answeredThreads = {};
 
// Create simple echo bot
login({email: "sunnyboy1019@gmail.com", password: "lialone"}, function callback (err, api) {
    if(err) return console.error(err);
 	// console.log('api: ',api)
    api.listen(function callback(err, message) {
        var ID = message.threadID;
        var strmessage = message.body;
        if(strmessage == null){
            strmessage = 'hinh anh';
        }
        console.log(strmessage);
        if(strmessage == '/whoami'){
            api.getUserInfo(message.threadID,function(err, data) {
              if(err) return console.error(err);
              api.sendMessage("BOT \n- Bạn tên là "+data[ID].name+" \n- ID "+message.threadID, message.threadID);
          });
        }else if(strmessage.indexOf('/m') == 0 ){
            api.getUserInfo(message.threadID,function(err, data) {
              if(err) return console.error(err);
              api.sendMessage("BOT - Cảm ơn bạn "+data[ID].name+" đã để lại lời nhắn.", message.threadID);
          });
        }else if(strmessage.indexOf('/searchmv ') == 0){
            var tenMV = (strmessage.substring(9,strmessage.length)).trim();
            var options = {method: 'GET',
                url: 'http://music.nhutuit.com/mv/',
                qs:
                {
                    tenmv: tenMV,
                } 
            };
            request(options,function(error,response,body){
                var data = JSON.parse(body);
                api.sendMessage("BOT \n- Tên MV :"+data[0].TenMV+"\n- Ca Si :"+data[0].CaSi+"\n- Link MV :\n"+data[0].LinkMV, message.threadID);
            });
        }else{
            api.sendMessage("BOT - Chào mừng bạn đến với hệ thông Bot-Chat của tớ.\nBấm lệnh: \n+ /whoami để biết thông tin về bạn.\n+ /searchmv để tìm mv bài hát bạn cần tìm.\n+ '/m Nội dung lời nhắn' để bạn có thể để lại lời nhắn cho mình.", message.threadID);
        }
    });
    // api.listen(function callback(err, message) {
    //     if(!answeredThreads.hasOwnProperty(message.threadID)){
    //         console.log('test',!answeredThreads.hasOwnProperty(message.threadID));
    //         answeredThreads[message.threadID] = true;
    //         api.sendMessage("BOT - Hiện tại mình đang đi ra ngoài, mình sẽ trả lời bạn ngay khi tới nhà,", message.threadID,function(){
    //             console.log(answeredThreads[message.threadID]);
    //         });
    //     }
    // });
    // api.getUserInfo(100005371179208,function(err, ret) {
    //   if(err) return console.error(err);
    //   console.log(ret);
    //   for(var prop in ret) {
    //     if(ret.hasOwnProperty(prop) && ret[prop].isBirthday) {
    //       api.sendMessage("Happy birthday :)", prop);
    //     }
    //   }
    // });
    // api.getCurrentUserID(function callback(err,arr){
    // 	console.log(err);
    // });
    // api.getCurrentUserID(100002971227164,function callback(err,data){
    // 	console.log(data);
    // });
 	// api.getFriendsList(function(err, data) {
	//     if(err) return console.error(err);
	//     for(var i=0 ; i < data.length;i++){
	//     	console.log(data[i].fullName);
	//     }
	// });
});