var firebase = require('firebase').initializeApp({
    serviceAccount:"./Ionic-8e43361a6400.json",
    databaseURL:"https://ionic-173108.firebaseio.com/"
})
var globalData = require('./globalData.js');

// var firebase = require('firebase').initializeApp({
//     serviceAccount:"./appbomi.json",
//     databaseURL:"https://appbomi.firebaseio.com/"
// })

//앱에서 아이디 , 아이피를 주면. 
//아두이노에서 아이피를 전달하면, 서버에서 앱 아이디를 리턴해줌. 
//그럼 아두이노에서 callback에서 /LED/전달받은 아이디 이런식으로 구조를 만듬. 

// var url = require('url');
// const mqtt = require('mqtt');
// var client  = mqtt.connect('mqtt://m11.cloudmqtt.com:13145')  
// const client = mqtt.connect("m11.cloudmqtt.com");
// const publicIp = require('public-ip');

// var ref = firebase.database().ref().child('clients');

// var logsRef = ref.child('logs');
// console.log("haha");

var express=require('express');
var app=express();
var router = express.Router();
var port = process.env.PORT || 13145
var pIp="";

var cheerio = require('cheerio');
var request = require('request');

var stringList = "";


// var mqtt_url = process.env.CLOUDMQTT_URL || 'mqtt://m11.cloudmqtt.com:13145';
// var options = {
//     port: 13145,
//     host: 'mqtt://m11.cloudmqtt.com',
//     clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
//     username: 'oiuvxpyr',
//     password: 'E0PoewCUZ1Dx',
//     keepalive: 60,
//     reconnectPeriod: 1000,
//     protocolId: 'MQIsdp',
//     protocolVersion: 3,
//     clean: true,
//     encoding: 'utf8'
//   };
//   var led ="";
//   var client = mqtt.connect('mqtt://m11.cloudmqtt.com', options);
//   client.on('connect', function() { // When connected
//     console.log('connected');
//     // subscribe to a topic
//     client.subscribe('/ESP8266/Test', function() {  
//         // when a message arrives, do something with it
//         client.on('message', function(topic, message, packet) {
//             console.log("Received '" + message + "' on '" + topic + "'");
//         });
//     });
//     console.log("led status:"+led);
  
//   });

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

app.get("/getIp",function(req,res){
    console.log(req.query.ip);
    // ref.on("value", function(snapshot) {
        console.log("getvalue"+snapshot.numChildren());
        console.log("getvalue");
       
        console.log(snapshot.key);
        console.log("getvalue2");
        returnArr = [];
        returnArr2 = [];
        // snapshot.forEach(function(childSnapshot) {
        //     var item = childSnapshot.val();
        //     item.key = childSnapshot.key;
    
        //     console.log("key is : "+childSnapshot.key);
    
        //     returnArr.push(item);
            
        // });
        console.log(returnArr);
        // for(var i=0; i<snapshot.numChildren(); i++){
        //     console.log(i+"ip is : "+returnArr[i].ex_ip);
        //     if(returnArr[i].ex_ip=="117.111.14.162"){
        //         console.log("id is : "+returnArr[i].id);
    
        //         res.type('text/plain');
        //         res.send(returnArr[i].id);
        //     }
        // }
        res.type('text/plain');
        res.send(returnArr[i].id);
        console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
    //   }, function (errorObject) {
    //     console.log("The read failed: " + errorObject.code);
    //   });

})
function receivingPsp(tokenId){






    var targetUrlDs = 'http://market.ruliweb.com/list.htm?table=market_psp';
    
         request(targetUrlDs,function(error,response,body){
            var $ = jQuery = cheerio.load(body);
            console.log("request psp come");
            
              $('#ruliboard_list').each(function(item){
                  var region = $(this).find('.market_kind').text().trim();
                  var flag =  $(this).find('.market_place').text().trim();
      
                  var title =  $(this).find('.market_subject').text().trim();
                  var atag = $(this).find('.market_subject').find('a').attr('href');
                  console.log("atag is ");
                  console.log(atag);
                  var date = $(this).find('.market_date').text().trim();
                  var dataAValue = globalData.dataA;
      
                  var nickname = $(this).find('.market_nick').text().trim();
                  var postNm = $(this).find('.market_num').text().trim();
    
                  
                  console.log(dataAValue)
                  global.linkUrlPsp.push(atag);
                  global.nicknamePsp.push(nickname)
                  global.titleListPsp.push(title);
                  global.postNmPsp.push(postNm);
                  console.log(region);
                  console.log(title)
              })
    
              var sum = "";
                console.log("sum is")
                console.log(sum);
                for(name in global.hash){
                    console.log("sw name is : "+name);
                
                
                    console.log(global.hash[name]);
                
                    var newkeyword=[];
                    var id = global.hash[name].split("&")[1]
                    console.log(global.hash[name]);
                    console.log("ps id isssss : "+id);
                    newkeyword =  global.hash[name].split("&")[0].split('/');
                    var psflag = global.hash[name].split("&")[2]
                    var xbflag = global.hash[name].split("&")[3]
                    var swflag = global.hash[name].split("&")[4]
                    var dsflag = global.hash[name].split("&")[5]
                    var pspflag = global.hash[name].split("&")[6]
                    console.log(psflag);
                    console.log(xbflag);
                    console.log(swflag);
                    console.log(dsflag);
                    console.log(pspflag);
                    console.log("psp flagiing input")
                
                    if(pspflag=="clicked"){
    
                        for(var i=0; i<newkeyword.length; i++ ){
                            
                             for(var j=0; j<global.titleListPsp.length; j++){
                                
                                 if(global.titleListPsp[j].indexOf(newkeyword[i])>=0){
    
    
                                    console.log("psp 일치한다"+global.titleListPsp[j])
                                    console.log(global.noNm)
                                    var flaging=false;
                                    global.noNm[name].forEach(function(element) {
                                        console.log("psp routinesssssssssssssssssssssssssssssss"+element);
                                        if(element==global.postNmPsp[j]){
                                            console.log("psp 금지므로 발소안함")
                                                              flaging=true;
                                          }
                                    }, this);
                                    //   for(var i=0; i<newkeyword.length; i++ ){
                                     
                                     
                                      console.log("psp 일치한다"+flaging)
                                      if(!flaging){
    
                                        var message = { 
                                            //2192c71b-49b9-4fe1-bee8-25617d89b4e8
                                            app_id: "3ccd720d-dd44-41dd-9a72-3224fe45d756",
                                            contents: {"en": "클릭하면, 상세내용으로 이동합니다."},
                                            headings : {"en":global.titleListPsp[j]},
                                            // subtitle : {"en":"this is subtitle"},
                                            data: {"datas":global.linkUrlPsp[j]},
                                            include_player_ids: [name]
                                        };
                    
                                        console.log(name+"PPPPPPPPPPPPPPPPPPPPPPPPringfting");
                                       
                    
                                        let today = new Date();
                                        let dd;
                                        let day;
                                        let month;
                                         dd = today.getDate();
                                        var mm = today.getMonth()+1; //January is 0!
                                        var yyyy = today.getFullYear();
                                       var time=new Date().toLocaleTimeString('en-US', { hour12: false,hour: "numeric",minute: "numeric",second:"numeric"});
                                        dd<10?day='0'+dd:day=''+dd;
                                        mm<10?month='0'+mm:month=''+mm;
                                        var minute=time.minute
                                        
                                       
                                        var d = new Date();
                                        var hour = d.getHours();
                                        var n = d.getMinutes();
                                        var s = d.getSeconds();
                                        console.log("name to filtering"+global.nicknamePsp[j]);
                                        global.noNm[name].forEach(function(element) {
                                          console.log("name routinesssssssssssssssssssssssssssssss"+element);
                                          if(element==global.nicknamePsp[j]){
                                                    console.log(global.nicknamePsp[j]+"금지 일치므로 발소안함")
                                                                      flaging=true;
                                                  }
                                      }, this);
                                      console.log("message is ...");
                                      console.log(message);
                                        sendNotification(message);
                                        let  postData = {
                                            title:global.titleListPsp[j],
                                            time : month+"월"+day+"일"+hour+"시"+n+"분"+s+"초",
                                            nickname : global.nicknamePsp[j],
                                            link : global.linkUrlPsp[j],
                                            flag : "psp",
                                            postNm:global.postNmPsp[j]
                                         };
                                         firebase.database().ref(`profile/`+id+"/list").push(postData, error => {
                                             if (error) {
                                                 console.log("eeeeeeeeeeeeeeeeee"+error)
                                               // Log error to external service, e.g. Sentry
                                             } else {
                                                 console.log("successsssssss")
                                             }
                                           });
                                     }
                                                   
                                      }
                                 
                                 }
                             }
                           }
                    }
    
                         
                         
    
                
    
    
              
    
            global.titleListPsp=[];
            global.linkUrlPsp=[];
            global.nicknamePsp=[];
    
        });





}
function receivingDs(tokenId){
    




    var targetUrlDs = 'http://market.ruliweb.com/list.htm?table=market_nds';
    
         request(targetUrlDs,function(error,response,body){
            var $ = jQuery = cheerio.load(body);
            console.log("request sw come");
            
              $('#ruliboard_list').each(function(item){
                  var region = $(this).find('.market_kind').text().trim();
                  var flag =  $(this).find('.market_place').text().trim();
      
                  var title =  $(this).find('.market_subject').text().trim();
                  var atag = $(this).find('.market_subject').find('a').attr('href');
                  console.log("atag is ");
                  console.log(atag);
                  var date = $(this).find('.market_date').text().trim();
                  var dataAValue = globalData.dataA;
      
                  var nickname = $(this).find('.market_nick').text().trim();
                  var postNm = $(this).find('.market_num').text().trim();
    
                  
                  console.log(dataAValue)
                  global.linkUrlDs.push(atag);
                  global.nicknameDs.push(nickname)
                  global.titleListDs.push(title);
                  global.postNmDs.push(postNm);
                  console.log(region);
                  console.log(title)
              })
    
              var sum = "";
                console.log("sum is")
                console.log(sum);
                for(name in global.hash){
                    console.log("sw name is : "+name);
                
                
                    console.log(global.hash[name]);
                
                    var newkeyword=[];
                    var id = global.hash[name].split("&")[1]
                    console.log(global.hash[name]);
                    console.log("ps id isssss : "+id);
                    newkeyword =  global.hash[name].split("&")[0].split('/');
                    var psflag = global.hash[name].split("&")[2]
                    var xbflag = global.hash[name].split("&")[3]
                    var swflag = global.hash[name].split("&")[4]
                    var dsflag = global.hash[name].split("&")[5]
                    var pspflag = global.hash[name].split("&")[6]
                    console.log(psflag);
                    console.log(xbflag);
                    console.log(swflag);
                    console.log(dsflag);
                    console.log(pspflag);
                    console.log("sw flagiing input")
                
                    if(dsflag=="clicked"){
    
                        for(var i=0; i<newkeyword.length; i++ ){
                            
                             for(var j=0; j<global.titleListDs.length; j++){
                                
                                 if(global.titleListDs[j].indexOf(newkeyword[i])>=0){
    
    
                                    console.log("DS 일치한다"+global.titleListDs[j])
                                    console.log(global.noNm)
                                    var flaging=false;
                                    global.noNm[name].forEach(function(element) {
                                        console.log("sw routinesssssssssssssssssssssssssssssss"+element);
                                        if(element==global.postNmDs[j]){
                                            console.log("sw 금지므로 발소안함")
                                                              flaging=true;
                                          }
                                    }, this);
                                    //   for(var i=0; i<newkeyword.length; i++ ){
                                     
                                     
                                      console.log("sw 일치한다"+flaging)
                                      if(!flaging){
    
                                        var message = { 
                                            //2192c71b-49b9-4fe1-bee8-25617d89b4e8
                                            app_id: "3ccd720d-dd44-41dd-9a72-3224fe45d756",
                                            contents: {"en": "클릭하면, 상세내용으로 이동합니다."},
                                            headings : {"en":global.titleListDs[j]},
                                            // subtitle : {"en":"this is subtitle"},
                                            data: {"datas":global.linkUrlDs[j]},
                                            include_player_ids: [name]
                                        };
                    
                                        console.log(name+"PPPPPPPPPPPPPPPPPPPPPPPPringfting");
                                       
                    
                                        let today = new Date();
                                        let dd;
                                        let day;
                                        let month;
                                         dd = today.getDate();
                                        var mm = today.getMonth()+1; //January is 0!
                                        var yyyy = today.getFullYear();
                                       var time=new Date().toLocaleTimeString('en-US', { hour12: false,hour: "numeric",minute: "numeric",second:"numeric"});
                                        dd<10?day='0'+dd:day=''+dd;
                                        mm<10?month='0'+mm:month=''+mm;
                                        var minute=time.minute
                                        
                                       
                                        var d = new Date();
                                        var hour = d.getHours();
                                        var n = d.getMinutes();
                                        var s = d.getSeconds();
                                        console.log("name to filtering"+global.nicknameDs[j]);
                                        global.noNm[name].forEach(function(element) {
                                          console.log("name routinesssssssssssssssssssssssssssssss"+element);
                                          if(element==global.nicknameDs[j]){
                                                    console.log(global.nicknameDs[j]+"금지 일치므로 발소안함")
                                                                      flaging=true;
                                                  }
                                      }, this);
                                      if(!flaging){
                                          console.log("ds message is ");
                                          console.log(message);
                                        sendNotification(message);
                                        let  postData = {
                                            title:global.titleListDs[j],
                                            time : month+"월"+day+"일"+hour+"시"+n+"분"+s+"초",
                                            nickname : global.nicknameDs[j],
                                            link : global.linkUrlDs[j],
                                            flag : "ds",
                                            postNm:global.postNmDs[j]
                                         };
                                         firebase.database().ref(`profile/`+id+"/list").push(postData, error => {
                                             if (error) {
                                                 console.log("eeeeeeeeeeeeeeeeee"+error)
                                               // Log error to external service, e.g. Sentry
                                             } else {
                                                 console.log("successsssssss")
                                             }
                                           });
                                      }
                                                   
                                      }
                                 
                                 }
                             }
                           }
                    }
    
                         
                         
    
                
    
                }
    
              
    
            global.titleListDs=[];
            global.linkUrlDs=[];
            global.nicknameDs=[];
    
        });







}
function receivingSw(tokenId){
      var targetUrlSw = 'http://market.ruliweb.com/list.htm?table=market_ngc';

     request(targetUrlSw,function(error,response,body){
        var $ = jQuery = cheerio.load(body);
        console.log("request sw come");
        
          $('#ruliboard_list').each(function(item){
              var region = $(this).find('.market_kind').text().trim();
              var flag =  $(this).find('.market_place').text().trim();
  
              var title =  $(this).find('.market_subject').text().trim();
              var atag = $(this).find('.market_subject').find('a').attr('href');
              console.log("atag is ");
              console.log(atag);
              var date = $(this).find('.market_date').text().trim();
              var dataAValue = globalData.dataA;
  
              var nickname = $(this).find('.market_nick').text().trim();
              var postNm = $(this).find('.market_num').text().trim();

              
              console.log(dataAValue)
              global.linkUrlSw.push(atag);
              global.nicknameSw.push(nickname)
              global.titleListSw.push(title);
              global.postNmsw.push(postNm);
              console.log(region);
              console.log(title)
          })

          var sum = "";
            console.log("sum is")
            console.log(sum);
            for(name in global.hash){
                console.log("sw name is : "+name);
            
            
                console.log(global.hash[name]);
            
                var newkeyword=[];
                var id = global.hash[name].split("&")[1]
                console.log(global.hash[name]);
                console.log("ps id isssss : "+id);
                newkeyword =  global.hash[name].split("&")[0].split('/');
                var psflag = global.hash[name].split("&")[2]
                var xbflag = global.hash[name].split("&")[3]
                var swflag = global.hash[name].split("&")[4]
                console.log(psflag);
                console.log(xbflag);
                console.log(swflag);
                console.log("sw flagiing input")
            
                if(swflag=="clicked"){

                    for(var i=0; i<newkeyword.length; i++ ){
                        
                         for(var j=0; j<global.titleListSw.length; j++){
                            
                             if(global.titleListSw[j].indexOf(newkeyword[i])>=0){


                                console.log("sw 일치한다"+global.titleListSw[j])
                                console.log(global.noNm)
                                var flaging=false;
                                global.noNm[name].forEach(function(element) {
                                    console.log("sw routinesssssssssssssssssssssssssssssss"+element);
                                    if(element==global.postNmsw[j]){
                                        console.log("sw 금지므로 발소안함")
                                                          flaging=true;
                                      }
                                }, this);
                                //   for(var i=0; i<newkeyword.length; i++ ){
                                 
                                 
                                  console.log("sw 일치한다"+flaging)
                                  if(!flaging){

                                    var message = { 
                                        //2192c71b-49b9-4fe1-bee8-25617d89b4e8
                                        app_id: "3ccd720d-dd44-41dd-9a72-3224fe45d756",
                                        contents: {"en": "클릭하면, 상세내용으로 이동합니다."},
                                        headings : {"en":global.titleListSw[j]},
                                        // subtitle : {"en":"this is subtitle"},
                                        data: {"datas":global.linkUrlSw[j]},
                                        include_player_ids: [name]
                                    };
                
                                    console.log(name+"PPPPPPPPPPPPPPPPPPPPPPPPringfting");
                                   
                
                                    let today = new Date();
                                    let dd;
                                    let day;
                                    let month;
                                     dd = today.getDate();
                                    var mm = today.getMonth()+1; //January is 0!
                                    var yyyy = today.getFullYear();
                                   var time=new Date().toLocaleTimeString('en-US', { hour12: false,hour: "numeric",minute: "numeric",second:"numeric"});
                                    dd<10?day='0'+dd:day=''+dd;
                                    mm<10?month='0'+mm:month=''+mm;
                                    var minute=time.minute
                                    
                                   
                                    var d = new Date();
                                    var hour = d.getHours();
                                    var n = d.getMinutes();
                                    var s = d.getSeconds();
                                    console.log("name to filtering"+global.nicknameXb[j]);
                                    global.noNm[name].forEach(function(element) {
                                      console.log("name routinesssssssssssssssssssssssssssssss"+element);
                                      if(element==global.nicknameSw[j]){
                                                console.log(global.nicknameSw[j]+"금지 일치므로 발소안함")
                                                                  flaging=true;
                                              }
                                  }, this);
                                  if(!flaging){
                                    sendNotification(message);
                                    let  postData = {
                                        title:global.titleListSw[j],
                                        time : month+"월"+day+"일"+hour+"시"+n+"분"+s+"초",
                                        nickname : global.nicknameSw[j],
                                        link : global.linkUrlSw[j],
                                        flag : "sw",
                                        postNm:global.postNmsw[j]
                                     };
                                     firebase.database().ref(`profile/`+id+"/list").push(postData, error => {
                                         if (error) {
                                             console.log("eeeeeeeeeeeeeeeeee"+error)
                                           // Log error to external service, e.g. Sentry
                                         } else {
                                             console.log("successsssssss")
                                         }
                                       });
                                  }
                                               
                                  }
                             
                             }
                         }
                       }
                }

                     
                     

            

            }

          

        global.titleListSw=[];
        global.linkUrlSw=[];
        global.nicknameSw=[];

    });
}
function receivingXb(tokenId){
    var targetUrlXb = 'http://market.ruliweb.com/list.htm?table=market_xbox';
    
   
    request(targetUrlXb,function(error,response,body){
        var $ = jQuery = cheerio.load(body);
        console.log("request xb come");
        console.log(tokenId);
        


          $('#ruliboard_list').each(function(item){
              var region = $(this).find('.market_kind').text().trim();
              var flag =  $(this).find('.market_place').text().trim();
  
              var title =  $(this).find('.market_subject').text().trim();
              var atag = $(this).find('.market_subject').find('a').attr('href');
              var date = $(this).find('.market_date').text().trim();
              var dataAValue = globalData.dataA;
  
              var nickname = $(this).find('.market_nick').text().trim();
              var postNm = $(this).find('.market_num').text().trim();


              global.linkUrlXb.push(atag);
              global.nicknameXb.push(nickname)
              global.titleListXb.push(title);

              global.postNmxb.push(postNm);
          })

          
          



var sum = "";
console.log("global hash check in xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
console.log(global.hash);
console.log("token : "+tokenId);
for(name in global.hash){
    console.log("xb name is : "+name);


    console.log(global.hash[name]);

    var newkeyword=[];
    var id = global.hash[name].split("&")[1]
    console.log(global.hash[name]);
    console.log("xb id isssss : "+id);
    newkeyword =  global.hash[name].split("&")[0].split('/');
    var psflag = global.hash[name].split("&")[2]
    var xbflag = global.hash[name].split("&")[3]
    var swflag = global.hash[name].split("&")[4]
    console.log(psflag);
    console.log(xbflag);
    console.log(swflag);
    console.log("xb flagiing input"+xbflag)
    
    if(xbflag=="clicked"){
        for(var i=0; i<newkeyword.length; i++ ){
            
             for(var j=0; j<global.titleListXb.length; j++){
                
                 if(global.titleListXb[j].indexOf(newkeyword[i])>=0){

                    console.log("xb 일치한다"+global.titleListXb[j])
                    var flaging=false;
                    console.log(global.noNm);
                    
                    //   for(var i=0; i<newkeyword.length; i++ ){
                      if(global.noNm.length>0){
                          console.log("XB "+global.noNm[0]);
                          
                          global.noNm[name].forEach(function(element) {
                            console.log("XB routinesssssssssssssssssssssssssssssss"+element);
                            if(element==global.postNmxb[j]){
                                console.log("XB 금지므로 발송안함")
                                                  flaging=true;
                              }
                        }, this);
                      }
                     
                      console.log("xb 일치한다"+flaging)
                      if(!flaging){
                        var message = { 
                                  //2192c71b-49b9-4fe1-bee8-25617d89b4e8
                                  app_id: "3ccd720d-dd44-41dd-9a72-3224fe45d756",
                                  contents: {"en": "클릭하면, 상세내용으로 이동합니다."},
                                  headings : {"en":global.titleListXb[j]},
                                  // subtitle : {"en":"this is subtitle"},
                                  data: {"datas":global.linkUrlXb[j]},
                                  include_player_ids: [name]
                              };
            
                              console.log(tokenId+"PPPPPPPPPPPPPPPPPPPPPPPPringfting");
                             
            
                              let today = new Date();
                              let dd;
                              let day;
                              let month;
                              
                               dd = today.getDate();
                              var mm = today.getMonth()+1; //January is 0!
                              var yyyy = today.getFullYear();
                             var time=new Date().toLocaleTimeString('en-US', { hour12: false,hour: "numeric",minute: "numeric",second:"numeric"});
                              dd<10?day='0'+dd:day=''+dd;
                              mm<10?month='0'+mm:month=''+mm;
                              var minute=time.minute
                              
                             
                              var d = new Date();
                              var hour = d.getHours();
                              var n = d.getMinutes();
                              var s = d.getSeconds();
                              console.log("이번 포트느는 네임 : "+global.noNm[name]);
                              console.log("name to filtering"+global.nicknameXb[j]);
                              global.noNm[name].forEach(function(element) {
                                console.log("name routinesssssssssssssssssssssssssssssss"+element);
                                if(element==global.nicknameXb[j]){
                                          console.log(global.nickname[j]+"금지 일치므로 발소안함")
                                                            flaging=true;
                                        }
                            }, this);

                            console.log("xb sending flag :"+flaging);
                            if(!flaging){
                                sendNotification(message);
                                let  postData = {
                                    title:global.titleListXb[j],
                                    time : month+"월"+day+"일"+hour+"시"+n+"분"+s+"초",
                                    nickname : global.nicknameXb[j],
                                    link : global.linkUrlXb[j],
                                    flag : "xb",
                                    postNm:global.postNmxb[j]
                                 };
                                 firebase.database().ref(`profile/`+id+"/list").push(postData, error => {
                                     if (error) {
                                         console.log("eeeeeeeeeeeeeeeeee"+error)
                                       // Log error to external service, e.g. Sentry
                                     } else {
                                         console.log("successsssssss")
                                     }
                                   });
                            }
                                         

                      }
                //  
                
                 }
             }
           }
    }

             
            }
        global.titleListXb=[];
        global.linkUrlXb=[];
        global.nicknameXb=[];
        
    });
   
}

function receivingPs(tokenId){
     var targetUrl = 'http://market.ruliweb.com/list.htm?table=market_ps';
    request(targetUrl,function(error,response,body){
        var $ = jQuery = cheerio.load(body);
    
        console.log("request come"+tokenId);
      
        $('#ruliboard_list').each(function(item){
            var region = $(this).find('.market_kind').text().trim();
            var flag =  $(this).find('.market_place').text().trim();

            var title =  $(this).find('.market_subject').text().trim();
            var atag = $(this).find('.market_subject').find('a').attr('href');
            
            var date = $(this).find('.market_date').text().trim();
            var dataAValue = globalData.dataA;

            var nickname = $(this).find('.market_nick').text().trim();

            var postNm = $(this).find('.market_num').text().trim();
            global.linkUrl.push(atag);
            global.nickname.push(nickname)
            global.titleList.push(title);
            global.postNm.push(postNm);


           
            console.log(title)
        })

console.log("request ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
console.log(global.hash);
console.log(global.noNm);
console.log(global.noTitle);
console.log(tokenId)
var sum = "";
         


for(name in global.hash){
    console.log("ps name is : "+name);


    console.log(global.hash[name]);

    var newkeyword=[];
    var id = global.hash[name].split("&")[1]
    


     console.log(global.hash[name]);
     console.log("ps id isssss : "+id);
     newkeyword =  global.hash[name].split("&")[0].split('/');
     var psflag = global.hash[name].split("&")[2]
     var xbflag = global.hash[name].split("&")[3]
     var swflag = global.hash[name].split("&")[4]
     console.log(psflag);
     console.log(xbflag);
     console.log(swflag);
     console.log("ps flagiing input")
     for(var i=0; i<global.noNm.length; i++){
        console.log("rrrrroutines : "+global.noNm[i]);
    }
    var aa = global.noNm;
     if(psflag=="clicked"){
         console.log("ps clicked confirmed")
         console.log(newkeyword);
         console.log(global.titleList);
        for(var i=0; i<newkeyword.length; i++ ){
            
             for(var j=0; j<global.titleList.length; j++){
                 if(global.titleList[j].indexOf(newkeyword[i])>=0){
      
      
                    if(newkeyword[i].length>0){
                        console.log("일치한다??????"+newkeyword[i]+"///"+global.titleList[j])
                        console.log("ps nickname is : "+global.nickname[j]);
                        console.log(name);
                        var message = { 
                            //2192c71b-49b9-4fe1-bee8-25617d89b4e8
                            app_id: "3ccd720d-dd44-41dd-9a72-3224fe45d756",
                            contents: {"en": "클릭하면, 상세내용으로 이동합니다."},
                            headings : {"en":global.titleList[j]},
                            // subtitle : {"en":"this is subtitle"},
                            data: {"datas":global.linkUrl[j]},
                            include_player_ids: [name]
                        };
            
            
                        var flaging=false;
                        console.log("ps gggglobal no name");
                        
                        console.log(global.noNm[0]);
                        console.log(global.nickname[j]);
                        console.log("이번 포트느는 네임 : "+global.noNm[name]);
                        global.noNm[name].forEach(function(element) {
                          console.log("name routinesssssssssssssssssssssssssssssss"+element);
                          if(element==global.nickname[j]){
                                    console.log(global.nickname[j]+"금지 일치므로 발소안함")
                                                      flaging=true;
                                  }
                      }, this);
                  
                        
                       
                        console.log("1111일치한다"+flaging)
                        if(!flaging){
                          console.log(tokenId+"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjPPPPPPPPPPPPPPPPPPPPPPPPringfting");
                          sendNotification(message);
                          let today = new Date();
                          let dd;
                          let day;
                          let month;
                           dd = today.getDate();
                          var mm = today.getMonth()+1; //January is 0!
                          var yyyy = today.getFullYear();
                         var time=new Date().toLocaleTimeString('en-US', { hour12: false,hour: "numeric",minute: "numeric",second:"numeric"});
                          dd<10?day='0'+dd:day=''+dd;
                          mm<10?month='0'+mm:month=''+mm;
                          var minute=time.minute
                          
                         
                          var d = new Date();
                          var hour = d.getHours();
                          var n = d.getMinutes();
                          var s = d.getSeconds();
                     
                              let  postData = {
                                  title:global.titleList[j],
                                  time : month+"월"+day+"일"+hour+"시"+n+"분"+s+"초",
                                  nickname : global.nickname[j],
                                  link : global.linkUrl[j],
                                  flag : "ps",
                                  postNm : global.postNm[j]
                              };
                              firebase.database().ref(`profile/`+id+"/list").push(postData, error => {
                                  if (error) {
                                      console.log("eeeeeeeeeeeeeeeeee"+error)
                                      // Log error to external service, e.g. Sentry
                                  } else {
                                      console.log("successsssssss")
                                  }
                                  });
                        }
                           
                        console.log("일치한다")
            
                      
                    }
                 
                
               
                 }
             }
           }
     }
    
     

}
          

        


        global.titleList=[];
        global.linkUrl=[];
        global.nickname=[];
      
    })
}
function intervalFunc() {
    console.log('Cant stop me nowd!');


    //\u0026
    //market.ruliweb.com/read.htm?table=market_ps&page=1&num=4475931&find=&text=
   
    
    


    
    var ref= firebase.database().ref().child("profile")
    
 global.hash={};
 global.noNm={};
 global.noTitle={};
        global.stringList=[];
        var titleListdes=[];
        var nicknameListdes=[];
    ref.once('value',function(snapshot){
       
        var arr = snapshot.val();
        var arr2 = Object.keys(arr);
        var arr3 = Object.keys(arr);
        var key = arr2[0];
        var value = arr3[1];
       
        var tokenId;
        var ps;
        var xb;
        var sw;
        var id;

        var flag;
        snapshot.forEach(function(child) {

            ps="no_clicked";
            xb="no_clicked";
            sw="no_clicked";
            ds="no_clicked";
            psp = "no_clicked";
            titlee="";
            nickk="";
            titleListdes=[];
            nicknameListdes=[];
            child.forEach(function(childs){

                flag=false;
                
                console.log(childs.key);
                console.log(childs.val())
                if(childs.key=="id"){
                    id=childs.val();
                }
                if(childs.key=="ps"){
                    console.log("pssssssssssss "+childs.val());
                    ps=childs.val();
                   
                }
                if(childs.key=="xb"){
                   
                    console.log("xbbbb "+childs.val());
                    xb=childs.val();
                    
                    // global.hash[tokenId] = global.stringList+"&"+id+"&"+ps+"&"+xb+"&"+sw
                }
                if(childs.key=="sw"){
                    console.log("sw  "+childs.val());
                    sw=childs.val();
                }

                if(childs.key=="ds"){
                    console.log("ds  "+childs.val());
                    ds=childs.val();
                }


                if(childs.key=="psp"){
                    console.log("psp  "+childs.val());
                    psp=childs.val();
                }
                
                if(childs.key=="list"){
                    var flag = false;
                    childs.forEach(function(childss) {
                        var nicknamedes="";
                        var titledes="sdsd";
                        
                        childss.forEach(function(childsss){
                                if(childsss.key=="nickname"){
                                    console.log("nicknamedes 에 넣는다"+childsss.val());
                                   
                                    nicknamedes=childsss.val();
                                    // console.log("this is nick!!!"+nickname);
                                }
                                if(childsss.key=="title"){
                                    console.log("titleListdes 에 넣는다"+childsss.val());
                                   titledes=childsss.val();
                                   console.log(childsss.val());
                                   console.log("title is : "+titledes);


                                   console.log("flag test2222"+flag);
                                    // console.log("this is title!????!!"+titledes);
                                    // console.log("flag is : "+flag);
                                    // if(flag){
                                    //     console.log("nick and title put"+nickname+"///"+titledes)
                                    //     global.noNm[tokenId].push(nickname);
                                    //     global.noTitle[tokenId].push(titledes);
                                    // }
                                }
                            
                            if(childsss.key=="postNm"){
                            }
                            if(childsss.key=="noalarm"){
                                flag=true;
                                console.log("noalarm!!!!"+nicknamedes+"///titleee : "+titledes);
                                nicknameListdes.push(nicknamedes);
                                titleListdes.push(titledes);
                               console.log("title and nickname is ")
                               console.log(titleListdes);
                               console.log(nicknameListdes);
                               console.log("flag test : "+flag);
                                
                            }
                            console.log("childsssss end!"+childsss.key);
                            
                        })
                    })
                    console.log("global no Title and Nickname");
                    // global.noNm=Array.from(new Set(global.noNm))
                    // global.noTitle=Array.from(new Set(global.noTitle))
                    console.log("global no Title and Nickname22222");
                }
                if(childs.key=="tokenId"){
                    

                   
                    tokenId=childs.val();
                    console.log("tokenstarttttttttttttt"+tokenId);
                    console.log(global.hash);
                    console.log(global.noNm);
                    console.log(global.noTitle);
                  
                    
                    console.log("flag is des : "+flag);
                    global.hash[tokenId] = global.stringList
                    //"&"+id+"&"+ps+"&"+xb+"&"+sw
                        global.noTitle[tokenId]=titleListdes;
                        global.noNm[tokenId]=nicknameListdes;
                   
                    console.log(global.hash[tokenId]); 
                    console.log("checked")
    
console.log("ps result"+ps)
console.log("xb result"+xb);
console.log("sw result"+ sw);
console.log("psp result"+psp);
console.log("ds result"+ ds);
                    console.log(id)
                                        console.log(global.hash[childs.val()])
                                    }
                if(childs.key=="keyword"){

                    global.stringList=childs.val();

                    
                }
                

             
            })
            global.hash[tokenId] = global.hash[tokenId]+"&"+id+"&"+ps+"&"+xb+"&"+sw+"&"+ds+"&"+psp
            
            console.log(global.hash[tokenId])
            console.log(global.noTitle[tokenId]);
            console.log(global.noNm[tokenId]);
            console.log("child end des !!!!!!!!!!!")
            console.log(global.hash)
            console.log(global.noTitle);
            console.log(global.noNm);
          console.log("pssssss result"+ps)
          console.log("xbssssssss result"+xb);
          console.log("swsssssssssss result"+ sw);
            
          });

          
          receivingPs(tokenId);
          receivingXb(tokenId);
          receivingSw(tokenId);
          receivingPsp(tokenId);
          receivingDs(tokenId);



        //   if(ps=="clicked"){
        //     console.log("flag test ps")
        //     console.log(id);
        //     console.log("request ps "+tokenId)
        //     receivingPs(tokenId);
        // }
        // if(xb=="clicked"){
        //     console.log("flag test xb")
        //     console.log(id);
        //     console.log("request xb ")
        //     receivingXb(tokenId);
        // }
        // if(sw=="clicked"){
        //     receivingSw(tokenId);
        // }
        // 

       
    })


  }
app.get('/',function(req,res){
    console.log("today88");
    

    
    // var config = url.parse(mqtt_url);
    // config.topic=topic;
    // res.render('index',{
    //     connected:client.connected,
    //     config:config
    // })s
    // today.setHours(today.getHours());
    // alert(today);
    
    



res.type('text/plain');
res.send('8888888');


    
});
var sendNotification = function(data) {
    console.log("sendNotification");

    console.log(data)
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic ZmUyNWZmMTAtZGExNy00N2IyLTg3MWYtNzM4MzhmMTNjMGQz"
    };
    
    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
      };
      
      var https = require('https');
      var req = https.request(options, function(res) {  
        res.on('data', function(data) {
          console.log("Response:");
          console.log(JSON.parse(data));
        });
      });
      
      req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
      });
      
      req.write(JSON.stringify(data));
      req.end();
    };
  
 

app.get('/getTemperature',function(req,res){
    console.log(req.query.temp);
    console.log(req.query.hum);
    res.type('text/plain');
    res.send("gettemp!");
    var today = new Date();
    today.setHours(today.getHours()+9);


    // var messageRef= ref.child("kotran");
    // var message = {temp:req.query.temp,hum:req.query.hum, updatedtimestamp: today};
    // messageRef.update(message).then(()=>{
    //     console.log("success");
    // }).catch((err)=>{
    //     console.log("error"+err);
    // });

})
app.get('/turnon',function(req,res){
    console.log("bothtttttt");
    console.log(req.query.id);
    console.log(req.query.led);
    console.log(req.query.ip);
    // led=req.query.led;
    // res.type('text/plain');
    // res.send("both!");

    // var led=req.query.led;
    // if(led=="on"){
        
    //     client.publish('/ESP8266/Test', 'LED set to ON/kotran', function() {
    //         console.log("MMMessage is published to on");
    //     });
    //     //포트포워딩한 외부 ip에게 보낸다. http request get to 121.138.12.9:8080/on
        
    // }else{
    //     client.publish('/ESP8266/Test', 'LED set to OFF/kotran', function() {
    //         console.log("MMMessage is published to off");
    //     });
    //     //포트포워딩한 외부 ip에게 보낸다. http request get to 121.138.12.9:8080/on
    // }
    // client.on('connect', function() { // When connected
    //     console.log('cccccccc!!!!');
    //     console.log("led : "+led);
    //     // subscribe to a topic
       
    //     
     
    //   });

    
    
    

})
app.get('/save/:num',function(req,res){

    
    // console.log("save..");
	// console.log(req.params.num);
	// res.type('text/plain');
    // res.send('save '+req.params.num);
    // var today = new Date();
    // alert(today);
    // today.setHours(today.getHours()+9);
    // alert(today);
    // var message = {number:req.params.num, timestamp: today };
    
    // var messageRef= ref.child('messages');
    // var messageRef = messageRef.push(message);
    // var payload = {
    //     'logKey' : messageRef.key,
    //     'some/other/path':'hello world2'
    // }
    // ref.update(payload);
    // logsRef.child(messageRef.key).set(message);
    // logsRef.child('count').transaction(function(i){
    //     return i+1;
    // })
})
app.get('/view/:seq',function(req,res){
	console.log("viewing..");
	console.log(req.params.seq);
	res.type('text/plain');
	res.send('views '+req.params.seq);


})
app.get('/about',function(req,res){
	console.log("abouttt");
	res.type('text/plain');
	res.send('about');
});

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
var server = app.listen(process.env.PORT || 13145, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
    intervalFunc();
    
        setInterval(intervalFunc, 1000*60*30);
  });
