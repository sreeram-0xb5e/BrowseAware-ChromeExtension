function clickDiverted()
{

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://128.100.148.75:8000/diverted", false);
  xhr.send();
  var result = xhr.responseText;

  var stat = new XMLHttpRequest();
  xhr.open("GET", "http://128.100.148.75:8000/status", false);
  xhr.send();
  var stat_res = xhr.responseText;

  if (stat_res == "User hasnt Logged In")
  {
    document.getElementById("feedbackstatusflag").innerHTML = "Please LogIn";
  }
  else {
  document.getElementById("feedbackstatusflag").innerHTML = "Your Response has been Recorded! - Diverted";
  }


}


 document.getElementById("diverted_button").addEventListener('click', clickDiverted);


 function clickNotDiverted()
 {

   var xhr = new XMLHttpRequest();
   xhr.open("GET", "http://128.100.148.75:8000/notdiverted", false);
   xhr.send();
   var result = xhr.responseText;

   var stat = new XMLHttpRequest();
   xhr.open("GET", "http://128.100.148.75:8000/status", false);
   xhr.send();
   var stat_res = xhr.responseText;

   if (stat_res == "User hasnt Logged In")
   {
     document.getElementById("feedbackstatusflag").innerHTML = "Please LogIn";
   }
     else {
   document.getElementById("feedbackstatusflag").innerHTML = "Your Response has been Recorded! - Not Diverted";
 }

 }

  document.getElementById("not_diverted_button").addEventListener('click', clickNotDiverted);


  function clicklogout()
  {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://128.100.148.75:8000/logout", false);
    xhr.send();
    var result = xhr.responseText;

    document.getElementById("feedbacklogoutflag").innerHTML = "Log Out.....";

  }

 
   document.getElementById("logout_button").addEventListener('click', clicklogout);


   document.getElementById("redirect_button").onclick = function () {
          chrome.windows.create({url: "http://128.100.148.75:8000/feedback"});
       };

    document.getElementById("logout_button").addEventListener('click', clicklogout);



