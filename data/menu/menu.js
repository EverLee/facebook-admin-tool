function deletePosts()
{
	addon.port.emit('menu-delete');
}

function extract()
{
	addon.port.emit('menu-extract');
}

function extractold()
{
	var ageInput = document.getElementById('age');
	if (!isNaN(parseFloat(ageInput.value))
	{
		ageInput.value = 30;
		return;
	}

	addon.port.emit('menu-extract-old', parseFloat(ageInput.value));
}
