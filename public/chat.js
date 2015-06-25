window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;

            if (text.match(/(http|ftp|https):\/\/([\w-]+\.[\w-]+[\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-]?)/)) {
                var link = text.match(/(http|ftp|https):\/\/([\w-]+\.[\w-]+[\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-]?)/);
                console.log(link);
                var regexd = '<a href="' + link[0] + '"> ' + link[0] + ' </a>';
                text = text.replace(/(http|ftp|https):\/\/([\w-]+\.[\w-]+[\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-]?)/, regexd);
                socket.emit('send', {message: text, username: name.value});
            }
            else {
            socket.emit('send', { message: text, username: name.value });
            }
        }
    };
 
}