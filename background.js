var xhr = new XMLHttpRequest();
//xhr.open("GET", "https://api.example.com/data.json", true);
xhr.open("GET", "http://128.199.148.75:8000/status", true);
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    // WARNING! Might be evaluating an evil script!
    // var resp = eval("(" + xhr.responseText + ")");
    document.getElementById("statusflag").innerHTML = xhr.responseText;
  }
}
xhr.send();

var xhr1 = new XMLHttpRequest();
xhr1.open("GET", "http://128.199.148.75:8000/sessionNumber", true);
xhr1.onreadystatechange = function () {
  if (xhr1.readyState == 4) {
    // WARNING! Might be evaluating an evil script!
    // var resp = eval("(" + xhr.responseText + ")");
    document.getElementById("sessionNumber").innerHTML = xhr1.responseText;
  }
}
xhr1.send();

var previous = ''
var prev_tab_id = -100
var buff = new Date().getTime() / 1000;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (previous == ''){
    var res = new Date().getTime() / 1000 ;

    if (Math.abs(res-buff) > 5)
    {
      var http = new XMLHttpRequest();
      http.open("POST", "http://128.199.148.75:8000/push_url", true);
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      var params = tab.url;
      http.send("i_url="+params);
      prev_tab_id = tabId;

      buff = res;

    }

  }
  else{
    if ((previous != tab.url) && (prev_tab_id != tabId)){

      var res = new Date().getTime() / 1000 ;

      if (Math.abs(res-buff) > 5)
      {
        var http = new XMLHttpRequest();
        http.open("POST", "http://128.199.148.75:8000/push_url", true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var params = tab.url;
        http.send("i_url="+params);
        prev_tab_id = tabId;

        buff = res;

      }

    }
  }
});

chrome.tabs.onCreated.addListener(function(tab) {
   if (tab.url != 'chrome://newtab/')
   {
     var res = new Date().getTime() / 1000 ;
     if (Math.abs(res-buff) > 5)
     {
       var http = new XMLHttpRequest();
       http.open("POST", "http://128.199.148.75:8000/push_url", true);
       http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       var params = tab.url;
       http.send("i_url="+params);
       prev_tab_id = tabId;

       buff = res;

     }

   }
});


chrome.tabs.onActivated.addListener(function(tab_info) {
    chrome.tabs.get (tab_info.tabId , function (tab) {

        if (tab.url != 'chrome://newtab/')
        {
          var res = new Date().getTime() / 1000 ;
          if (Math.abs(res-buff) > 5)
          {
            var http = new XMLHttpRequest();
            http.open("POST", "http://128.199.148.75:8000/push_url", true);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            var params = tab.url;
            http.send("i_url="+params);
            prev_tab_id = tabId;

            buff = res;

          }

        }

    });
});


// This function is called onload in the popup code
function getPageDetails(callback) {
    // Inject the content script into the current page
    chrome.tabs.executeScript(null, { file: 'content.js' });
    // Perform the callback when a message is received from the content script
    chrome.runtime.onMessage.addListener(function(message)  {
        // Call the callback function
        callback(message);
    });
};
