
var firebase = require('firebase').initializeApp({
    serviceAccount:"./onandoff.json",
    databaseURL:"https://animaljoker-2c7cd.firebaseio.com"
})

//앱에서 아이디 , 아이피를 주면. 
//아두이노에서 아이피를 전달하면, 서버에서 앱 아이디를 리턴해줌. 
//그럼 아두이노에서 callback에서 /LED/전달받은 아이디 이런식으로 구조를 만듬. 
var request = 	require('request');

var url = require('url');
const mqtt = require('mqtt');
// var client  = mqtt.connect('mqtt://m11.cloudmqtt.com:13145')  
// const client = mqtt.connect("m11.cloudmqtt.com");
const publicIp = require('public-ip');

var ref = firebase.database().ref().child('clients');

var logsRef = ref.child('logs');
console.log("haha");

var express=require('express');
var app=express();
var router = express.Router();
var port = process.env.PORT || 13145

var pIp="";

var mqtt_url = process.env.CLOUDMQTT_URL || 'mqtt://m11.cloudmqtt.com:13145';
var options = {
    port: 13145,
    host: 'mqtt://m11.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'oiuvxpyr',
    password: 'E0PoewCUZ1Dx',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
  };
  var led ="";
  var client = mqtt.connect('mqtt://m11.cloudmqtt.com', options);
  client.on('connect', function() { // When connected
    console.log('connected');
   
    // subscribe to a topic
    client.subscribe('/ESP8266/Test', function() {  
        // when a message arrives, do something with it
        client.on('message', function(topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
        });
    });
    console.log("led status:"+led);
  
  });

// client.on('connect',()=>{
//     console.log("haha1");
//     // router.get('/connecting',function(req,res){
//     //     console.log("hassha");
//     //     var state = 'closed';
    
    
//     //     var garageState = '';
//     //     var connected=false;
    
        
//     //     res.type('text/plain');
//     //     res.send('connecting.');
    
//     // })
//     console.log("...");
//     client.subscribe('/ESP8266/Test');
//     client.publish('/ESP8266/Test','LED set to OFF')
// })
// client.on('message',(topic,message)=>{
//     console.log("haha2"+topic+"/"+message.toString());
//     // if(topic === 'garage/conn///ected'){
//     //     connected = (message.toString() === 'true');
//     // }
//     client.end()
// })

app.get("/batteryCheck",function(req,res){
    res.type('text/plain');
    res.send('batteryCheck.');
    console.log("come to batteryCheck"+req.query.battery);
    console.log("resized volt"+req.query.resizedVolt)

    var messageRef= ref.child("es82");
 var message = {battery:req.query.battery};
    messageRef.update(message).then(()=>{
        console.log("success");
    }).catch((err)=>{
        console.log("error"+err);
    });

});

app.get('/alarming',function(req,res){
    console.log(req.query.device);

    var device = req.query.device;
    res.type('text/plain');
    res.send('alarming.');
    var messageRef= ref;
//     messageRef.once('value').then((snapshot) => {
//         var values=snapshot.val()

//         console.log("values ");
//         console.log(values);
//     // Traverse through all users to check whether the user is eligible to get discount.
//     for (val in values) 
//     {
//         console.log("second");
//         console.log("eachvalue : ");
//         console.log(val); //clients - 다음 키 값
//         current = values[val]; // Assign current user to avoid values[val] calls.

//         console.log("111");
//         console.log(current.device);
//         if(current.device!=undefined){
//             console.log("222");
//             for( va in current.device){

//                 console.log(va);
//                 if(va==device){
//                     var secondRef=ref.child(val+'/device/'+device);
//                     secondRef.update({
//                         pressing:"true"
//                     }).then(()=>{

//                         client.publish('/ESP8266/disconnect', device, function() {
//                             console.log("MMMessage is Reconnecting");
                            
//                         });

//                     })

//                 }
//             }
//         }
//     }
// });

    
});
app.get('/successWifi',function(req,res){
    console.log("press success");

    // sendMessage('a815246b-4f4f-4d63-82ac-9ac3d0440123', 'Hello! this is from node js');
    var today = new Date();
    today.setHours(today.getHours()+9);
    
    var d = new Date();
    var days = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    var day =  days[d.getDay()];

  
    var thisday = new Date();
    var dddd=thisday.toString("hh:mm tt")
    thisday.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true })
    var month = thisday.getMonth();
    var date = thisday.getDate();
    var hour = thisday.getHours();
    var minute = thisday.getMinutes();
    var fullyear = thisday.getFullYear();
    console.log(dddd);
    console.log("this is the day")
    // new Date().toString("hh:mm tt")
    console.log(thisday)
    console.log(today)
    console.log(month+1);
    console.log(date);
    console.log((hour)+"시");
    console.log(minute);
    console.log(fullyear)


    var thisisday = (month+1)+"월"+date+"일"+(hour+9)+"시"+minute+"분";

    console.log(req.query.device);
    var device = req.query.device;
    var phoneKey=req.query.phoneKey;
    var appId="";
    console.log(phoneKey+"///"+device);

    var title="";
    var reff = firebase.database().ref().child('clients').child(phoneKey);
    reff.once('value').then((snap)=>{
        console.log("this is kkkkkey"+snap.key);
        console.log("this is value"+snap.val().appId);
        appId=snap.val().appId;
        var refff = firebase.database().ref().child('clients').child(phoneKey).child("devices").child(device);
        //
        console.log("this is ref")
        console.log(reff);
        refff.once('value').then((snap)=>{
    
            console.log(snap.val());
            // title=snap.val().title;
            // console.log("this is title : "+snap.val().title)
    
            // sendMessage(appId,snap.val().title+" 의 버튼이 눌러졌습니다!(예약)");
            // var ref = firebase.database().ref().child('clients').child(phoneKey).child("devices").child(device).child("record");

            // var messageRef= ref;
          
            // console.log("finished"+title);
            // messageRef.push({
            //     "date":thisisday,"flag":"reservation","title":title
            // })
           
        })
        
        // 
    })
   

    
    res.type('text/plain');
    res.send('success presseddeviceId.'+device);

    


})
app.get("/failed",function(req,res){
    var device = req.query.device;
    var phoneKey=req.query.phoneKey;
    var appId="";
    console.log(phoneKey+"///"+device);

    var title="";
    var reff = firebase.database().ref().child('clients').child(phoneKey);
    reff.once('value').then((snap)=>{
        console.log("this is key"+snap.key);
        console.log("this is value"+snap.val().appId);
        appId=snap.val().appId;
        var refff = firebase.database().ref().child('clients').child(phoneKey).child("devices").child(device);
        //
        refff.once('value').then((snap)=>{
    
            console.log(snap.val());
            console.log("this is title : "+snap.val().title)
    
            title=snap.val().title;
            sendMessage(appId,snap.val().title+" 의 버튼을 누르지 못하였습니다. 다시 시도해주세요.");
        });
    });
})
app.get('/success',function(req,res){
    console.log("press success");

    // sendMessage('a815246b-4f4f-4d63-82ac-9ac3d0440123', 'Hello! this is from node js');
    var today = new Date();
    today.setHours(today.getHours()+9);
    
    var d = new Date();
    var days = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    var day =  days[d.getDay()];

  
    var thisday = new Date();
    var dddd=thisday.toString("hh:mm tt")
    thisday.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true })
    var month = thisday.getMonth();
    var date = thisday.getDate();
    var hour = thisday.getHours();
    var minute = thisday.getMinutes();
    var fullyear = thisday.getFullYear();
    console.log(dddd);
    console.log("this is the day")
    // new Date().toString("hh:mm tt")
    console.log(thisday)
    console.log(today)
    console.log(month+1);
    console.log(date);
    console.log((hour)+"시");
    console.log(minute);
    console.log(fullyear)


    var thisisday = (month+1)+"월"+date+"일 "+(hour+9)+"시"+minute+"분";

    console.log(req.query.device);
    var device = req.query.device;
    var phoneKey=req.query.phoneKey;
    var appId="";
    console.log(phoneKey+"///"+device);

    var title="";
    var reff = firebase.database().ref().child('clients').child(phoneKey);
    reff.once('value').then((snap)=>{
        console.log("this is key"+snap.key);
        console.log("this is value"+snap.val().appId);
        appId=snap.val().appId;
        var refff = firebase.database().ref().child('clients').child(phoneKey).child("devices").child(device);
        //
        refff.once('value').then((snap)=>{
    
            console.log(snap.val());
            console.log("this is title : "+snap.val().title)
    
            title=snap.val().title;
            sendMessage(appId,snap.val().title+" 의 버튼이 눌러졌습니다!");
            var ref = firebase.database().ref().child('clients').child(phoneKey).child("devices").child(device).child("Record");

            var messageRef= ref;
          
            console.log("title to spread : "+title);
            messageRef.push({
                "date":thisisday,"flag":"normal","title":title
            })
        })
        
        // 
    })
   

    
    res.type('text/plain');
    res.send('success presseddeviceId.'+device);

    
   


})
app.get('/pressed',function(req,res){
    console.log("pressed come");
    console.log(req.query.device);
    console.log(req.query.phoneKey);
    var hubId = req.query.hubId;
    var device = req.query.device;
    var phoneKey=req.query.phoneKey;

    
    res.type('text/plain');
    res.send('presseddeviceId.'+device);
   
    client.publish('/ESP8266/pressed', hubId+device+phoneKey, function() {
        console.log("MMMessage is Reconnecting");
        
    });

    
});

var sendMessage = function(device, message){
	var restKey = 'Zjg5MzhkN2QtMzkzNC00Y2M5LWJkNDQtYjRmNDFhNzM5YzZk'
	var appID = "d523a5c4-f54f-471d-88fd-51b75c29dbb7"
	request(
		{
			method:'POST',
			uri:'https://onesignal.com/api/v1/notifications',
			headers: {
				"authorization": "Basic "+restKey,
				"content-type": "application/json"
			},
			json: true,
			body:{
				'app_id': appID,
				'contents': {en: message},
                'include_player_ids': Array.isArray(device) ? device : [device],
                'data': {'abc': '123','test': 'haha'}
                
			}
		},
		function(error, response, body) {
			if(!body.errors){
				console.log(body);
			}else{
				console.error('Error:', body.errors);
			}
			
		}
	);
}

app.get("/register",function(req,res){
    console.log("register come");
    var device = req.query.device;
    res.type('text/plain');
    res.send('register come.');
   
    client.publish('/ESP8266/register', device, function() {
        console.log("MMMessage is Reconnecting");
        
    });

})
app.get('/disconnected',function(req,res){
    var phoneKey=req.query.phoneKey;
    console.log(phoneKey);
    console.log("disconnected come");
    res.type('text/plain');
    res.send('disconnected.');
    var ref = firebase.database().ref().child('clients').child(phoneKey);

    var messageRef= ref;
    messageRef.update({flag:"false"})
})
app.get('/registered',function(req,res){
    //허브에서 폰키를 받아서 이제 유저의 디비에서 저장. 
    var device=req.query.deviceId;
    var phoneKey=req.query.phoneKey;

    console.log(device);
    console.log(phoneKey);
    console.log("registered come");
    res.type('text/plain');
    res.send('registered.');
    var ref = firebase.database().ref().child('clients').child(phoneKey).child("hub");

    var message={flag:"true",hubId:device}
    ref.push(message);
    

})
app.get('/disconnectdeviceId',function(req,res){
    var device = req.query.id;
    console.log("received Id is! : "+device);
    var messageRef= ref;
    res.type('text/plain');
    res.send('disconnectdeviceId.');
    client.publish('/ESP8266/disconnect', device, function() {
        console.log("MMMessage is Reconnecting");
        
    });
    // messageRef.once('value').then((snapshot) => {
    //     var values=snapshot.val()

    //     console.log("values ");
    //     console.log(values);
    // // Traverse through all users to check whether the user is eligible to get discount.
    // for (val in values) 
    // {
    //     console.log("second");
    //     console.log("eachvalue : ");
    //     console.log(val); //clients - 다음 키 값
    //     current = values[val]; // Assign current user to avoid values[val] calls.

    //     console.log("111");
    //     console.log(current.device);
    //     if(current.device!=undefined){
    //         console.log("222");
    //         for( va in current.device){

    //             console.log(va);
    //             if(va==device){
    //                 var secondRef=ref.child(val+'/device/'+device);
    //                 secondRef.update({
    //                     flag:"false"
    //                 }).then(()=>{

    //                     client.publish('/ESP8266/disconnect', device, function() {
    //                         console.log("MMMessage is Reconnecting");
                            
    //                     });

    //                 })
    //                 secondRef.once('value').then((snap) => {
    
    //                     var value=snap.val()
                        
    //                             console.log("vcccccalue ");
    //                             console.log(value);
    
    //                 });
    //                 // var messageRefSec.once('value')
    //                 console.log("일치!"+ current.device.flag);
    //             }
    //         }
            
    //     }
       
    //     console.log("current!!!!!!!!!!!!!!!!!!!!!")
    //     console.log(current.hum);
    //     // Do something with the user
    // }
    // });

})

app.get('/notifyHub',function(req,res){
    console.log("this is notifyHub")
    console.log(req.query.device);
    console.log(req.query.hubId);
    

    var hub=req.query.hubId;
    var device=req.query.device;
    var ref = firebase.database().ref().child('clients').child(hub);
    var messageRef= ref;
    
    var secondRef=ref.child('/device/'+device);
        secondRef.update({
            name:device,
            // flag:"true"
        })
    res.type('text/plain');
    res.send('notifyHub.');


})
app.get('/detected',function(req,res){
    var device=req.query.id;
    var hub=req.query.hubId;
    var ref = firebase.database().ref().child('clients').child(hub);
    var secondRef=ref.child('/motioned/'+device);


    var today = new Date();
    today.setHours(today.getHours()+9);
    
    var d = new Date();
    var days = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    var day =  days[d.getDay()];

  
    var thisday = new Date();
    var dddd=thisday.toString("hh:mm tt")
    thisday.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true })
    var month = thisday.getMonth();
    var date = thisday.getDate();
    var hour = thisday.getHours();
    var minute = thisday.getMinutes();
    var fullyear = thisday.getFullYear();
    console.log(dddd);
    console.log("this is the day")
    // new Date().toString("hh:mm tt")
    console.log(thisday)
    console.log(today)
    console.log(month+1);
    console.log(date);
    console.log((hour)+"시");
    console.log(minute);
    console.log(fullyear)


    var thisisday = fullyear+"년"+(month+1)+"월"+date+"일"+(hour+9)+"시"+minute+"분";


    secondRef.update({
        time:thisisday
    })
res.type('text/plain');
res.send('detected.');

})
app.get('/deviceId',function(req,res){
    //device가 와이파이에 연결이 완료됨. 따라서 앱에서 이신호를 받아야하는 부분까지. 

    var device = req.query.id;
    console.log("received Id : "+device);
    var messageRef= ref;
    res.type('text/plain');
    res.send('deviceId.');
    // setTimeout(()=>{

    //     messageRef.once('value').then((snapshot) => {
    //         var values=snapshot.val()
    
    //         console.log("values ");
    //         console.log(values);
    //     // Traverse through all users to check whether the user is eligible to get discount.
    //     for (val in values) 
    //     {
    //         console.log("second");
    //         console.log("eachvalue : ");
    //         console.log(val); //clients - 다음 키 값 ex:) es82 
    //         current = values[val]; // Assign current user to avoid values[val] calls.
    
    //         console.log("111");
    //         console.log(current.device);
    //         if(current.device!=undefined){
    //             console.log("222");
    //             for( va in current.device){
    
    //                 console.log(va);
    //                 if(va==device){
    //                     var secondRef=ref.child(val+'/device/'+device);
    //                     secondRef.update({
    //                         flag:"true"
    //                     })
    //                     secondRef.once('value').then((snap) => {
        
    //                         var value=snap.val()
                            
    //                                 console.log("vcccccalue ");
    //                                 console.log(value);
        
    //                     });
    //                     // var messageRefSec.once('value')
    //                     console.log("일치!"+ current.device.flag);
    //                 }
    //             }
                
    //         }
           
    //         console.log("current!!!!!!!!!!!!!!!!!!!!!")
    //         console.log(current.hum);
    //         // Do something with the user
    //     }
    //     });

    // },5000)
    

})

app.get("/publising",function(req,res){
    console.log("publishing");
    client.publish('/ESP8266/Test', "this is test message", function() {
        console.log("MMMessage is publising");
    });
    res.type('text/plain');
    res.send('publising.');
})
app.get('/reconnect',function(req,res){
    console.log("come to reconnect")
    client.publish('/ESP8266/disconnect', req.query.device, function() {
        console.log("MMMessage is Reconnecting");
        var messageRef= ref.child(req.query.device);
        messageRef.update({
            "connectivity":"close"
        }).then(()=>{
            console.log("success");
        }).catch((err)=>{
            console.log("error"+err);
        });
    });
    res.type('text/plain');
    res.send('disconnecting....');

})

app.get('/add',function(req,res){
    console.log("adding new device button");


})
app.get('/sendId',function(req,res){
    console.log("sendId button"+req.query.id);

    var messageRef= ref.child(req.query.id);
    messageRef.update({
        "connectivity":"open"
    }).then(()=>{
        console.log("success");
    }).catch((err)=>{
        console.log("error"+err);
    });
    res.type('text/plain');
      res.send('connecting.');

})
app.get("giveId",function(req,res){
    console.log("userId"+req.query.id);
    client.publish('/ESP8266/ID', req.query.id, function() {
        console.log("MMMessage is published to on");
    });

})
app.get('/close',function(req,res){
    console.log("close window!");

    
})
app.get("/getIp",function(req,res){
    console.log(req.query.ip);
    ref.on("value", function(snapshot) {
        console.log("getvalue"+snapshot.numChildren());
        console.log("getvalue");
       
        console.log(snapshot.key);
        console.log("getvalue2");
        returnArr = [];
        returnArr2 = [];
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
    
            console.log("key is : "+childSnapshot.key);
    
            returnArr.push(item);
            
        });
        console.log(returnArr);
        for(var i=0; i<snapshot.numChildren(); i++){
            console.log(i+"ip is : "+returnArr[i].ex_ip);
            if(returnArr[i].ex_ip=="117.111.14.162"){
                console.log("id is : "+returnArr[i].id);
    
                res.type('text/plain');
                res.send(returnArr[i].id);
            }
        }
        console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

})

  
  
app.get('/',function(req,res){
    console.log("today88");
    
    // var config = url.parse(mqtt_url);
    // config.topic=topic;
    // res.render('index',{
    //     connected:client.connected,
    //     config:config
    // })
    // today.setHours(today.getHours());
    // alert(today);
    // setInterval(intervalFunc, 1500);
    
    
	res.type('text/plain');
    res.send('8888888');
    
});
app.get('/getTemperature',function(req,res){
    console.log(req.query.temp);
    console.log(req.query.hum);
    var hubId=req.query.hubId;
    var deviceId=req.query.device;
    res.type('text/plain');
    res.send("gettemp!");
    var today = new Date();
    today.setHours(today.getHours()+9);
    
    var d = new Date();
    var days = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    var day =  days[d.getDay()];

  
    var thisday = new Date();
    var dddd=thisday.toString("hh:mm tt")
    thisday.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true })
    var month = thisday.getMonth();
    var date = thisday.getDate();
    var hour = thisday.getHours();
    var minute = thisday.getMinutes();
    var fullyear = thisday.getFullYear();
    console.log(dddd);
    console.log("this is the day")
    // new Date().toString("hh:mm tt")
    console.log(thisday)
    console.log(today)
    console.log(month+1);
    console.log(date);
    console.log((hour)+"시");
    console.log(minute);
    console.log(fullyear)


    var thisisday = (month+1)+"월 "+date+"일 "+(hour+9)+":"+minute;

    if(req.query.dust==undefined){
        req.query.dust="null";
    }
    console.log(thisisday)
    var flag=false;
    var messageRef= ref.child(deviceId).child('hub');
    messageRef.once('value').then((snap)=>{
        console.log("this is key"+snap.key);
        console.log("this is value"+snap.val());
        console.log(snap.val());
        for (val in snap.val()) {

            console.log("value is :"+val);
            console.log("result isssssss : "+snap.val()[val]);
            console.log(snap.val()[val]);
            console.log(snap.val().key);
            if(snap.val()[val].hubId==hubId){
                console.log("발견!"+val);
                var message = {temp:req.query.temp,hum:req.query.hum, updatedtimestamp: thisisday};
                messageRef.child(val).child("tempRecord").push(message).then(()=>{
                    console.log("success");
                })
                messageRef.child(val).update(message)
            }

        }
        // if(snap.val().){

        // }
        // appId=snap.val().appId;
        // var refff = firebase.database().ref().child('clients').child(phoneKey).child("devices").child(device);
        // //
        // refff.once('value').then((snap)=>{
        // });
    });
    // var message = {temp:req.query.temp,hum:req.query.hum, updatedtimestamp: thisisday};
    // messageRef.child("tempRecord").push(message).then(()=>{
    //     console.log("temprecord succ");
    // }).catch((err)=>{
    //     console.log("err:"+err);
    // });
    
    // messageRef.update(message).then(()=>{
    //     console.log("success");
    // }).catch((err)=>{
    //     console.log("error"+err);
    // });

})

app.get('/getPic',function(req,res){
    console.log("getpicfture come!")
    res.type('text/plain');
    res.send("getpic!");
})
app.get('/turnon',function(req,res){
    console.log("bothtttttt");
    console.log(req.query.led);
    led=req.query.led;
    res.type('text/plain');
    res.send("both!");

    var led=req.query.led;
    if(led=="on"){
        
        client.publish('/ESP8266/Test', 'LED set to ON/kotran', function() {
            console.log("MMMessage is published to on");
        });
        //포트포워딩한 외부 ip에게 보낸다. http request get to 121.138.12.9:8080/on
        
    }else{
        client.publish('/ESP8266/Test', 'LED set to OFF/kotran', function() {
            console.log("MMMessage is published to off");
        });
        //포트포워딩한 외부 ip에게 보낸다. http request get to 121.138.12.9:8080/on
    }
    // client.on('connect', function() { // When connected
    //     console.log('cccccccc!!!!');
    //     console.log("led : "+led);
    //     // subscribe to a topic
       
    //     
     
    //   });

    
    var today = new Date();
    today.setHours(today.getHours()+9);
     // ref.update(payload);
     var messageRef= ref.child(req.query.id);
     var message = {id:req.query.id,led:req.query.led,ex_ip:req.query.ip, timestamp: today};
     messageRef.update(message).then(()=>{
         console.log("success");
     }).catch((err)=>{
         console.log("error"+err);
     });

    

})


app.use(function(req,res){
	res.type('text/plain');
	res.status(404);
	res.send('404-Not');
})
app.use(function(err,req,res,next){
	console.log(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('505-server');
});
/* */
function getFirebase(val){
    var today = new Date();
    today.setHours(today.getHours()+9);
    
    var d = new Date();
    var days = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    var day =  days[d.getDay()];

  
    var thisday = new Date();
    var dddd=thisday.toString("hh:mm tt")
    thisday.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true })
    var month = thisday.getMonth();
    var date = thisday.getDate();
    var hour = thisday.getHours();
    var minute = thisday.getMinutes();
    var fullyear = thisday.getFullYear();
    console.log(dddd);
    console.log("seize this is the day")
    // new Date().toString("hh:mm tt")
    console.log(thisday)
    console.log(today)
    console.log(month+1);
    console.log("데이트 : "+date);
    console.log((hour)+"시");
    console.log(minute);
    console.log(fullyear)

    let secondRef=  ref.child(val+'/reservation').once('value');
    return secondRef.then(function(querySnapshot) {
     var results = [];
     querySnapshot.forEach(function(doc) {
        console.log("this is first doc"+val) //356356080859149
        console.log(doc.key); //0CB2B77BB2BB
        console.log(doc.val());
        for(let value in doc.val()){
            console.log("going marry")
            console.log(value);
            console.log(doc.val()[value].count);
            console.log(doc.val()[value].date);
            console.log(doc.val()[value].hour);
            console.log(doc.val()[value].minute);
            console.log("value to compare");
            console.log("judging to send:"+doc.key);
            console.log(day);
            console.log(hour);
            console.log(minute);

            if(day==doc.val()[value].date&&(hour+9)==doc.val()[value].hour&&minute==doc.val()[value].minute){
            console.log("sound alarm!!!!!!!!!!!!!!!"+doc.key);

                client.publish('/ESP8266/ReservationPressed', doc.key, function() {
                    console.log("MMMessage is Reconnecting");
                    
                });
                }



        }
     });
     // dbPromise.then() resolves to  a single promise that resolves 
     // once all results have resolved
     return Promise.all(results)
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}
 
/*


                        */
function intervalFunc() {

    console.log("intervalFunc")
    var today = new Date();
    today.setHours(today.getHours()+9);
    
    var d = new Date();
    var days = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    var day =  days[d.getDay()];

  
    var thisday = new Date();
    var dddd=thisday.toString("hh:mm tt")
    thisday.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true })
    var month = thisday.getMonth();
    var date = thisday.getDate();
    var hour = thisday.getHours();
    var minute = thisday.getMinutes();
    var fullyear = thisday.getFullYear();
    console.log(dddd);
    console.log("seize this is the day")
    // new Date().toString("hh:mm tt")
    console.log(thisday)
    console.log(today)
    console.log(month+1);
    console.log("데이트 : "+date);
    console.log((hour)+"시");
    console.log(minute);
    console.log(fullyear)


    var thisisday = fullyear+"년"+(month+1)+"월"+date+"일"+(hour+9)+"시"+minute+"분"+day;
    console.log("this is the day");
    console.log(thisisday);
    var ref = firebase.database().ref().child('clients');

    var messageRef= ref;
    messageRef.once('value').then((snapshot) => {
                var values=snapshot.val()
        
            // Traverse through all users to check whether the user is eligible to get discount.
            for (val in values) 
            {
                getFirebase(val);
                // console.log(val); //clients - 다음 키 값 ex:) phoneKey value 
                //     var secondRef=ref.child(val+'/reservation');
                           
                //     secondRef.once('value').then((snap) => {
                //         var values=snap.val()
                //         console.log(snap.key+"   value : "+values);
                //         console.log("secondddddd values ");
                //        console.log("vvvval is :"+val);
                //        const promises = []
                //        for(let va in values){
                //            console.log("va is : "+va);
                //             getFacultyFavoritesFirebase(val,va);
                           



                          
                //        }
                //        getFacultyFavoritesFirebase
                //         .then(results => {
                //             console.log("result is : "+results);
                //         });
                //     });
            
            }
                        //    thirdRef.then((sna)=>{


                            

                            //   console.log("this should va vary : "+va);
                            //    console.log(sna.key);
                            //    console.log(sna.val());
                            //    for(value in sna.val()){
                            //        console.log(value);
                            //        console.log(sna.val()[value].count)
                            //        console.log(sna.val()[value].date)
                            //        console.log(sna.val()[value].hour)
                            //        console.log(sna.val()[value].minute)

                            //        console.log("value to compare");
                            //        console.log("judging to send:"+va);
                            //         console.log(day);
                            //         console.log(hour);
                            //         console.log(minute);


                            //    }
                               
                        //    })
                          
                         
                       console.log("for end2")
                        //    console.log("vvvvvvvvval is :"+val);

                        //    if(va=="0CB2B77BB2BB"){
                            //    console.log("com!"+val+" va : "+va);
                            // var thirdRef=ref.child(val+'/reservation/'+va);
                            //  thirdRef.once('value').then((sna)=>{
                            //     console.log("value come!!!!!!!!!!!!!!");
                            //         var values=sna.val()
                            //         console.log(sna.key);
                            //         console.log(sna.val());
                            //         for(v in sna.val()){
                            //             console.log("each"+va);
                            //             console.log(v);
                            //             var fourthRef=ref.child(val+'/reservation/'+va+"/"+v).once('value');
                            //             console.log(fourthRef);
                            //             fourthRef.then((sn)=>{
                            //                 console.log(sn.key);
                            //                 console.log(sn.val().date);
                            //                 console.log(sn.val().hour);
                            //                 console.log(sn.val().minute);
                            //                 console.log("value to compare");
                            //                 console.log(day);
                            //                 console.log(hour);
                            //                 console.log(minute);
                            //                 if(day==sn.val().date&&hour==sn.val().hour&&minute==sn.val().minute){
                            //                 console.log(v+"sound alarm!!!!!!!!!!!!!!!"+va);

                            //                     // client.publish('/ESP8266/pressed', values[va].address, function() {
                            //                     //     console.log("MMMessage is Reconnecting");
                                                    
                            //                     // });
                            //                  }
                            //             });
                            //         }
                            //         });
                            // }

                                        //  fourthRef.once('value').then((sn)=>{

                                        //     // console.log(va);
                                        //     console.log(v);
                                        //     console.log("second val")
                                        // });
                                    
                                            // console.log(sn.val().date);
                                            // console.log(sn.val().hour);
                                            // console.log(sn.val().minute);
                                            // console.log(sn.val().count);
                                            // 
                                            // if(day==sn.val().date&&(hour)==sn.val().hour&&minute==sn.val().minute){
                                            //     console.log(v+"sound alarm!!!!!!!!!!!!!!!"+va);

                                                // client.publish('/ESP8266/pressed', values[va].address, function() {
                                                //     console.log("MMMessage is Reconnecting");
                                                    
                                                // });


                                            // }


                                            
                                        
                          
                        //    
                        //     console.log("third values ");
                        //     console.log(values);
                        //    for(va in values){
                        //        console.log("each");
                        //     console.log(va);
                        //    }

                        //    })
                        //    console.log(values[va].address);
                        //    console.log(values[va].date);
                        //    console.log(values[va].hour);
                        //    console.log(values[va].minute);
                           
                        


                       
                        
                    
                // current = values[val];
                // console.log("current:"+current);
                // for( va in current.devices){

                //     console.log("va is :"+current.devices[va]);
                    
                        
                // }
           
        }); 
                // current = values[val]; // Assign current user to avoid values[val] calls.
        
                // console.log("111");
                // console.log(current.device);
                // if(current.device!=undefined){
                //     console.log("222");
                //     for( va in current.device){
        
                //         console.log(va);
                //         if(va==device){
                //             var secondRef=ref.child(val+'/device/'+device);
                //             secondRef.update({
                //                 flag:"true"
                //             })
                //             secondRef.once('value').then((snap) => {


}
var server = app.listen(process.env.PORT || 13145, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
    intervalFunc();

    setInterval(intervalFunc, 1000*60);
  });
