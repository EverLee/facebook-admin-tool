var textArea = document.getElementById('edit-box');
var message = document.getElementById('message-box');

self.port.on('prep', prep);
document.getElementById('ok-button').onclick = okButton;

function prep(msg, content)
{
	textArea.focus();
	textArea.value = content;
	message.innerHTML = msg;
}

function okButton()
{
	console.log('OK button clicked');
	self.port.emit('ok-button', textArea.value);
	textArea.value = 'Clicked!';
}

console.log('prompt.js loaded');
