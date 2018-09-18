		var followed = document.getElementsByClassName("tc8A9");
		var toFollow = document.getElementsByClassName("_5f5mN       jIbKX  _6VtSN     yZn4P   "); 
		var toFollow2 = document.getElementsByClassName(" ffKix oF4XW sqdOP  L3NKy      ");
		var followedBy; 
		console.log("TO FOLLOW LENGTH: " + toFollow.length);
		console.log("TO FOLLOW2 LENGTH: " + toFollow2.length);
		
		
		
		if(toFollow != null && toFollow.length != 0){
			console.log("HERECONT");
			if(followed != null && followed.length != 0 && normalPerson() == true){
				 console.log("HERECONT2");
				followedBy = followed[0].getElementsByTagName("*").length;
				var blob = followed[0].innerHTML + "";
				if(blob.indexOf("+") != -1) {
					var valStr = blob.substring(blob.indexOf("+")+2, blob.indexOf("more")-1);
					console.log("FOLLOWED BY: " + followedBy.length);
					console.log("FOLLOWED BY TEXT: " + valStr);
					console.log("FOLLOW LENGTH: " + valStr.length);
					followedBy = parseInt(valStr);
				}
				if(followedBy > 3){
				toFollow[0].click();
				chrome.storage.local.get(["followHistory"], function (result) {
					var thisUser = document.getElementsByClassName("AC5d8 notranslate");
					thisUser = thisUser[0].innerHTML.toString();
					var today = new Date();
					var dd = today.getDate();
					var mm = today.getMonth()+1; //January is 0!
					var yyyy = today.getFullYear();

					if(dd<10) {
						dd = '0'+dd
					} 

					if(mm<10) {
						mm = '0'+mm
					} 

					//today = mm + '/' + dd + '/' + yyyy;
					today = yyyy + mm + dd + "";
					console.log("today: " + today);
					var tmpHistory = result.followHistory;
					console.log(tmpHistory);
					var tmpFollow = { user: thisUser, date: today};
					tmpHistory.unshift(tmpFollow);
					console.log(tmpHistory);
					chrome.storage.local.set({followHistory: tmpHistory}, function () {
						
					});
				});
				chrome.runtime.sendMessage({closeThis: true, wasClicked: true});
				}
				
				else{
				chrome.runtime.sendMessage({closeThis: true});
				}
			}
		
			
			else{
				chrome.runtime.sendMessage({closeThis: true});
			}
		}
		
		
		else if(toFollow2 != null && toFollow2.length != 0){
			console.log("HERECONT");
			if(followed != null && followed.length != 0 && normalPerson() == true){
				console.log("HERECONT2");
				followedBy = followed[0].getElementsByTagName("*").length;
				var blob = followed[0].innerHTML + "";
				if(blob.indexOf("+") != -1) {
					var valStr = blob.substring(blob.indexOf("+")+2, blob.indexOf("more")-1);
					console.log("FOLLOWED BY: " + followedBy.length);
					console.log("FOLLOWED BY TEXT: " + valStr);
					console.log("FOLLOW LENGTH: " + valStr.length);
					followedBy = parseInt(valStr);
				}
				if(followedBy > 1){
				toFollow2[0].click();
				chrome.storage.local.get(["followHistory"], function (result) {
					var thisUser = document.getElementsByClassName("AC5d8 notranslate");
					thisUser = thisUser[0].innerHTML.toString();
					var today = new Date();
					var dd = today.getDate();
					var mm = today.getMonth()+1; //January is 0!
					var yyyy = today.getFullYear();

					if(dd<10) {
						dd = '0'+dd
					} 

					if(mm<10) {
						mm = '0'+mm
					} 

					//today = mm + '/' + dd + '/' + yyyy;
					today = yyyy + mm + dd + "";
					console.log("today: " + today);
					var tmpHistory = result.followHistory;
					console.log(tmpHistory);
					var tmpFollow = { user: thisUser, date: today};
					console.log(tmpFollow);
					tmpHistory.unshift(tmpFollow);
					console.log(tmpHistory);
					chrome.storage.local.set({followHistory: tmpHistory}, function () {
						
					});
				});
				chrome.runtime.sendMessage({closeThis: true});
				}
				
				else{
				chrome.runtime.sendMessage({closeThis: true});
				}
			}
		
			
			else{
				chrome.runtime.sendMessage({closeThis: true});
			}
		}
		
		else{
			console.log("NOTHING");
			
			//window.location.replace(plzwork[1].href);
			//chrome.runtime.sendMessage({closeThis: true});
		}
		
	
	var thisIDEE;
	var noRepeat = 0;
	
	
	function normalPerson(){
		var theSpans = document.getElementsByClassName("g47SY ");
		var theLimitString = theSpans[1].title.toString();
		var theLimit = parseInt(theLimitString.replace(/,/g, ''));
		console.log("THE LIMIT: " + theLimit);
		if(theLimit > 2000){
			return false;
		}
		
		else return true;
	}
	
	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
		console.log("RECIEVED MESSAGE CONTENT!");
		if(message.followers == true && noRepeat == 0) { noRepeat = 1; openFollowing(2); diffMode = null; }
		
		if(message.following == true && noRepeat == 0) { noRepeat = 1; openFollowing(1); diffMode = null; }
		
		if(message.followerSmart == true && noRepeat == 0) { noRepeat = 1; diffMode = message.mode; openFollowing(1); }
	
		if(message.followingSmart == true && noRepeat == 0) { noRepeat = 1; diffMode = message.mode; openFollowing(1); }
	});
		
	var diffMode; 
		
		
		
	function openFollowing(index){
		var plzwork = document.getElementsByClassName(" _81NM2");
			console.log("PLZ WORK: " + plzwork.length);
			console.log("HREF: " +plzwork[index].href);
			if(plzwork[index] != null){
				plzwork[index].click();
				if(diffMode != null) { index = diffMode; console.log("DIFF MODE IS: " + diffMode); }
				setTimeout(function() { startScrollin(index); }, 2000);
				
			}
	}



	function startScrollin(index){
		chrome.runtime.sendMessage({beginBack: true, ind: index});
	}
		
		
		
		
	function addLast(theList, user, date) {
    // Create a new Node
    var node = {
      user: user,
	  date: date,
      next: null
    }
    
    if(theList.count === 0) {
      // If this is the first Node, assign it to head
      theList.head = node;
    } else {
      // If not the first node, link it to the last node
      theList.tail.next = node;
    }
    
    theList.tail = node;
    
    theList.count++;
	}	
		 	
		
		
		
	
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
		
		
		
		
	