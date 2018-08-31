
'use strict';
const rrequest = require('request');

const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const uuidv4 = require('uuid/v4');
const admin = require('firebase-admin');
const https = require('https');
const app = dialogflow({debug: true});
admin.initializeApp(functions.config().firebase);

var phoneKey="basic";
var database = admin.database();
var pv="";

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
exports.yourAction = functions.https.onRequest(app);
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  

  function fallback (agent) {
      console.log("came to fallback");
      //Default fall back 으로, 최초 실행시 여기로 온다. 
      
      

    //   console.log("fallback")
    //   let conv = agent.conv(); // Get Actions on Google library conv instance
     
    //  console.log(conv.body.queryResult)
     
    // console.log("permanent value in : "+conv.body.queryResult.parameters)
      
    // agent.add(`I didn't understand`);
    // agent.add(`I'm sorry, can you try again?`);
   
    let conv = agent.conv(); // Get Actions on Google library conv instance
     
      
    //  console.log(conv)
    //  console.log(conv.body.queryResult.parameters)
     console.log("get parameter welllllllll ")
   
    //  console.log("get parameter well2 ")
    //  console.log(conv.contexts)
    //  console.log(conv.user);
    
      var flag =false;
      var deviceflag=false;
      var v="";
      console.log("permanent value :"+pv);
      console.log("google voice id is : "+conv.user.id);
       agent.add(`안녕하세요?`);
      return database.ref('clients/').once('value').then((snap)=>{
          console.log(snap.val());
          var values=snap.val();
        
        
          var va="";
          for (let val in values) 
            {
                console.log("printing value and val");
                console.log(values);
                console.log(val);
                phoneKey=val;
                
                if(values[val].googlevoice==conv.user.id){
                    console.log("google voice id matched ");
                      console.log("key is  value issssssskkk : ");
                     console.log("registered phonekey is :"+phoneKey);
                      
                    //구글 보이스 아이디가 매칭되면 그것을 가지고,
                    flag=true;
                    va=val;
                    v=values[val].googlevoice;
                }
               
            }
            if(flag){
               //여기에서 제안을 통해서 조작가능한 디바이스를 보여준다.
                
                console.log("google voice id :"+v);
                console.log(values[va].hub)
                var valuee="";
                for(let vv in values[va].hub){
                    deviceflag=true;
                    console.log("each valuee :"+values[va].hub[vv].deviceName);
                    valuee=values[va].hub[vv].deviceName;
                     agent.add(new Suggestion(values[va].hub[vv].deviceName+" 켜기"));
                     agent.add(new Suggestion(values[va].hub[vv].deviceName+" 끄기"));
                }
                if(!deviceflag){
                    agent.add("등록된 디바이스가 없네요!");
                }else{
                   
                }
                 
                
            }else{
                agent.add("처음 로그인하셨네요. 공유코드를 입력해주세요");
                
                
            }
            
      })
    
    
    
    
    
    
  }
  function KeyValue(agent){
      console.log("KeyValue")
      var flag=false;
      var phoneKeyArray=[];
      var phoneKey="";
         
      var val="";
     let conv = agent.conv(); // Get Actions on Google library conv instance
     
     //  console.log(conv)
     console.log("permanent value in : "+conv.body.queryResult.parameters.number)
     console.log("looooooque entras is : "+conv.body.queryResult);
     console.log("entered value is ");
     console.log(conv.body.queryResult.queryText);
     pv=conv.body.queryResult.parameters.number;
      console.log(conv.body.queryResult.parameters.number)
      console.log("ggggget parameter well ")
     
      console.log("ggggget parameter well2 ")
      console.log(conv.contexts)
      console.log(conv.user);
       console.log(conv.user.id);

       
       return database.ref('clients/').once('value').then((snap)=>{
        console.log(snap.val());
        var values=snap.val();
      
      
       
        var va="";
        for (let val in values) 
          {
              console.log("printing phoneKey and shareCode");
             
              console.log(values[val].shareCode);
              console.log(conv.body.queryResult.parameters.number);
              if(values[val].shareCode==conv.body.queryResult.queryText){
                console.log("shareCode this to array : "+values[val].shareCode);
                console.log("일치하는것 존재!!!!");
                console.log("phoneKey is : "+val);
                phoneKey=val;
                va=val;
                flag=true;
              }
            
          }

          console.log("flag is : "+flag);
          if(flag){
            //여기에서 제안을 통해서 조작가능한 디바이스를 보여준다.
             
             console.log("hub list : "+values[va].hub)
             
             return database.ref('clients/'+phoneKey).update({
                    
                    googlevoice:conv.user.id
                }).then(()=>{
                    
                        console.log("success"+phoneKey);
                    
                           return database.ref('clients/'+phoneKey+"/hub").once('value').then((snap)=>{
                            var values=snap.val();
                           
                            var count=0;
                           
                                for (let val in values) 
                            {
                            
                                count++;
                                console.log(val+"????"+values)
                                if(values[val].deviceName==undefined||values[val].deviceName==null){
                                    console.log("result is ?????");
                                    console.log(values[val])
                                    agent.add("등록된 기기가 없습니다. 앱에서 등록해주세요")
                                }else{
                                    console.log("count is : "+count);
                                    if(count==1){
                                        agent.add("현재 등록된 기기를 조작합니다.")
                                    }
                                    agent.add(new Suggestion(values[val].deviceName+"켜기"));
                                    agent.add(new Suggestion(values[val].deviceName+"끄기"));
                                }
                                
                            }
                            

                            
                        
                    })
                        
                        
                    }).catch((err)=>{
                        console.log("error"+err);
                        agent.add("등록된 기기가 없습니다 앱에서 등록해주세요. ");
                    });
            
              
             
         }else{
             agent.add("올바른 공유코드를 입력해주세요.");
             
             
         }
        //   if(flag){
    
        //    console.log("gogogogogogogogogogogogogogogogogo"+phoneKey);
    
        //                      database.ref('clients/'+phoneKey).update({
                    
        //                         googlevoice:conv.user.id
        //                     }).then(()=>{
        //                             console.log("success");
                                
        //                              database.ref('clients/'+phoneKey+"/hub").once('value').then((snap)=>{
        //                                 console.log(snap.val());
        //                                 var values=snap.val();
                                       
        //                                 for (let val in values) 
        //                                 {
                                        
        //                                     console.log(val+"????"+values)
        //                                     console.log(values[val].title)
        //                                     agent.add(new Suggestion(values[val].deviceName));
                                        
        //                                 }
                                        
                                    
        //                         })
                                    
                                    
        //                         }).catch((err)=>{
        //                             console.log("error"+err);
        //                             agent.add("실패하였습니다. ");
        //                         });
        //   }else{
    
        //     agent.add("잘못입력하였습니다. 코드를 확인해주세요.")
        //   }




        });
    
        
     
      //입력한 공유코드가 실제로 디비에 존재하는지 검증. 
      

      


     
  }
  function on(agent){
      console.log("come to on");
      let conv = agent.conv();
      conv.close();
      app.intent('finishC', (conv) => {
                        console.log("finishCCCCCC")
                      conv.close('안녕');
                      // Complete your fulfillment logic and
                      // send a response when the function is done executing
                    });
                    
      var query=conv.body.queryResult.queryText
     
         console.log(conv.body.queryResult.outputContexts[0])
         console.log("result : "+conv.body.queryResult.outputContexts[0].parameters);
         console.log("result : "+conv.body.queryResult.outputContexts[0].parameters.ON.original);
         
            var str= JSON.stringify(conv.body.queryResult.outputContexts[0].parameters);
          console.log("str is : "+str);
          var res = str.split(",");
    console.log(res);
    var last=res[0].split(":");
   console.log(last);
    var llast=last[1].split(",");
    console.log(llast)
   
    var lasting=llast.toString().substring(1,llast.toString().length-1);
    console.log(lasting);
     var aba= query.split(lasting.substring(0));
     
      console.log(aba[0]+"////"+aba[1]);
      
      console.log(aba[0].trim());
      console.log(aba[0].length);
      var pressedDevicee=aba[0].trim();
      var pressedDevice=pressedDevicee.replace(/\s/g, '')
      console.log(aba[0].trim().length);
      console.log(pressedDevice+"tttttttttttturning onnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn ");
      
                
                var flagg=false;
                 var deviceflag=false;
      var v="";
                return database.ref('clients/').once('value').then((snap)=>{
          console.log(snap.val());
          var values=snap.val();
        
        
          var va="";
         
          for (let val in values) 
            {
             
                if(values[val].googlevoice==conv.user.id){
                
                     console.log("registered phonekey is :"+phoneKey);
                      va=val;
                    //구글 보이스 아이디가 매칭되면 그것을 가지고,
                    flagg=true;
                  
                }
               
            }
            if(flagg){
              //여기에서 제안을 통해서 조작가능한 디바이스를 보여준다.
                 agent.add("불을 켭니다");
                console.log(values[va].hub)
                var valuee="";
                
                var count=0;
                for(let vv in values[va].hub){
                    
                    console.log(values[va].hub[vv].deviceName);
                    console.log(pressedDevice);
                    count++;
                   
                        if(pressedDevice.trim().length==0||pressedDevice.trim()=="불"){
                             if(count==1){
                            console.log(count+"??????????????????????????????????????????????????????????????????"+vv)
                                     rrequest("https://onandoff.herokuapp.com/pressedTest?hubId="+vv, (err, res, body) => {
                                  if (err) { return console.log(err); }
                                  console.log(body);
                                });
                                //   agent.intent('finishC', (conv) => {
                                //       conv.close(`Okay, let's try this again later.`);
                                //     });
                             }
                        }
                    
                    if(values[va].hub[vv].deviceName==pressedDevice){
                        console.log("pppppppppppppppppppppppppppppressed device unique id :"+vv);
                       rrequest("https://onandoff.herokuapp.com/pressedTest?hubId="+vv, (err, res, body) => {
                  if (err) { return console.log(err); }
                  console.log(body);
                });
                    
                      
                    }else{
                        
                         var res = str.split(values[va].hub[vv].deviceName);
                        var name = str.split(res[0]);
                        
                        console.log(name[1]);
                        console.log(pressedDevice.length);
                        console.log(pressedDevice);
                        console.log("printinginformation");
                        console.log(pressedDevice.length===0);
                        console.log("result shown");
                        if(pressedDevice.legnth===0){
                            console.log("is zero");
                        }else if(pressedDevice.length!==0){
                            console.log("is not zero find");
                            console.log(pressedDevice.length);
                            agent.add(pressedDevice+"를 찾을수없습니니다.");
                        }
                    }
                       deviceflag=true;
                    valuee=values[va].hub[vv].deviceName;
                     agent.add(new Suggestion(values[va].hub[vv].deviceName+" 켜기"));
                     agent.add(new Suggestion(values[va].hub[vv].deviceName+" 끄기"));
                }
                count=0;
                if(!deviceflag){
                    agent.add("등록된 디바이스가 없네요!");
                }else{
                  
                  
                }
                 
                
            }else{
                agent.add("처음 로그인하셨네요. 고객코드를 입력해주세요");
                
                
            }
            
      })
  }
  function off(agent){
       let conv = agent.conv();
        var query=conv.body.queryResult.queryText
      console.log("turning offfffffffffffffffffffffffffffffffff ");
      
         console.log(conv.body.queryResult.outputContexts[0])
          console.log(conv.body.queryResult.outputContexts[0].parameters)
          
          var str= JSON.stringify(conv.body.queryResult.outputContexts[0].parameters);
          console.log("str is : "+str);
          var res = str.split(",");
    console.log(res);
    var last=res[0].split(":");
   console.log(last);
    var llast=last[1].split(",");
    console.log(llast)
   
    var lasting=llast.toString().substring(1,llast.toString().length-1);
    console.log(lasting);
    
    var aba= query.split(lasting.substring(0));
      console.log(aba[0]+"////"+aba[1]);
      console.log(aba[0].trim());
      console.log(aba[0].length);
      var pressedDevicee=aba[0].trim();
      var pressedDevice=pressedDevicee.replace(/\s/g, '')
      console.log(aba[0].trim().length);
      console.log(pressedDevice+"tttttttttttturning onnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn ");
        //   var param=conv.body.queryResult.outputContexts[0].parameters;
        //  var original= param.split(',');
        //  var original_value=original.split(':');
        //  console.log("offfff"+original_value);
        //   console.log(conv.body.queryResult.outputContexts[0].parameters.OFF.original)
    //   rrequest("https://onandoff.herokuapp.com/pressedTestOff?hubId=015EF", (err, res, body) => {
    //               if (err) { return console.log(err); }
    //               console.log(body);
    //             });
                
                
                var flagg=false;
                 var deviceflag=false;
      var v="";
                return database.ref('clients/').once('value').then((snap)=>{
          console.log(snap.val());
          var values=snap.val();
        
        
          var va="";
         
          for (let val in values) 
            {
             
                if(values[val].googlevoice==conv.user.id){
                    console.log("google voice id matched ");
                      console.log("key is  value issssssskkk : ");
                     console.log("registered phonekey is :"+phoneKey);
                      va=val;
                    //구글 보이스 아이디가 매칭되면 그것을 가지고,
                    flagg=true;
                  
                }
               
            }
          if(flagg){
              //여기에서 제안을 통해서 조작가능한 디바이스를 보여준다.
                agent.add("불을 끕니다.");
                console.log(values[va].hub)
                var valuee="";
                var count=0;
                for(let vv in values[va].hub){
                    
                    
                    count++;
                     if(pressedDevice.trim().length==0||pressedDevice.trim()=="불"){
                             if(count==1){
                            console.log(count+"??????????????????????????????????????????????????????????????????"+vv)
                                     rrequest("https://onandoff.herokuapp.com/pressedTestOff?hubId="+vv, (err, res, body) => {
                                  if (err) { return console.log(err); }
                                  console.log(body);
                                });
                                  conv.close();
                             }
                        }
                    console.log(pressedDevice);
                     if(values[va].hub[vv].deviceName==pressedDevice){
                        console.log("pppppppppppppppppppppppppppppressed device unique id :"+vv);
                      rrequest("https://onandoff.herokuapp.com/pressedTestOff?hubId="+vv, (err, res, body) => {
                  if (err) { return console.log(err); }
                  console.log(body);
                });
                      
                    }else{
                        
                        console.log(pressedDevice.length);
                        console.log(pressedDevice);
                        console.log("printinginformation");
                        console.log(pressedDevice.length===0);
                        console.log("result shown");
                        if(pressedDevice.legnth===0){
                            console.log("is zero");
                        }else if(pressedDevice.length!==0){
                            console.log("is not zero find");
                            console.log(pressedDevice==="불");
                            console.log(pressedDevice!=="불");
                            if(pressedDevice!=="불"){
                                console.log(pressedDevice.length);
                                agent.add(pressedDevice+"를 찾을수없습니니다.");
                            }
                            
                        }
                        
                    }
                    deviceflag=true;
                    
                    
                    console.log("each valueeeeeeeeeeeeeeooooooooofffffffffffe :"+values[va].hub[vv].deviceName);
                    valuee=values[va].hub[vv].deviceName;
                     agent.add(new Suggestion(values[va].hub[vv].deviceName+" 켜기"));
                     agent.add(new Suggestion(values[va].hub[vv].deviceName+" 끄기"));
                }
                count=0;
                if(!deviceflag){
                    agent.add("등록된 디바이스가 없네요!");
                }else{
                    conv.close();
                }
                 
                
            }else{
                agent.add("처음 로그인하셨네요. 고객코드를 입력해주세요");
                
                
            }
            
      })
  }
  function device (agent) {
      
      console.log("Permananet value "+pv);
      
      console.log(agent)
      console.log("device presssed!");
    //  
     let conv = agent.conv();
    if(conv===null){
        agent.add("failed")
    }else{
        // Get Actions on Google library conv instance
     
      
    //  console.log(conv)
    //눌러진 것(말해진것)
    console.log(conv.body.queryResult.queryText)
    //입력한것은 위의 것. 
     var query=conv.body.queryResult.queryText
     var onoroff="";
     var trueorno=query.indexOf("켜");
     console.log(trueorno);
     var trueorno2=query.indexOf("꺼");
     console.log(trueorno2);
     if(trueorno!=-1){
         onoroff="on";
     }else{
         onoroff="off";
     }
      var aba= query.split("켜");
      console.log(aba[0]+"////"+aba[1]);
      console.log(aba[0].trim());
      console.log(aba[0].trim().length);
    console.log("device queryResult end hereeeeeeeeee");
      console.log(conv.body.queryResult.outputContexts)
    console.log(conv.body.queryResult.outputContexts[0])
    //
   
  console.log("pppppphone Key issssss : ");
   
    var flagging=false;
     console.log(conv.body.queryResult.outputContexts[0].parameters)
     
     
     
      return database.ref('clients/').once('value').then((snap)=>{
          console.log(snap.val());
          var values=snap.val();
        
        
         
          for (let val in values) 
            {
                
                phoneKey=val;
                if(values[val].googlevoice==conv.user.id){
                   
                    //구글 보이스 아이디가 매칭되면 그것을 가지고,
                    
                    
                    
                     return database.ref('clients/'+phoneKey+'/hub').once('value').then((snap)=>{
                      console.log(snap.val());
                      var values=snap.val();
                     
                     console.log("device key value is : "+val);
                     for (let val in values) 
                            {
                               
                               if(aba[0].trim()==values[val].deviceName){
                                   
     
     if(onoroff=="on"){
         agent.add("켭니다");
     }else{
           agent.add("끕니다");
     }
                                    console.log("ppppppppppressed device unique id :"+val);
                                    if(onoroff=="on"){
                                                 rrequest("https://onandoff.herokuapp.com/pressedTest?hubId="+val, (err, res, body) => {
                                              if (err) { return console.log(err); }
                                              console.log(body);
                                            });
                                    }else{
                                        rrequest("https://onandoff.herokuapp.com/pressedTestOff?hubId="+val, (err, res, body) => {
                                          if (err) { return console.log(err); }
                                          console.log(body);
                                        });
                                    }
                               }
                              
                                 agent.add(new Suggestion(values[val].deviceName+" 켜기"));
                                agent.add(new Suggestion(values[val].deviceName+" 끄기"));
                               
                                
                              
                            }
                         
                            
                      })
                   
                }
               
            }
           
            
      })
     
     
     
    //
    }
      
  }
  function finishC(agent){
      console.log("finishing C come!");
      let conv = agent.conv();
      conv.close();
  }
  function languagedes (agent) {
    agent.add(`this is language`);
    agent.add(`This message is from Dialogflow's Cloud Functions for Firebase inline editor!`);
    
   
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
   function yourFunctionHandler(agent) {
       
     agent.add(`This message is from Dialogflow's Cloud Functions for Firebase inline editor!`);
     agent.add(new Card({
         title: `Title: this is a card title`,
         imageUrl: 'https://dialogflow.com/images/api_home_laptop.svg',
         text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
         buttonText: 'This is a button',
         buttonUrl: 'https://docs.dialogflow.com/'
       })
     );
    
     agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
   }

function testing(agent){
    console.log("come!")
    agent.add("listing");
}
  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
   function googleAssistantHandler(agent) {
      var value = uuidv4();
      
    //   setTimeout(function() {
    //       testing(agent);
    //     }, 2000);
      
//      agent.add(new Card({
//          title: `Title: this is a card title`,
//          imageUrl: 'https://dialogflow.com/images/api_home_laptop.svg',
//          text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
//          buttonText: 'This is a button',
//          buttonUrl: 'https://docs.dialogflow.com/'
//       })
//      );

   let conv = agent.conv();
    console.log(conv.body.queryResult.parameters)
     
//      let conv = agent.conv(); // Get Actions on Google library conv instance
     
      
//     //  console.log(conv)
//      console.log(conv.body.queryResult.parameters)
//      console.log("get parameter well ")
//      console.log(value)
//      console.log("get parameter well2 ")
//      console.log(conv.contexts)
//      console.log(conv.user);
//       console.log(conv.user.id);
//       database.ref('clients/356356080859149').update({
   
//     googlevoice:conv.user.id
//   });
console.log(pv);
  agent.add("아래와 같은 기기가 등록되어있습니다");
  return database.ref('clients/'+pv+'/devices').once('value').then((snap)=>{
      console.log(snap.val());
      var values=snap.val();
     
     
     for (let val in values) 
            {
               
                console.log(val+"????"+values)
                console.log(values[val].title)
                agent.add(new Suggestion(values[val].title));
               
            }
  })
   
//       const data = conv.user.userId;
//       console.log("data is : "+data);
// let userId;
// console.log(conv.user)
//       if (userId in conv.user.storage) {
//           console.log("not generating");
//           userId = conv.user.storage.userId;
//         } else {
//             console.log("generating");
//           // generateUUID is your function to generate ids.
//           userId = value;
//           conv.user.storage.userId = userId
//           console.log(userId);
//           console.log(conv.user.storage.userId)
//         }
        
//         console.log("below is id permanent");
//         console.log(conv.user.storage.userId)
     
     
     
    //  conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
    //   agent.add(new Suggestion(`haha`));
    //  agent.add(new Suggestion(`ha`));
    //  agent.add(conv); // Add Actions on Google library responses to your agent's response
    
    //  if (language) {
        // conv.ask(`Wow! I didn't know you knew`);
        // conv.contexts.set('Languages-followup', 2, {language: language})
      
   }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', fallback);
  intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('KeyValue', KeyValue);
    intentMap.set('device', device);
    intentMap.set('finishC', finishC);
    intentMap.set('turnOff', off);
      intentMap.set('ON', on);

   intentMap.set('language', googleAssistantHandler);
  // intentMap.set('<INTENT_NAME_HERE>', googleAssistantHandler);
  agent.handleRequest(intentMap);
  
});