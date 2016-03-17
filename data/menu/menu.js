function deletePosts()
{
	addon.port.emit('menu-delete');
}

function extract()
{
	addon.port.emit('menu-extract');
}
