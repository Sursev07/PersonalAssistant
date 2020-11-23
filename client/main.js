function login(event) {
  event.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();
 console.log(email, password)
  //ngirim ke server untuk action login
  $.ajax({
    method: "POST",
    url: "http://localhost:3001/login",
    data: { email, password },
  }).done(function (response) {
    console.log("Berhasil login", response);
    localStorage.token = response.access_token
    $('#loginForm').hide()
    $('#homePage').show()
  })
  .fail(error => {
    console.log(error.responseJSON.message)
    $('#messageError').text(error.responseJSON.message)
  });
}

function sayPassword(event){
    event.preventDefault()
    //listen apa yang diucapkan
    var recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.onresult = function(event) {
        console.log(event.results[0][0].transcript, '>>>>')
        if (event.results.length > 0) {
            //transcript
            $('#password').val(event.results[0][0].transcript)
     }
    }

    recognition.onend = function(event) {
        //menampilkan di field password
        //$('#password').val()
    }

    recognition.start()
}


function speaks(){
    var recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.onresult = function(event) {
        console.log(event.results[0][0].transcript, '>>>>')
        if (event.results.length > 0) {
            //transcript
            $('#textToSend').text(event.results[0][0].transcript)
     }
    }

    recognition.onend = function(event) {
        //menampilkan di field password
        sendVoice($('#textToSend').text())
    }

    recognition.start()
}

function say(text) {
    responsiveVoice.speak(text, "UK English Male")
}

function sendVoice(voiceText){
    console.log(voiceText, '>>>')
    $.ajax({
        method: "POST",
        url: "http://localhost:3001/voice",
        data: { voiceText},
      }).done(function (response) {
          console.log(response.message)
        $('#textToSend').text(response.message)
        say(response.message)
      })
    //   .fail(error => {
    //     console.log(error.responseJSON.message)
    //     $('#messageError').text(error.responseJSON.message)
    //   });
}