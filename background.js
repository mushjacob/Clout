//chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
//Send message to content Script -> Page was changed
//or execute parser from here 
// chrome.tabs.executeScript
console.log("EXECUTE");
//chrome.tabs.executeScript(null, {file: "contentscript.js"});
/*setTimeout(function(){
chrome.tabs.executeScript(null, {file: "contentscript.js", runAt: "document_end"});
console.log("EXECUTE2");
}, 2000);*/
//console.log("ONCE: " + once);
/*if(once == 0){
/*chrome.tabs.executeScript(null, {file: "contentscript.js", runAt: "document_end"}, function(){
	once = 0;
	console.log("EXECUTE2");
});
	once = 1;
	setTimeout(function(){
	chrome.tabs.executeScript(null, {file: "contentscript.js", runAt: "document_end"}, function(){
		once = 0;
		console.log("EXECUTE2");
	});
	console.log("EXECUTE2");
	}, 2000);
}

});*/
var once = 0;
var startScrolling;
var theTabID = "";
var count = 0;
var theFollowers; 
var theFollowing;
var toUnfollow;
var followLimit = 10;


var follow = function(user, date){
	  this.user = user;
	  this.date = date;
  }

chrome.storage.local.get({followHistory: null}, function (result) {
	if(result.followHistory == null){
		console.log("NO HISTORY. SETTING UP NOW");
		var theFollowHistory = [];
		console.log("HERES WHAT IT LOOKS LIKE");
		console.log(theFollowHistory);
		chrome.storage.local.set({followHistory: theFollowHistory}, function () {
			console.log("SET HISTORY!");
		});
		
	}
	
	else{
		console.log("FOLLOW HISTORY ALREADY SET GANG!");
		console.log(result.followHistory);
	}
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	console.log("RECIEVED MESSAGE BACKGROUND!");
  if(message.closeThis == true) { 
	if(message.wasClicked == true){
		followLimit--;
		console.log("FOLLOW LIMIT SUBTRACTED: " + followLimit);
		if(followLimit <= 0){
			console.log("FOLLOW LIMIT NOW 0: " + followLimit);
			if(rawMode == 0){
			forceStopDoneFollow();
			noRepeat = 0;
			beginUnfollowSmart();
			}
			
			else if (rawMode == 1){
				alert("CLOUT: RAW FOLLOW IS NOW FOLLWOING MORE THAN HOW MANY FOLLOWERS THE ACCOUNT CURRENTLY HAS (TO STOP RIGHT CLICK AND CHOOSE FORCE STOP)");
			}
		}
	}
	
	chrome.tabs.remove(sender.tab.id); 
	
  }
  if(message.openThis != null) { 
	console.log("OPEN: " + message);
	chrome.tabs.create({ url: message.openThis, windowId: winID, active: false, selected: false });
  }
  
  if(message.beginBack == true) { restartTab(sender.tab.id, message.ind) }
  
  
  if(message.scrollMode == true) { theTabID = sender.tab.id; count = 0; check = 0; startScrolling = setInterval(doScroll, 1700); }
  
  if(message.followingListBack != null){ 
	changeSelected();
	theFollowers = message.followingListBack; 
	console.log("THE LISTT: " + theFollowers.length);
	console.log("SHOW THE LIST: ");
	console.log(theFollowers);
	console.log("HIHIHIHIHI");
	//calculateDifference();
	//console.log(JSON.parse(theFollowers[0].url));
	//console.log(JSON.parse(theFollowers[0]));
	
	//console.log(JSON.parse(theFollowers));
	//console.log(theFollowers[0][0]);
	//var theConvert = JSON.parse(theFollowers);
	//console.log("CONVERT SIZE: " + theConvert);
	//console.log(theConvert);
	 
	}
	
	
	if(message.shouldUn != null){
		changeSelected();
		toUnfollow = message.shouldUn; 
		console.log("THE LISTT2: " + toUnfollow.length);
		console.log("SHOW THE LIST2: ");
		console.log(toUnfollow);
		console.log("HIHIHIHIHI2");
		sendUnfollow();
	}
	
	if(message.doSmartUnfolow == true) { beginUnfollowSmart2(); }
	
	
	if(message.followLimit != null) {followLimit = message.followLimit; console.log("FOLLOW LIMIT: " + followLimit); }
	
	
	if(message.doneSmartUnfollowing == true) { reGetRatio(); chrome.tabs.update(followStartTab, {highlighted: true, active: true}); chrome.tabs.remove(sender.tab.id); restartSmartFollow();} 
});

var winID = "";
	chrome.windows.create({ url: "https://www.instagram.com/leelasfashion/", width: 375, height: 667 }, function(win) {
		winID = win.id;
        //chrome.windows.update(win.id, { focused: false });
		console.log("OG TAB: " + win.tabs[0].id);
		ogTab = win.tabs[0].id;
		setTimeout(getRatioPlz2, 2000);
    });
	
var ogTab;
function getRatioPlz(){
	console.log("GET")
	chrome.tabs.sendMessage(ogTab, {getRatio: true}, null, function(){
	});
}

function getRatioPlz2(){
	console.log("GET")
	chrome.tabs.sendMessage(ogTab, {getRatio: true}, null, function(){
		createNewTab();
	});
}

function reGetRatio(){
	chrome.tabs.update(ogTab, {url: "https://www.instagram.com/leelasfashion/"});
	setTimeout(getRatioPlz, 5000);
}

function createNewTab(){
	chrome.tabs.create({ url: "https://www.instagram.com/leelasfashion/", windowId: winID, active: true, selected: true }, function(tab){
		  followStartTab = tab.id;
	  });
}

function changeSelected(){
	chrome.tabs.update(unfollowTab, {highlighted: true, active: true});
}


function sendUnfollow(){
	chrome.tabs.sendMessage(unfollowTab, {letsSnipeEm: toUnfollow});
}

function restartSmartFollow(){
	chrome.tabs.sendMessage(followStartTab, {smartFollowAgain: true});
}
	
	
var check = 0;

function doScroll(){
	chrome.tabs.sendMessage(theTabID, {scroll: true}, 	function(response){
		var tmp = response.scrollCount;
		console.log("TMP: " + tmp);
		console.log("COUNT: " + count);
		if(tmp > count){
				count = tmp;
				check = 0;
		}
			
		else if(tmp <= count){
			console.log("DONE!");
			check++;
			stop();
		}
	});
}

var restartRepeat = 0;

function restartTab(tabID, index){
	console.log("STARTING FROM BACKGROUND");
	if(restartRepeat == 0){
		console.log("IN RESTART!");
		restartRepeat = 1;
	chrome.tabs.sendMessage(tabID, {begin: true, startMode: index});
	}
}

function sendFollowingList(list){
	console.log("THE LIST: " + list.length);
	chrome.tabs.sendMessage(followingTab, {followingList: list});
}

function stop(){
	console.log("STOPPING!");
	console.log("CHECK: " + check);
	if(check >= 3){
		clearInterval(startScrolling);
		if(whichOne == 0){
		beginUnfollowHard2();
		whichOne = 1;
		}
	}
}






 function getCurrentTab2(){
	return new Promise( function(resolve, reject) {
		chrome.tabs.query({active:true, currentWindow: true}, function (tab) {
			resolve(tab[0].id);
		});
	});
}

chrome.contextMenus.create({
    "title": "Smart follow/unfollow",
    "contexts": ["all"],
    "onclick" : beginSmart
  });

chrome.contextMenus.create({
    "title": "Raw follow",
    "contexts": ["all"],
    "onclick" : begin
  });
  
  
chrome.contextMenus.create({
    "title": "Raw unfollow",
    "contexts": ["all"],
    "onclick" : beginUnfollowHard
  });
  
  
chrome.contextMenus.create({
    "title": "Force stop",
    "contexts": ["all"],
    "onclick" : forceStop
  });
  
  

  
  async function beginSmart(){
	  reGetRatio();
	  var currTab = await getCurrentTab2();
	  followStartTab = currTab;
	  count = 0;
	  rawMode = 0;
	  whichOne = 1;
	  chrome.tabs.sendMessage(currTab, {begin: true, startMode: 0});
	  console.log("WOAH");
	  
  }
  
  var rawMode = 0;
  async function begin(){
	  reGetRatio();
	  var currTab = await getCurrentTab2();
	  followStartTab = currTab;
	  rawMode = 1;
	  count = 0;
	  whichOne = 1;
	  chrome.tabs.sendMessage(currTab, {begin: true, startMode: 0});
	  console.log("WOAH");
	  
  }
  
  
   async function forceStop(){
	  var currTab = await getCurrentTab2();
	  chrome.tabs.sendMessage(currTab, {stop: true});
	  console.log("OH NO");
	  
  }
  
  
  async function forceStopDoneFollow(){
	  whichOne = 1;
	  chrome.tabs.sendMessage(followStartTab, {stop: true, reachedLimit: true});
	  console.log("GANG");
	  
  }
  var followStartTab; 
  var unfollowTab;
  var followingTab;
  var whichOne = 0;
  var noRepeat = 0;
  async function beginUnfollowHard(){
	  whichOne = 0;
	  noRepeat = 0;
	  restartRepeat = 0;
	  unfollowTab = null;
	  console.log("BEGIN UNFOLLOW");
	  unfollowTab = await getCurrentTab2();
	  chrome.tabs.update(unfollowTab, {url: "https://www.instagram.com/leelasfashion/", active: false}, function (callback){
		console.log("SEND MESS");
		unfollowTab = callback.id;
	  });
	   setTimeout(unfollowTabSend, 5000);
	  //setTimeout(function(){ console.log("HELLO FROM THE OTHER SIDE" ); chrome.tabs.sendMessage(unfollowTab, {following: true, id: unfollowTab}); }, 1000);
	  
  }
  
  
  
  function unfollowTabSend(){
	  console.log("WE HEAR");
	  chrome.tabs.sendMessage(unfollowTab, {followers: true});
	  //setTimeout(beginUnfollowHard2, 3000);
  }
  
  
  function followingTabSend(){
	  console.log("WE HEAR");
	  if(noRepeat == 0){
		  noRepeat = 1;
	  console.log("FOLLWOING TAB: " + followingTab);
	  chrome.tabs.sendMessage(followingTab, {following: true});
	  }
	  sendFollowingList(theFollowers);
  }

  function beginUnfollowHard2(){
	  followingTab = null;
	  restartRepeat = 0;
	  chrome.tabs.create({ url: "https://www.instagram.com/leelasfashion/", windowId: winID, active: true, selected: true }, function(tab){
		  followingTab = tab.id;
	  });
	  setTimeout(followingTabSend, 5000);
	  
	  
  }
  
  var smartUnfollowTab;
  var smartUnfollowTab2;
    function beginUnfollowSmart(){
	  followingTab = null;
	  restartRepeat = 0;
	  chrome.tabs.create({ url: "https://www.instagram.com/leelasfashion/", windowId: winID, active: true, selected: true }, function(tab){
		  smartUnfollowTab = tab.id;
	  });
	  setTimeout(followingTabSendSmart, 5000);
	  
	  
  }
  
  
  function followingTabSendSmart(){
	  console.log("WE HEAR");
	  if(noRepeat == 0){
		  noRepeat = 1;
	  console.log("SMART TAB: " + smartUnfollowTab);
	  chrome.tabs.sendMessage(smartUnfollowTab, {followerSmart: true, mode: 3});
	  }
  }
  
  
  
    function beginUnfollowSmart2(){
	  followingTab = null;
	  restartRepeat = 0;
	  chrome.tabs.create({ url: "https://www.instagram.com/leelasfashion/", windowId: winID, active: true, selected: true }, function(tab){
		  smartUnfollowTab2 = tab.id;
	  });
	  setTimeout(followingTabSendSmart2, 5000);
	  
	  
  }
  
  
  function followingTabSendSmart2(){
	  console.log("WE HEAR SMART 2");
	  if(noRepeat == 0){
		  noRepeat = 1;
	  console.log("SMART TAB: " + followingTab);
	  chrome.tabs.sendMessage(smartUnfollowTab2, {followingSmart: true, mode: 4});
	  }
  }
  
  
  var user = function(url){
	  this.url = url
  }
  
  var following = [
	  new user("xxrheaxx"),
	  new user("mushjacob"),
	  new user("takenbyben"),
	  new user("jeevs777"),
	  new user("aids")
  ]
  
  
  /*var following2 = JSON.stringify(following);
  
  var following3 = JSON.parse(following2);
  
  console.log("FOLLOWING 3: " + following3);
  
  console.log("FOLLOWING 2: " + following2);
  
  console.log("USER 1: " + following3[0].url);*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }
  
  get length() {
    return this.count;
  }
  
  
  addLast(user, date) {
    // Create a new Node
    const node = {
      user: user,
	  date: date,
      next: null
    }
    
    if(this.count === 0) {
      // If this is the first Node, assign it to head
      this.head = node;
    } else {
      // If not the first node, link it to the last node
      this.tail.next = node;
    }
    
    this.tail = node;
    
    this.count++;
  }
  
  addFirst(user, date) {
    // Create a new Node
    const node = {
      user: user,
	  date: date,
      next: null
    }
    
    // Save the first Node
    const temp = this.head;
    
    // Point head to the new Node
    this.head = node;
    
    // Add the rest of node behind the new first Node
    this.head.next = temp;
    
    this.count++;
    
    if(this.count === 1) {
      // If first node, 
      // point tail to it as well
      this.tail = this.head;
    }
  } 
  
  removeFirst(data) {
    if(this.count > 0) {
      // The head should point to the second element
      this.head = this.head.next;
      
      this.count--;
      
      if(this.count === 0) {
        // If list empty, set tail to null
        this.tail = null;  
      } 
    }
  }
  
  removeLast(data) {
    if(this.count > 0) {
      if(this.count === 1) {
        this.head = null;
        this.tail = null;
      } else {
        // Find the Node right before the last Node
        let current = this.head;
        while(current.next !== this.tail) {
          current = current.next;
        }
        
        current.next = null;
        this.tail = current;
      }
      this.count--;
    }
  }
}

