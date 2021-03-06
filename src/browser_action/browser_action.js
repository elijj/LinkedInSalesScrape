function submitVals() {
  var scrapeQuery = {};

  scrapeQuery.phrases = document.getElementById("phrases").value;
  scrapeQuery.domain = document.getElementById("domain").value;
  scrapeQuery.location = document.getElementById("location").value;
  scrapeQuery.pages = Number(document.getElementById("pages").value);
  scrapeQuery.emailtype = document.getElementById("emailtype").value;
  scrapeQuery.saveAsLead = document.getElementById("saveAsLead").checked;
  scrapeQuery.skippedSaved = document.getElementById("skippedSaved").checked;

  //send request to the injected script
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {"message": "submit_scrape_query", options: scrapeQuery}, function (resp) {
    })
  });

  event.preventDefault();
}

//add listener for browser_action form
document.getElementById("scraperForm").onsubmit = submitVals;

//listen for message/response from injected script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message == "query_results") {
    copyResults(request.data);
    var $toastContent = $('<span>Your results have been copied to your clipboard. Open excel and paste!</span>');
    Materialize.toast($toastContent, 3000);
  }
});



function copyResults(message) {
  var input = document.createElement("textarea");
  document.body.appendChild(input);
  input.value = message;
  input.focus();
  input.select();
  document.execCommand("Copy");
  input.remove();
}
var originalElement;
//initialize CSS animations
$(document).ready(function() {
  $("select").material_select();
  $("#instructions").hide();

  $(".info").click(function(){
    $("#scraperForm").toggle();
    $("#instructions").toggle();
  })
});
