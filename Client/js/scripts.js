console.log("file detected");

$(document).ready(function(){
  console.log("query is loaded");

  $("#submitButton").click(()=>{
    let data = {
      user : $("#user").val(),
      message: $("#message").val()
    };
    let value =$('#number').val();
    let signal = {userNumber: value};
    $.post("http://localhost:3000",signal ,(response)=>{
      console.log("server has responded!");
      console.log("The server sent the following", response)
      $("#result").html("Your message has beeb received by the server")
    });
  });

  $("#mSubmit").click(()=>{
    let data = {
      user : $("#user").val(),
      message: $("#message").val()
    };

    $.post("http://localhost:3000",data ,(response)=>{
      console.log("server has responded!");
      console.log("The server sent the following", response)
      $("#result").html("Your message has beeb received by the server")
    });
  });



})
