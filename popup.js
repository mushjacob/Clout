  window.onload = async function() {
	
	document.getElementById('actText').addEventListener('click', function(e){e.preventDefault()});
	chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        document.getElementById('activate2').addEventListener('click', setFirst);
    }else if(details.reason == "update"){
        //call a function to handle an update
		document.getElementById('activate2').addEventListener('click', setFirst);
    }
	});  
	
	document.getElementById('activate2').addEventListener('click', setFirst);
	normalMode();
	
  };

var toggleSet = 0;
var devices = [];
var locations = [];
var hSize = devices.length;
hSize = hSize * 30 + 110;
var htmlSize = hSize + "px";
console.log("THE SIZE: " + htmlSize);




chrome.runtime.sendMessage({greeting: "AWAKE"},
        function (response) {
            //console.log("RESPONSE IS: " + response.farewell);
		}
);



chrome.runtime.onMessage.addListener( async function(request,sender,sendResponse){
    /*if( request.greeting === "GetURL" )
    {
        var tabURL = "Not set yet";
        chrome.tabs.query({active:true},function(tabs){
            if(tabs.length === 0) {
                sendResponse({});
                return;
            }
            tabURL = tabs[0].url;
            sendResponse( {navURL:tabURL} );
        });        
    }*/
	
	console.log("REQUEST DEVICES: " + request.devices);
	if(request.devices != null) {
				
				if(request.devices.length % 2 == 0) {
					devices = [];
					locations = [];
					for(j = 0; j <= request.devices.length - 2; j+=2){
						devices.push(request.devices[j]);
						locations.push(request.devices[j+1]);
					}
					console.log("THE LOCATIONS: " + locations);
					
					for(i = 0; i<devices.length; i++){
						var locNow = locations[i];
						
						var use1 = document.createElement("LI");
						use1.classList.add("list");
						var use1a = document.createElement("A");
						var str = new String(devices[i]);
						if(str.indexOf("\\") != -1){
							str = str.substring(0,str.indexOf("\\"));
						}
						use1a.innerHTML = str;
						use1a.classList.add("text");
						console.log("LENGTH: " + str.length);
						if(str.length > 13){
							use1a.classList.add("text2");
						}
						use1.appendChild(use1a);
						document.getElementById("list2").appendChild(use1);
						
						var use2 = document.createElement("LI");
						use2.id = "getLI";
						$(use2).data("location", {loc: locNow});
						use2.addEventListener('click', function() {
							var index = $(event.srcElement.parentElement).data("location").loc;
							console.log("PARENT ID: " + event.srcElement.parentElement.id);
							console.log("INDEX: " + index);
							clickToGet(index);
						});
						var use2img = document.createElement("IMG");
						use2img.id = "getIMG";
						use2.appendChild(use2img);
						document.getElementById("getUL").appendChild(use2);
						
						var use3 = document.createElement("LI");
						use3.id = "setLI";
						$(use3).data("location", {loc: locNow});
						use3.addEventListener('click', function(){
							var index = $(event.srcElement.parentElement).data("location").loc;
							console.log("PARENT ID: " + event.srcElement.parentElement.id);
							console.log("INDEX: " + index);
							sendLink(index);
						});
						var use3img = document.createElement("IMG");
						use3img.id = "setIMG";
						use3.appendChild(use3img);
						document.getElementById("setUL").appendChild(use3);
						console.log("LOCATION AT: " + i + " " + locations[i]);
					}
					
					hSize = devices.length;
					hSize = hSize * 30 + 110;
					htmlSize = hSize + "px";
				}
			}
	sendResponse({recieved: "THANK YOU"});
});
  
async function normalMode(){
	var theCheck = await checkFirst();
	var sheetExist = await checkSheetExist();
	console.log("THE CHECK IS: " + theCheck);
	
	if(sheetExist == 0){
		noSheetMode();
	}
	
	if(sheetExist == 2){
		noConnection();
	}
	
	if(theCheck == 1 && sheetExist == 1) {
	document.getElementById("inputFam").style.display = "none";
	document.getElementById("actText2").style.display = "none";
	document.getElementById("noSheet").style.display = "none";
	document.getElementById('activate').style.display = "none";
	document.getElementById('activate2').style.display = "none";
	document.getElementById("leftSide").style.display = "block";
	document.getElementById("lS").style.display = "block";
	document.getElementById("midSide").style.display = "block";
	document.getElementById("midSide").style.animation = "wakeUP 0.5s ease-out";
	document.getElementById("mS").style.display = "block";
	document.getElementById("leftSide").style.animation = "wakeUP 0.5s ease-out";
	document.getElementById("rightSide2").style.display = "block";
	document.getElementById("rS2").style.display = "block";
	document.getElementById("rightSide2").style.animation = "wakeUP 0.5s ease-out";
	document.getElementById("dope").style.backgroundImage = "url('G_Splash6.gif')";
	document.getElementById("dope").style.animation = "wakeUP 0.5s ease-out";
	toggleSet = 0;
	document.getElementById("bar").style.display = "block";
	document.getElementById("bar").style.animation = "wakeUP 0.5s ease-out";
	document.getElementById('bar').addEventListener('click',toggle);
	document.getElementById("devices").style.display = "block";
	document.getElementById("devices").style.animation = "wakeUP 0.5s ease-out";
    document.getElementById('theBigOne').addEventListener('click', function() {
      chrome.identity.getAuthToken({interactive: true}, function(token) {
		  //initSheet(token);
		  
	  }
	  );
    });
	
	document.getElementById("leftSide").addEventListener('click', function(){
		clickToGet(0);
	});
	document.getElementById("rightSide2").addEventListener('click', help);
	document.getElementById("midSide").addEventListener('click', function(){
		sendLink(0);
	});
	//document.getElementById("myButton2").addEventListener('click', theProcess);
	
	}
}	
  

var noSheetM;

function noSheetMode(){
		document.getElementById("lS").style.display = "none";
		document.getElementById("rS").style.display = "none";
		document.getElementById('activate').style.display = "none";
		document.getElementById('activate2').style.display = "none";
		document.getElementById("noSheet").style.display = "block";
		document.getElementById("noSheet").innerHTML = "No connection to phone";
		document.getElementById("dope").style.backgroundImage = "url('G_Load2.gif')";
		document.getElementById("dope").style.animation = "wakeUP 0.5s ease-out";
		//noSheetM = setInterval(noSheetModeWork(), 2000);
		console.log("WE'RE IN NO SHEET MODE");
}


function noConnection(){
		document.getElementById("lS").style.display = "none";
		document.getElementById("rS").style.display = "none";
		document.getElementById('activate').style.display = "none";
		document.getElementById('activate2').style.display = "none";
		document.getElementById("noSheet").style.display = "block";
		document.getElementById("noSheet").innerHTML = "No internet connection";
		document.getElementById("dope").style.backgroundImage = "url('G_Load2.gif')";
		document.getElementById("dope").style.animation = "wakeUP 0.5s ease-out";
		//noSheetM = setInterval(noSheetModeWork(), 2000);
		console.log("WE'RE IN NO CONNECTION MODE");
}

function activationMode(){
		document.getElementById("lS").style.display = "none";
		document.getElementById("rS").style.display = "none";
		document.getElementById('activate').style.display = "block";
		document.getElementById('activate2').style.display = "block";
		document.getElementById("noSheet").style.display = "none";
		document.getElementById("actText").innerHTML = "Activate";
		document.getElementById("dope").style.backgroundImage = "url('G_Load2.gif')";
		document.getElementById("dope").style.animation = "wakeUP 0.5s ease-out";
		document.getElementById('activate2').addEventListener('click', setFirst);
}


/*async function noSheetModeWork(){
	var theSheetStatus = await checkSheetExist();
	
	if(theSheetStatus == 1){
		endNoSheetMode();
		normalMode();
	}
}


function endNoSheetMode(){
	console.log("CLEARING SHEET MODE INTERVAL!");
	clearInterval(noSheetM);
}*/
  
  
//Storage key "firstTime" in namespace "local" changed. Old value was "undefined", new value is "1".

chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
		  if(key == "sheetExist" && storageChange.newValue == 1 && storageChange.oldValue != 1){
			  normalMode();
		  }
			
		  if(key == "sheetExist" && storageChange.newValue == 0 && storageChange.oldValue != 0){
			  noSheetMode();
		  }
		  
		  if(key == "sheetExist" && storageChange.newValue == 2 && storageChange.oldValue != 2){
			  noConnection();
		  }
		  
		  if(key == "firstTime" && storageChange.newValue == 0 && storageChange.oldValue != 0) {
			  activationMode();
		  }
		  
		  if(key == "firstTime" && storageChange.newValue == 1 && storageChange.oldValue != 1) {
			  document.getElementById("theHtml").style.height = "110px";
		  }
			  
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
      });
  
function checkFirst(){
	return new Promise(function(resolve, reject) {
		chrome.storage.local.get(["firstTime"], function(result){
		console.log("FirstTime: " + result.firstTime);
		resolve(result.firstTime);
	});
	});
}  

function checkID(){
	return new Promise(function(resolve, reject) {
		chrome.storage.local.get(["id"], function(result){
		console.log("id: " + result.id);
		resolve(result.id);
	});
	});
}  

function checkSheetExist(){
	return new Promise(function(resolve, reject) {
		chrome.storage.local.get(["sheetExist"], function(result){
		console.log("SheetExist: " + result.sheetExist);
		resolve(result.sheetExist);
	});
	});
}

async function setFirst(){
	var thisVar = await getAuth();
	var userInput = await checkID();
	var thisVar2;
	if(userInput == null || userInput == "") {
		document.getElementById("actText").style.display = "none";
		document.getElementById("inputFam").style.display = "block";
		document.getElementById("actText2").style.display = "block";
		document.getElementById("input").addEventListener("keyup", function(event) {
			event.preventDefault();
			if (event.keyCode === 13) {
				document.getElementById("inputFam").style.display = "none";
				document.getElementById("actText2").style.display = "none";
				setFirst();
			}
		});
		userInput = document.getElementById("input").value;
		if(userInput == null || userInput == "") { thisVar2 = false }
		else { userInput = userInput + "\\\\"; console.log("USERINPUT: " + userInput); thisVar2 = await setID(userInput); }
	}
	
	else { thisVar2 = true; }
	
	if(thisVar == true && thisVar2 == true) {
	chrome.storage.local.set({"firstTime": 1}, function() {
		normalMode();
	});
	}
}


function toggle(){
	if(toggleSet == 0){
		/*document.getElementById("theHtml").style.animation = "toggle 0.5s ease-out"
		document.getElementById("theHtml").style.height = htmlSize;*/
		document.getElementById("theHtml").animate([
		  // keyframes
		  { height: '110px' }, 
		  { height: htmlSize }
		], { 
		  // timing options
		  duration: 500,
		});
	}
}


function setID(input){
	
	return new Promise(function(resolve, reject) {
		chrome.storage.local.set({"id": input}, function(){
			resolve(true);
		});
	});
}


function getAuth(){
	return new Promise(function(resolve, reject) {
		
		chrome.identity.getAuthToken({interactive: true}, function(token) {
		  resolve(true);
		});
		
	});
}
  
function help(){
	chrome.tabs.create({ url: 'Help.pdf' });
}
  

async function notify(){  

	var theLink = await getTheLink();
	copyToClipboard(theLink.toString());
	
	console.log("WE HERE.");
  chrome.notifications.create(
		'Copied Link',{   
		type: 'basic', 
		iconUrl: 'screen.jpg', 
		title: "Copied link", 
		message: theLink.toString() 
		}, function(id) {
			chrome.tabs.create({ url: theLink.toString() });
			setTimeout(function(){chrome.notifications.clear(id,function(){console.log("TIME");});}, 1000);
		} );
}



async function notifyREAL(mode, url, device){  
	
	//click to get
	if(mode == 0) {
		copyToClipboard(url.toString());
		
		console.log("WE HERE.");
		chrome.notifications.create(
			'Attained link',{   
			type: 'basic', 
			iconUrl: 'screen.jpg', 
			title: "Copied link", 
			message: url.toString() 
			}, function(id) {
				chrome.tabs.create({ url: url.toString() });
				setTimeout(function(){chrome.notifications.clear(id,function(){console.log("TIME");});}, 2500);
			} );
		
	}
	
	//send link
	if(mode == 1){
		
		console.log("WE HERE.");
		chrome.notifications.create(
			'Sent current tab',{   
			type: 'basic', 
			iconUrl: 'screen.jpg', 
			title: "Sent current tab", 
			message: url.toString() 
			}, function(id) {
				setTimeout(function(){chrome.notifications.clear(id,function(){console.log("TIME");});}, 2000);
			} );
	}
	
	//link was given
	if(mode == 2){
		copyToClipboard(url.toString());
		
		console.log("WE HERE.");
		chrome.notifications.create(
			'Recieved link',{   
			type: 'basic', 
			iconUrl: 'screen.jpg', 
			title: "Copied link", 
			message: url.toString() 
			}, function(id) {
				chrome.tabs.create({ url: url.toString() });
				setTimeout(function(){chrome.notifications.clear(id,function(){console.log("TIME");});}, 3500);
			} );
	}
	
	//link was taken
	if(mode == 3){
		copyToClipboard(url.toString());
		
		console.log("WE HERE.");
		chrome.notifications.create(
			'Taken Link',{   
			type: 'basic', 
			iconUrl: 'screen.jpg', 
			title: "Link was taken by other device", 
			message: url.toString() 
			}, function(id) {
				chrome.tabs.create({ url: url.toString() });
				setTimeout(function(){chrome.notifications.clear(id,function(){console.log("TIME");});}, 2000);
			} );
	}
	
	
	//error
	if(mode == 4){
		
	
		chrome.notifications.create(
			'ERROR',{   
			type: 'basic', 
			iconUrl: 'screen.jpg', 
			title: "CANNOT PERFORM REQUEST", 
			message: 'Waiting for other requested task to complete' 
			}, function(id) {
				setTimeout(function(){chrome.notifications.clear(id,function(){console.log("TIME");});}, 3000);
			} );
	}
	
	
	if(mode == 5){
		
		if(device == null){
			chrome.notifications.create(
			'ERROR',{   
			type: 'basic', 
			iconUrl: 'screen.jpg', 
			title: "CANNOT RECIEVE LINK", 
			message: 'No device is online!' 
			}, function(id) {
				setTimeout(function(){chrome.notifications.clear(id,function(){console.log("TIME");});}, 3500);
			} );
		}
		
		else{
			chrome.notifications.create(
			'ERROR',{   
			type: 'basic', 
			iconUrl: 'screen.jpg', 
			title: "CANNOT RECIEVE LINK", 
			message: device + " is not online!" 
			}, function(id) {
				setTimeout(function(){chrome.notifications.clear(id,function(){console.log("TIME");});}, 3500);
			} );
		}
	}
}




function getTheLink(){
	
	
	return new Promise( function(resolve, reject) {
		chrome.identity.getAuthToken({interactive: true}, async function(token){
		
		setToken(token);
        let init = {
          method: 'GET',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          'contentType': 'json'
        };
		var theFoundURL = await getUrl2();
		console.log("THE FOUND URL: " + theFoundURL);
        fetch(
            "https://sheets.googleapis.com/v4/spreadsheets/" + theFoundURL + "/values/Sheet1!B1",
            init)
            .then((response) => response.json())
            .then(function(data) {
				resolve(data.values[0]);
            });
			
		
		
		
	});
	
	}).catch(e => {
		
    console.log("POPUP... OH BOY: " + e);
	});
	
}
 
 
function copyToClipboard(text) {
  const input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
}

 var theToken;
 var theUrl;
 var SEARCH_FOR = 'gorll';
 var useDate;
 var theSpreadsheetUrl;
 
 
 var cycle;
 var found = 0;
 var doingTask = 0;
 
 
 function clickToGet(device){
	 if(doingTask == 0){
		 doingTask = 1;
		 getLink(device);
	 }
	 
	 else{
		 notifyREAL(4);
	 }
 }
 
 
 async function getLink(device){
	 found = 0;
	 var starting = await updateSheet(device);
	 cycle = setInterval(function(){ checkStatus(device); } , 700);
	 setTimeout(async function(){ 
		if(found == 0){
			clearInterval(cycle);
			var wait = await setZero(device);
			doingTask = 0;
			
			if(device == 0){
				notifyREAL(5);
			}
			
			else{
				for(i = 0; i<locations.length; i++){
					if(locations[i] == device){
						notifyREAL(5,"",devices[i]);
					}
				}
			}
		}
		
	}, 4000);
	 
 }
 
 

 function getID(){
	return new Promise(function(resolve, reject) {
		chrome.storage.local.get(["id"], function(result){
		console.log("ID IS: " + result.id);
		resolve(result.id);
	});
	});
}
 
 
function updateSheet(pubOid){
	return new Promise( async function(resolve, reject) {
		/*var theNewUrl = getCurrentTab(function(r){
				console.log(r);
			// ... other operations using current tab ...
				return r.url;
		});*/
		chrome.identity.getAuthToken({interactive: true}, async function(token) {
		
		var theID = await getID();
		var theValues = [
						[theID ]
					   ];
					   
		var Tbody = {
			values: theValues
		};
		
		
        let init = {
          method: 'PUT',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          'contentType': 'json',
		  body : JSON.stringify(Tbody)
        };
		console.log("TBODY IS: " + Tbody);
		var theFoundURL = await getUrl2();
		var range = "D1";
		if(pubOid != 0) { range = "D"+pubOid; }
        fetch(
            "https://sheets.googleapis.com/v4/spreadsheets/" + theFoundURL + "/values/Sheet1!"+ range + "?valueInputOption=RAW",
            init)
            .then((response) => response.json())
			.then(function(data) {
				console.log(data);
			}).catch( async function(e){
				console.log("THIS IS THE ERR: " + e);
				//var waiting = await refreshToken();
				reject(false);
			});
		
		
		
		
		
		var theValues = [
						[ "1"]
					   ];
					   
		var Tbody = {
			values: theValues
		};
		
		
        let init2 = {
          method: 'PUT',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          'contentType': 'json',
		  body : JSON.stringify(Tbody)
        };
		console.log("TBODY IS: " + Tbody);
		var theFoundURL = await getUrl2();
		var range = "A1";
		if(pubOid != 0) { range = "A"+pubOid; }
        fetch(
            "https://sheets.googleapis.com/v4/spreadsheets/" + theFoundURL + "/values/Sheet1!"+ range + "?valueInputOption=RAW",
            init2)
            .then((response) => response.json())
			.then(function(data) {
				console.log(data);
				resolve(true);
			}).catch( async function(e){
				console.log("THIS IS THE ERR: " + e);
				//var waiting = await refreshToken();
				reject(false);
			});
			
			
		});
			
		
	}).catch( async function(e){
				console.log("THIS IS THE ERR: " + e);
				var waiting = await refreshToken();
			});
	
}







function checkStatus(pubOid){

	return new Promise( async function(resolve, reject) {	
	
	
	chrome.identity.getAuthToken({interactive: true}, async function(token) {
        let init = {
          method: 'GET',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          'contentType': 'json'
        };
		var theFoundURL = await getUrl2();
		var theLocation = "2";
		var range = "A1:B1";
		if(pubOid != 0) { 
			range = "A" + pubOid + ":B" + pubOid; 
		}
		
        fetch(
            "https://sheets.googleapis.com/v4/spreadsheets/" + theFoundURL + "/values/Sheet1!" + range,
            init)
            .then((response) => response.json())
            .then(function(data) {
              console.log(data)
			  console.log("[0][0]: " + data.values[0][0]);
			  let nowD = "0"; //getDate();
			  if(data == null){
				  resolve(0);
			  }
			  
			  if(nowD == data.values[0][0]){
				  found = 1;
				  doingTask = 0;
				  clearInterval(cycle);
				  changeHistory(pubOid, data.values[0][1]);
				  notifyREAL(0, data.values[0][1]);
				  //chrome.tabs.create({ url: data.values[0][1] });
				  resolve(1);
			  }
			  
			  else { resolve(0); }
			  
            }).catch( async function(e){
				//var waiting = await refreshToken();
				console.log("THIS IS THE ERR: " + e);
				reject(null);
			});
			
		
	});
		
	
	
	}).catch( async function(e) {
		console.log("THE ERROR MESSAGE: " + e);
		var waiting = await refreshToken();
		console.log("SHOULD HAVE REFRESHED!");
		return null;
		
	});
}



function setZero(pubOid){
	return new Promise( async function(resolve, reject) {
		
		chrome.identity.getAuthToken({interactive: true}, async function(token) {
		var theValues = [
						[ "0"]
					   ];
					   
		var Tbody = {
			values: theValues
		};
		
		
        let init = {
          method: 'PUT',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          'contentType': 'json',
		  body : JSON.stringify(Tbody)
        };
		console.log("TBODY IS: " + Tbody);
		var theFoundURL = await getUrl2();
		var range = "A1";
		if(pubOid != 0) { range = "A"+pubOid; }
        fetch(
            "https://sheets.googleapis.com/v4/spreadsheets/" + theFoundURL + "/values/Sheet1!" + range + "?valueInputOption=RAW",
            init)
            .then((response) => response.json())
			.then(function(data) {
				console.log(data);
				resolve(true);
			}).catch( async function(e){
				console.log("THIS IS THE ERR: " + e);
				//var waiting = await refreshToken();
				reject(false);
			});
			
		});
			
		
	}).catch( async function(e){
				console.log("THIS IS THE ERR: " + e);
				var waiting = await refreshToken();
			});
}



function getUrl2(){
	return new Promise(function(resolve, reject) {
		chrome.storage.local.get(["url"], function(result){
		console.log("GETURL2: " + result.url);
		resolve(result.url);
	});
	});
}




 
 function getCurrentTab2(){
	return new Promise( function(resolve, reject) {
		chrome.tabs.query({active:true, currentWindow: true}, function (tab) {
			resolve(tab[0].url);
		});
	});
}
 
 
 
 
function sendLink(device){
	console.log("DEVICE NUM: " + device);
	 if(doingTask == 0){
		 sendLinkWork(device);
	 }
	 
	 else{
		 notifyREAL(4);
	 }
 }
 
 
 
 function sendLinkWork(pubOid){
	return new Promise( async function(resolve, reject) {
		chrome.identity.getAuthToken({interactive: true}, async function(token) {
		
		var theID = await getID();
		var theValues = [
						[theID ]
					   ];
					   
		var Tbody = {
			values: theValues
		};
		
		
        let init = {
          method: 'PUT',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          'contentType': 'json',
		  body : JSON.stringify(Tbody)
        };
		console.log("TBODY IS: " + Tbody);
		var theFoundURL = await getUrl2();
		var range = "D1";
		if(pubOid != 0) { range = "D"+pubOid; }
        fetch(
            "https://sheets.googleapis.com/v4/spreadsheets/" + theFoundURL + "/values/Sheet1!"+ range + "?valueInputOption=RAW",
            init)
            .then((response) => response.json())
			.then(function(data) {
				console.log(data);
			}).catch( async function(e){
				console.log("THIS IS THE ERR: " + e);
				//var waiting = await refreshToken();
				reject(false);
			});
		
		
		
		
		
		var updateLink = await getCurrentTab2();
		var theValues = [
						[ "2", String(updateLink)]
					   ];
					   
		var Tbody = {
			values: theValues
		};
		
		
        let init2 = {
          method: 'PUT',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          'contentType': 'json',
		  body : JSON.stringify(Tbody)
        };
		console.log("TBODY IS: " + Tbody);
		var theFoundURL = await getUrl2();
		var range = "A1:B1";
		if(pubOid != 0) { range = "A"+pubOid + ":B" + pubOid; }
        fetch(
            "https://sheets.googleapis.com/v4/spreadsheets/" + theFoundURL + "/values/Sheet1!" + range + "?valueInputOption=RAW",
            init2)
            .then((response) => response.json())
			.then(function(data) {
				console.log(data);
				changeHistory(pubOid,updateLink);
				notifyREAL(1, String(updateLink));
				resolve(true);
			}).catch( async function(e){
				console.log("THIS IS THE ERR: " + e);
				//var waiting = await refreshToken();
				reject(false);
			});
			
		});
		
	}).catch( async function(e){
				console.log("THIS IS THE ERR: " + e);
				var waiting = await refreshToken();
			});
}






function changeHistory(pubOid, url){
	return new Promise( async function(resolve, reject) {	
	
	console.log("CHANGING HISTORY");
	chrome.identity.getAuthToken({interactive: true}, async function(token) {
		
		var theHistory = "";
		var theNewHistory = "";
        let init = {
          method: 'GET',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          'contentType': 'json'
        };
		var theFoundURL = await getUrl2();
		var range = "C1";
		if(pubOid != 0) { 
			range = "C" + pubOid; 
		}
		
        fetch(
            "https://sheets.googleapis.com/v4/spreadsheets/" + theFoundURL + "/values/Sheet1!" + range,
            init)
            .then((response) => response.json())
            .then(function(data) {
              console.log(data);
			  if(data == null){
				  
			  }
			  
			  else if(data.values!=null && data.values[0] != ""){
				  theHistory = data.values[0];
				  theNewHistory = convertAndAdd(theHistory, url);
				  actualChangeHistory(pubOid, theNewHistory, theFoundURL);
			  }
			  
			  
            }).catch( async function(e){
				//var waiting = await refreshToken();
				console.log("THIS IS THE ERR: " + e);
				reject(null);
			});
			
			
			
			console.log("THE NEW HISTORY: " + theNewHistory);
			
		
		
	});
		
	
	
	}).catch( async function(e) {
		console.log("THE ERROR MESSAGE: " + e);
		var waiting = await refreshToken();
		console.log("SHOULD HAVE REFRESHED!");
		return null;
		
	});
}



function actualChangeHistory(pubOid, theNewHistory, theFoundURL){
	chrome.identity.getAuthToken({interactive: true}, async function(token) {
	if(theNewHistory != ""){
			console.log("NEW HISTORY");
			var theValues = [
							[ theNewHistory]
						   ];
						   
			var Tbody = {
				values: theValues
			};
			
			
			let init2 = {
			  method: 'PUT',
			  async: true,
			  headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json'
			  },
			  'contentType': 'json',
			  body : JSON.stringify(Tbody)
			};
			console.log("TBODY IS: " + Tbody);
			var range = "C1";
			if(pubOid != 0) { range = "C"+pubOid; }
			fetch(
				"https://sheets.googleapis.com/v4/spreadsheets/" + theFoundURL + "/values/Sheet1!" + range + "?valueInputOption=RAW",
				init2)
				.then((response) => response.json())
				.then(function(data) {
					console.log(data);
					resolve(true);
				}).catch( async function(e){
					console.log("THIS IS THE ERR: " + e);
					//var waiting = await refreshToken();
					reject(false);
				});
			
		}
	});
}



function convertAndAdd(theUrls, toAdd){
	var combined = "";
	var tmp = "";
	theUrls = toAdd + "\\\\" + theUrls;
	i = 0;
	while(theUrls != "" && theUrls != "\\\\" && i < 10){
		tmp = theUrls.substring(0, theUrls.indexOf("\\\\")+2);
		combined = combined + tmp;
		theUrls = theUrls.substring(theUrls.indexOf("\\\\")+2);
		i++;
	}
	console.log("combined: " + combined);
	
	return combined;
 
}
 
 
 
 
 
 
 
 
 
 
 function checkSignIn(){
	return new Promise(function(resolve, reject){
		chrome.identity.getAuthToken({interactive: false}, function (token) {
		if (!token) {
			if (chrome.runtime.lastError.message.match(/not signed in/)) {
				console.log("not singed in");
				resolve(false);
			} else {
				console.log("signed in");
				resolve(true);
			}
		}
	});
	
	});
}

function actualRefresh(checking){

return new Promise(function(resolve, reject) {
	if(checking == false) {
		chrome.storage.local.set({"firstTime": 0}, function() {
			reject(false);
		});
	
	}
	
	else {
		
		console.log("REFRESHING");
		chrome.identity.getAuthToken({interactive: true}, function(token) {
		  //setToken(token);
		  resolve(true);
	  });
		
		
	}
	
});
}

function refreshToken(){
	console.log("IN REFRESH");
	return new Promise( async function(resolve, reject) {
	var checking = checkSignIn();
	var xy;
	setTimeout(async function(){ 
	
		xy = await actualRefresh(checking); 
		resolve(xy);
		
	}, 1000);
	
	
	});
}




/*window.onload = function(){
	document.getElementById('b').addEventListener('click', 
	function(){
		chrome.identity.getAuthToken({"interactive": true}, function(token){
		console.log(token);
		gapi.client.setToken(token);
		})
		
		
	})
};



function retrieveAllFiles() {
  var retrievePageOfFiles = function(request, result) {
    request.execute(function(resp) {
      result = result.concat(resp.items);
      var nextPageToken = resp.nextPageToken;
      if (nextPageToken) {
        request = gapi.client.drive.files.list({
          'pageToken': nextPageToken
        });
        retrievePageOfFiles(request, result);
      } else {
        //printThis(result);
      }
    });
  }
  var initialRequest = gapi.client.drive.files.list();
  retrievePageOfFiles(initialRequest, []);
}
	*/



/*function start(){
	
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
	document.getElementById('pi').textContent = url;
	});*/
	
	//readTextFile("file:///C:/Users/admin/Documents/G-url/G-url/Data/url.txt");
	
	/*var file = new File("C:\Users\admin\Documents\G-url\G-url\Data\url.txt");
	var reader = new FileReader();
	reader.onload = function(e) {
		document.getElementById('pi').textContent = reader.result;
	}
	
	reader.readAsText(file);*/

	/*var value = "1cT2kLftldem4VAB-3880ixEWKhr8Y6F0AuEpY5fOXoA";
	chrome.storage.local.set({"url": value}, function() {
	});
	
	chrome.storage.local.get(["url"], function(result){
		if(result.url == null){
				
				//create sheet
				chrome.storage.local.set({"url": value}, function(){
				});
		}
	
			else document.getElementById('pi').textContent = result.url;
	});
}

function saveUrls(){
	
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1; //January is 0!
	let yyyy = today.getFullYear();
	let hr = today.getHours();
	let min = today.getMinutes();
	let sec = today.getSeconds();

	if(dd<10) {
		dd = '0'+dd;
	} 

	if(mm<10) {
		mm = '0'+mm;
	} 
	
	if(hr<10) {
		hr = '0'+hr;
	} 
	
	if(min<10) {
		min = '0'+min;
	} 
	
	if(sec<10) {
		sec = '0'+sec;
	} 

	today = yyyy + mm + dd + hr + min + sec;
	
}*/









//document.getElementById('button').addEventListener('click',loadUrls);
//loadUrls();
//document.getElementById('button').addEventListener('click',saveUrls);

//document.getElementById('button').addEventListener('click',retrieveAllFiles);



/*$(document).ready(function(){
	alert("working");
});

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
	//$(document).getElementById('pi').innerHTML = "WORLD";
});*/