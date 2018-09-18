
		console.log("HERE2");
	console.log("GAY2");
	var feed = document.getElementsByClassName("cGcGK");
	var divs = document.getElementsByClassName("wo9IH");
	var won = document.getElementsByClassName("j6cq2");
	//var buttons = document.getElementsByClassName("oF4XW sqdOP  L3NKy      ");
	console.log("LIST SIZE: " + divs.length);
	console.log("FEED: " + feed.length);
	console.log("WON: " + won.length);
	var timer; 
	var itterate = divs.length-1;
	var count = 0;
	var tmp = 0;
	var checkStop = 0;
	var ensureStop = 0;
	var errorcheck = 0;
	var stopMode = 0;
	var startMode = 0;
	var followersDivs;
	var followingDivs;
	var noRepeat = 0;
	var dontUnfollow = ["chicago", "insta_chicago", "infatuation_chi", "chicagobucketlist", "lifeofchicago", "nickcrvwford", "mannyortizphoto_", "joselivinup", "art.of.chi", "gh_chapman", "e4rlyr1ser", "only_chicago", "nealkumar", "mattbweitz", "choosechicago", "eyeinthechi", "ig_unitedstates_", "chicity_shots", "chiarchitecture", "chitecture", "igerschicago", "chicagocityworld", "go.chicago", "eyesofbrax", "texas_rg", "timeoutchicago", "online.chicago", "historic_chicago", "chicago.everyday", "eater_chicago", "likefoodchicago", "bestfoodchicago", "kaitaro.k", "sean.muckle", "hanayululu", "chicagoarchitecturebiennial", "hezab1", "alex.e.photo", "visuals.by.jack", "johnbrodish", "a.o._photo", "chicago_lovers_us", "thechieye", "thechicagopulse", "ecbg_studio", "diningoutchicago", "top_chicago_restaurants_", "chicagoandfood", "chicagofoodmag", "xxrheaxx", "lifeofrhealistic", "dishroulette", "_amphoto", "andrewhyde", "iantashley", "realjamestylers", "weownthenight_chi", "wu_chicago", "us_loverss", "the_americandream_", "chicago_usa", "r.t._images", "chicityschools", "qncy_", "jp_photography137", "chicago_ism", "mynameisryanv", "iamcaste", "lifeviachicago", "chicago.area", "tmcd.chi", "606.media", "manfredmini", "cassi_lee", "thisislife1.8", "poplianski", "willtrogdon", "brandonexplores", "ilove_chicago", "previewchicago"];
	var unfollowThese = [];
	var smartUnfollowList;
	function letsGoo(){
		divs = document.getElementsByClassName("wo9IH");
		if(divs != null && divs.length != 0 && feed.length == 0){
			console.log("START!");
			/*var things = divs[0].getElementsByTagName("*");
			for(x=0; x<things.length; x++){
				console.log("THINGS " + x + ": " + things[x].className);
			}2*/
			
			chrome.runtime.sendMessage({scrollMode: true});
			count = 0;
			ensureStop = 0;
			tmp = divs.length;
			//console.log("HERE");
			errorcheck = 0;
			//timer = setInterval(follow, 5000);
			//timer = window.setInterval(scrollDown, 1000);
			/*while(check){
				divs = document.getElementsByClassName("wo9IH");
				
			}
			var elem = querySelector('[title="mushjacob]');
			var root = elem[0].parentNode.parentNode.parentNode.parentNode;
			var rootStuff = root.getElementsByTagName("*");
			console.log("ROOT STUFF PLZ: " + rootStuff[0].className + ", " + rootStuff[1].className);*/
			//var elemen = $( "select[title='thelifeofrhealistic']" );
			
			
		}
		
		else{
			alert("Clout: CANNOT START HERE (You need to go to a user and click on their followers list)");
		}
	}
	
	
	function scrollDown(){
		console.log("HIHI");
		if(divs != null && divs.length != 0 && feed.length == 0 && ensureStop == 0){
			divs = document.getElementsByClassName("wo9IH");
			tmp = divs.length;
			console.log("TMP: " + tmp);
			console.log("COUNT: " + count);
			if(tmp > count){
				count = tmp;
			}
			
			else if(tmp <= count){
				console.log("DONE!");
				divs = document.getElementsByClassName("wo9IH");
				stop();
			}
			
			divs[divs.length-1].scrollIntoView();
		}
		
		else{
			if(errorcheck >= 2){
				divs = document.getElementsByClassName("wo9IH");
				finalStop3();
			}
			errorcheck++
		}
	}
	
	
	
	
	
	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
		console.log("RECIEVED MESSAGE SCRIPT!");
		
		if(message.begin == true){
			startMode = message.startMode;
			console.log("MESSAGE STARTMODE: " + message.startMode);
			letsGoo();
		}
		
		if(message.stop == true){
			if(message.reachedLimit == true){
				alert("CLOUT: STOPPING BECAUSE REACHED FOLLOW LIMIT - THIS IS JUST FOLLOWS TO PUBLIC ACCOUNTS DOES NOT INCLUDE REQUESTED FOLLOWS (MAYBE START RAW UNFOLLOW OR IF YOU'RE OKAY WITH GOING OVER RATIO YOU CAN RESTART AND IT WILL FOLLOW 100 MORE)");
			}
			finalStop2();
			unfollowFinalStop2();
			smartUnfollowFinalStop2();
		}
		
		if(message.scroll == true){
			scrollDown();
			sendResponse({scrollCount: tmp});
		}
		
		
		if(message.getRatio == true){
			sendFollowLimit();
		}
		
		if(message.followingList != null){
			var tmpFollwerDivs = message.followingList;
			if(tmpFollwerDivs != null) { console.log("THIS AINT A JOKE MUFF!"); }
			followersDivs = tmpFollwerDivs;
			console.log("HEERE U GO: ");
			console.log(tmpFollwerDivs);
			console.log("FOLLOWING DIVS: " + followersDivs.length);
			//calculateDifference();
		}
		
		if(message.followingListRealContent != null){
			followingDivs = message.followingListRealContent;
			console.log("FOLLOWING");
			console.log(followingDivs);
			//calculateDifference();
		}
		
		if(message.letsSnipeEm != null){
			unfollowThese = message.letsSnipeEm;
			console.log("SNIPE");
			console.log(unfollowThese);
			var theSpans = document.getElementsByClassName("g47SY ");
			//var theLimitString = theSpans[2].innerHTML.toString();
			//theLimit = parseInt(theLimitString.replace(/,/g, ''));
			theLimit = 1200;
			ensureStop3 = 0;
			ensureStop4 = 0;
			itterate2 = 1;
			theUnfollowButtons = document.getElementsByClassName("oF4XW sqdOP  L3NKy   _8A5w5   ");
			console.log("THE LIMIT: " + theLimit);
			window.onerror = function (msg, url, lineNo, columnNo, error) {
			 unfollowStop2();
			 console.log("ERROR: " + msg);
			 console.log("ERROR ER: " + error);
			 return false;
			}
			unfollowStart();
		}
		
		
		
		if(message.smartFollowAgain == true){
			startMode = 0;
			stop();
		}
		

		
		
	});
		
	var theUnfollowButtons;
	
	function sendFollowLimit(){
			console.log("SENDING");
			var theSpans = document.getElementsByClassName("g47SY ");
			var theLimitString = theSpans[2].innerHTML.toString();
			theLimit = parseInt(theLimitString.replace(/,/g, ''));
			console.log("THE LIMIT: " + theLimit);
			var theFollowersLimit = theSpans[1].innerHTML.toString();
			theFollowersLimit = parseInt(theFollowersLimit.replace(/,/g, ''));
			console.log("FOLLOWER LIMIT: " + theFollowersLimit);
			theActualLimit = theFollowersLimit - theLimit;
			console.log("ACTUAL LIMIT: " + theActualLimit);
			if(theActualLimit <= 0) {
				alert("CLOUT WARNING: FOLLOWING IS GREATER THAN FOLLOWERS (IF YOU WANT TO STOP RIGHT CLICK AND SELECT FORCE STOP)");
				theActualLimit = 100;
			}
			//theActualLimit = 1;
			chrome.runtime.sendMessage({followLimit: theActualLimit});
	}
	
	function follow(){
		console.log("I: " + itterate);
		if(itterate >= 0 && ensureStop2 == 0){
			var stuff = divs[itterate].getElementsByTagName("*");
			console.log(stuff[stuff.length-1].className + "");
			console.log(stuff[8].className + "");
			var x = 0;
			for (x = 0; x < stuff.length; x++) {
				if(stuff[x].className == "FPmhX notranslate _0imsa "){
					console.log("X: " + x);
					stuff[x].scrollIntoView();
					stuff[x].style.backgroundColor = "red";
					break;
				}
				
			}
			
			//var url = stuff[8].href;
			//console.log("URL: " + url);
			if(stuff[stuff.length-1].className == "oF4XW sqdOP  L3NKy      "){
				var url = stuff[x].href;
				console.log("URL: " + url);
				if(url != null){
					setTimeout(function(){
					chrome.runtime.sendMessage({openThis: url.toString()}); stuff[x].style.backgroundColor = "green";
					}, 5000);
				}
			}
			itterate--;
		}
		
		else{
			finalStop();
		}
		
	}
	var theActualLimit = 0;
	var user = function(url){
				  this.url = url
			 }
	
	function stop(){
		console.log("STOP.");
		console.log("START MODE: " + startMode);
		ensureStop = 1;
		window.clearInterval(timer);
		if(startMode == 0){
			ensureStop2 = 0;
			divs = document.getElementsByClassName("wo9IH");
			itterate = divs.length-1;
			start2();
		}
		
		if(startMode == 1){
			/*var tmpL = document.getElementsByClassName("wo9IH");
			followingDivs = [];
			console.log("TMPL SIZE: " + tmpL.length);
			for(j=0; j<tmpL.length; j++){
				var stuff4 = tmpL[j].getElementsByTagName("*");
				followingDivs.push(new user(stuff4[2].href.toString()));
			}*/
			var shouldUnfollow = calculateDifference();
			
			chrome.runtime.sendMessage({shouldUn: shouldUnfollow});
		}
		
		if(startMode == 2){
			var tmpList = document.getElementsByClassName("wo9IH");
			//tmpList = [0,1,2,3,4,5,6];
			console.log("THE LIST: " + tmpList.length);
			
			var useList = [];
			var test = tmpList[0].getElementsByTagName("*");
			var theIndex = 2;
			for(k=0; k<test.length; k++){
				console.log(k + ": " + test[k].className);
				if("FPmhX notranslate _0imsa " == test[k].className){
					theIndex = k;
					break;
				}
			}
			for(f=0; f<tmpList.length; f++){
				var stuff1 = tmpList[f].getElementsByTagName("*");
				useList.push(new user(stuff1[theIndex].title.toString()));
			}
			
			chrome.runtime.sendMessage({followingListBack: useList});
		}
		
		
		if(startMode == 3) {
			chrome.storage.local.get(["followHistory"], function (result) {
				checkHistoryList = result.followHistory;
				console.log("LIST");
				console.log(checkHistoryList);
				setTimeout(calculateDifference2, 1000);
			});
		}
		
		
		if(startMode == 4) {
			theSpans2 = document.getElementsByClassName("g47SY ");
			theLimitString2 = theSpans2[2].innerHTML.toString();
			theLimit2 = parseInt(theLimitString2.replace(/,/g, ''));
			console.log("THE LIMIT2: " + theLimit2);
			theFollowerLim = theSpans2[1].innerHTML.toString();
			theFollowerLim = parseInt(theFollowerLim.replace(/,/g, ''));
			theFollowerLim = 0.5 * theFollowerLim;
			console.log("FOLLOWER LIM: " + theFollowerLim);
			numToUnfollow = theLimit2 - theFollowerLim;
			console.log("NUM TO UNFOLLOW: " + numToUnfollow);
			//numToUnfollow = 2;
			itterate3 = 0;
			ensureStop5 = 0;
			ensureStop6 = 0;
			chrome.storage.local.get(["followHistory"], function (result) {
				smartUnfollowList = result.followHistory;
				itterate3 = smartUnfollowList.length - 1;
				smartUnfollowStart();
			});
		}
	}
	
	
	var ensureStop2 = 0;
	
	function start2(){
		ensureStop2 = 0;
		timer = setInterval(follow, 7000);
		setTimeout(stop2, 336000);
	}
	
	function stop2(){
		console.log("STOP 2. ");
		ensureStop2 = 1;
		window.clearInterval(timer);
		setTimeout(start2, 336000);
	}
	
	function finalStop(){
		console.log("STOP FINAL.");
		ensureStop = 1;
		ensureStop2 = 1;
		window.clearInterval(timer);
		alert("Cloud: FINISHED WITH CURRENT USER");
	}
	
	function finalStop2(){
		console.log("STOP FINAL.");
		ensureStop = 1;
		ensureStop2 = 1;
		window.clearInterval(timer);
		alert("Cloud: STOPPED");
	}
	
	function finalStop3(){
		console.log("STOP FINAL.");
		ensureStop = 1;
		ensureStop2 = 1;
		window.clearInterval(timer);
		alert("Cloud: YOU SCREWED IT UP, ACTIVITY IS STOPPED. REFRESH THE PAGE AND START IT AGAIN");
	}
	
	
	
	
	
	var toUnfollow = [];
	
	
	function calculateDifference(){
		console.log("IN CALCULATE!");
		if(followersDivs != null && followersDivs.length > 0){
			for(z=0; z<followersDivs.length; z++){
				console.log(z + " IS: " + followersDivs[z].url);
				/*var count = 1;
				for(x=0; x<followersDivs.length; x++){
					console.log("THIS LINK: " + followersDivs[x]);
					if(followingDivs[z] == followersDivs[x]){
						break;
					}
					count++;
				}
				console.log("COUNT: " + count);
				if(count == followersDivs.length){
					console.log("ADDED: " + z);
					toUnfollow.push(z);
				}*/
				var elemen = $( 'li:contains("' + followersDivs[z].url + '")' );
				console.log("ELEMEN: " + elemen.attr('class'));
				if(!elemen.exists() && !isRestricted(followersDivs[z].url)){
					console.log("ADDED: " + z + " - " + followersDivs[z].url );
					toUnfollow.push(followersDivs[z].url);
				}
			}
			
			console.log("TO UNFOLLOW: ");
			console.log(toUnfollow);
			console.log("TESTING: " + testing);
			console.log("SIZE: " + dontUnfollow.length);
			return toUnfollow;
		}
	}
	
	
	var checkHistoryList;
	function calculateDifference2(){
		console.log("IN CALCULATE!");
		console.log("CHECK HISTORY LIST LENTH: " + checkHistoryList.length);
		if(checkHistoryList != null && checkHistoryList.length > 0){
			for(z=0; z<checkHistoryList.length; z++){
				console.log("IS: " + checkHistoryList[z].user);
				/*var count = 1;
				for(x=0; x<followersDivs.length; x++){
					console.log("THIS LINK: " + followersDivs[x]);
					if(followingDivs[z] == followersDivs[x]){
						break;
					}
					count++;
				}
				console.log("COUNT: " + count);
				if(count == followersDivs.length){
					console.log("ADDED: " + z);
					toUnfollow.push(z);
				}*/
				if(window.find(checkHistoryList[z].user)){
					console.log("IS FOLLOWING BACK: " + checkHistoryList[z].user);
					checkHistoryList.splice(z, 1);
				}
			}
			
			console.log("NEW HISTORY: ");
			console.log(checkHistoryList);
			chrome.storage.local.set({followHistory: checkHistoryList}, function () {
				console.log("SET HISTORY!");
			});
			
			chrome.runtime.sendMessage({doSmartUnfolow: true});
		}
	}
	
	var testing = 0;
	function isRestricted(tryThis){
		for(u=0; u<dontUnfollow.length; u++){
			if(tryThis == dontUnfollow[u]){
				testing++;
				return true;
			}
		}
		
		return false;
	}
	
	
	
	
	$.fn.exists = function () {
    return this.length !== 0;
}
	
	
	
	
	
	var theLimit;
	var itterate2 = 0;
	var ensureStop3 = 0;
	var ensureStop4 = 0;
	var timer2;
	var theSpans = document.getElementsByClassName("g47SY ");
	var theLimitString = theSpans[2].innerHTML.toString();
	theLimit = parseInt(theLimitString.replace(/,/g, ''));
	console.log("THE LIMIT: " + theLimit);
	var unfollow = function (){
		console.log("I2: " + itterate2);
		if(itterate2 < unfollowThese.length && ensureStop3 == 0 && theUnfollowButtons!= null){
			
			var elemen = $( 'li:contains("' + unfollowThese[itterate2] + '")' );
			console.log("ELEMEN: " + elemen.attr('class'));
			if(elemen.exists()){
			elemen[0].scrollIntoView();
			elemen[0].style.backgroundColor = "red";
			var elemen2 = elemen.find("button");
			console.log("ELEEN2: " + elemen2.attr('class'));
			elemen2.trigger( "click" );
			setTimeout(function(){ var temp = document.getElementsByClassName("aOOlW -Cab_   "); temp[0].click(); }, 1000);
			}
			itterate2++;
			randomTimeoutForUnfollow = Math.floor((Math.random() * 35) + 30) * 1000;
			console.log("RANDOM: " + randomTimeoutForUnfollow);
			timer2 = setTimeout(unfollow, randomTimeoutForUnfollow);
		}
		
		else{
			unfollowFinalStop();
		}
	}
	
	
	
	
	function unfollowStart(){
		console.log("THE UFNOLLOW LIST");
		console.log(unfollowThese);
		ensureStop3 = 0;
		var randomTimeoutForUnfollow = Math.floor((Math.random() * 35) + 30) * 1000;
		console.log("RANDOM TIME INTERVAL: " + randomTimeoutForUnfollow);
		timer2 = setTimeout(unfollow, randomTimeoutForUnfollow);
		setTimeout(unfollowStop2, 336000);
	}
	
	
	function unfollowStop2(){
		console.log("STOP UNFOLLOW. ");
		ensureStop3 = 1;
		window.clearTimeout(timer2);
		setTimeout(unfollowStart, 180000);
	}
	
	function unfollowFinalStop(){
		console.log("STOP FINAL.");
		ensureStop3 = 1;
		ensureStop4 = 1;
		window.clearTimeout(timer2);
		alert("Clout: DONE UNFOLLOWING");
	}
	
	function unfollowFinalStop2(){
		console.log("STOP FINAL.");
		ensureStop3 = 1;
		ensureStop4 = 1;
		window.clearTimeout(timer2);
		//alert("Cloud: STOPPED");
	}
	
	
	
	
	
	
	
	
	
	var theLimit2;
	var itterate3 = 0;
	var ensureStop5 = 0;
	var ensureStop6 = 0;
	var timer3;
	var theSpans2 = document.getElementsByClassName("g47SY ");
	var theLimitString2 = theSpans2[2].innerHTML.toString();
	theLimit2 = parseInt(theLimitString2.replace(/,/g, ''));
	console.log("THE LIMIT2: " + theLimit2);
	var theFollowerLim = theSpans2[1].innerHTML.toString();
	theFollowerLim = parseInt(theFollowerLim.replace(/,/g, ''));
	theFollowerLim = 0.5 * theFollowerLim;
	var numToUnfollow = theLimit2 - theFollowerLim;
	console.log("NUM TO UNFOLLOW: " + numToUnfollow);
	
	
	var smartUnfollow = function (){
		console.log("I3: " + itterate3);
		if(itterate3 >= 0 && ensureStop5 == 0 && numToUnfollow>0){
			if(checkDate(smartUnfollowList[itterate3].date)){
			var elemen = $( 'li:contains("' + smartUnfollowList[itterate3].user + '")' );
			console.log("ELEMEN: " + elemen.attr('class'));
			if(elemen.exists()){
			elemen[0].scrollIntoView();
			elemen[0].style.backgroundColor = "red";
			var elemen2 = elemen.find("button");
			console.log("ELEEN2: " + elemen2.attr('class'));
			elemen2.trigger( "click" );
			setTimeout(function(){ numToUnfollow--; var temp = document.getElementsByClassName("aOOlW -Cab_   "); temp[0].click(); }, 1000);
			}
			randomTimeoutForUnfollow = Math.floor((Math.random() * 35) + 30) * 1000;
			console.log("RANDOM: " + smartRandomTimeoutForUnfollow);
			timer3 = setTimeout(smartUnfollow, smartRandomTimeoutForUnfollow);
			}
			
			
			smartUnfollowList.splice(itterate3, 1);
			itterate3--;
		}
		
		else{
			if(numToUnfollow > 0){
				alert("CLOUT: TRIED TO SMART UNFOLLOW UP TO SET RATIO, BUT REACHED END OF STORED FOLLOWS. YOU'LL HAVE TO DO RAW UNFOLLOW TO MAKE SURE ACCOUNT IS ONLY FOLLOWING PEOPLE WHO ARE FOLLOWING BACK! (OR IF YOU'RE OKAY WITH THE RATIO THEN DO RAW FOLLOW)");
				smartUnfollowFinalStop();
			}
			
			else{
				smartUnfollowFinalStopAndRestart();
			}
			
		}
	}
	
	function checkDate(date){
		var year = parseInt(date.substring(0, 4),10);
		var month = parseInt(date.substring(4,6),10);
		var day = parseInt(date.substring(6,8),10);
		var today = new Date();
		if(today.getFullYear > year){
			return true;
		}
		
		if(today.getMonth() > month){
			return true;
		}
		
		if(today.getDate() > day){
			return true;
		}
		
		return false;
			
	}
	
	
	function smartUnfollowStart(){
		ensureStop5 = 0;
		var smartRandomTimeoutForUnfollow = Math.floor((Math.random() * 35) + 30) * 1000;
		console.log("RANDOM TIME INTERVAL: " + smartRandomTimeoutForUnfollow);
		timer2 = setTimeout(unfollow, randomTimeoutForUnfollow);
		setTimeout(smartUnfollowStop2, 336000);
	}
	
	
	function smartUnfollowStop2(){
		console.log("STOP SMART UNFOLLOW. ");
		ensureStop5 = 1;
		window.clearTimeout(timer3);
		setTimeout(smartUnfollowStart, 180000);
	}
	
	function smartUnfollowFinalStop(){
		console.log("STOP SMART FINAL.");
		ensureStop5 = 1;
		ensureStop6 = 1;
		window.clearTimeout(timer3);
		chrome.storage.local.set({followHistory: smartUnfollowList}, function () {
			console.log("UPDATED LIST!");
			console.log(smartUnfollowList);
		});
		alert("Clout: DONE SMART UNFOLLOWING");
	}
	
	function smartUnfollowFinalStopAndRestart(){
		console.log("STOP SMART FINAL.");
		ensureStop5 = 1;
		ensureStop6 = 1;
		window.clearTimeout(timer3);
		chrome.storage.local.set({followHistory: smartUnfollowList}, function () {
			console.log("UPDATED LIST!");
			console.log(smartUnfollowList);
		});
		chrome.runtime.sendMessage({doneSmartUnfollowing: true});
	}
	
	function smartUnfollowFinalStop2(){
		console.log("STOP FINAL.");
		ensureStop5 = 1;
		ensureStop6 = 1;
		window.clearTimeout(timer3);
		
		if(smartUnfollowList != null) {
		chrome.storage.local.set({followHistory: smartUnfollowList}, function () {
			console.log("UPDATED LIST!");
			console.log(smartUnfollowList);
		});
		}
		//alert("Cloud: STOPPED");
	}
	/*function setTimeout(callback, delay) {
    let params = Array.slice(arguments, 2);
    var id = timer.setTimeout(function(worker) {
      try {
        // Addon Worker might be unloaded at this point
        if (this._addonWorker === null) {
          // Clear interval so it isn't called anymore
          this.clearTimeout(id);
          return;
        }
        callback.apply(null, params);
      } catch(e) {
        worker._asyncEmit('error', e);
      }
    }.bind(this), delay, this._addonWorker);
    
    return id;
  }
  
  
  
  function setInterval(callback, delay) {
    let params = Array.slice(arguments, 2);
    var id = timer.setInterval(function(worker) {
      try {
        // Addon Worker might be unloaded at this point
        if (this._addonWorker === null) {
          // Clear interval so it isn't called anymore
          this.clearInterval(id);
          return;
        }
        callback.apply(null, params); 
      } catch(e) {
        worker._asyncEmit('error', e);
      }
    }.bind(this), delay, this._addonWorker);
    
    return id;
  }*/
	
	
	
	
	/*if(divs[i] != null){
					if(buttons[i].innerHTML != "Following" && buttons[i].innerHTML != "Requested"){
						buttons[i].click();
					}
					var name = divs[i].getElementsByClassName("FPmhX notranslate _0imsa ");
					console.log("DIVS " + i + ": " + name[0].innerHTML);
				}*/
				
				//console.log("CLASS NAME: " + stuff[x].className);


