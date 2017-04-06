(function() {

  // Helper function to get form data in the supported format
  function getFormDataString(formEl) {
    var formData = new FormData(formEl),
        data = [];

    for (var keyValue of formData) {
      data.push(encodeURIComponent(keyValue[0]) + "=" + encodeURIComponent(keyValue[1]));
    }

    return data.join("&");
  }

  // Fetch the form element
  var formEl = document.getElementById("contact-form--js");

  // Override the submit event
  formEl.addEventListener("submit", function (e) {
    e.preventDefault();

    var request = new XMLHttpRequest();

    request.addEventListener("load", function () {
      if (request.status === 302) { // CloudCannon redirects on success
        $("#thank_you").fadeIn();
        setTimeout(function(){
          $("#thank_you").fadeOut();
        }, 3000);
      }
    });

    request.open(formEl.method, formEl.action);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(getFormDataString(formEl));
  });
});
