$(document).ready(function() {
    var user = prompt("Please enter your name");

    if (user != null) {
        var ws = new WebSocket("localhost:9601");
        var title = "Chatbox";
        var windowState = true;

        ws.addEventListener("open", function(e) {
            $("#chatbox").append("Connection established - Welcome ", user, " !<hr />");
        });

        ws.addEventListener("message", function(msg) {

            var data = JSON.parse(msg.data);
            $("#chatbox").append(data.author + " : " + data.message + "<br />");

            if (!windowState) {
                document.title = " New Message ";
            }
        });

        $("#input").keypress(function(e) {
            if (e.keyCode == 13) {
                var msg = $("#input").val();
                e.preventDefault(); //Prevent default functionality from triggering.

                if (msg.length > 0) { //Use JSON to package message, and send to server.
                    var data = JSON.stringify({author: user, message: msg });
                    ws.send(data);

                    $("#input").val("");
                }
            }
        });

        $(window).blur(function(e) {
            windowState = false;
        });

        $(window).focus(function(e) {
            windowState = true;
            document.title = title;
        });
    }
});
