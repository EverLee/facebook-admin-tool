function deletePosts()
{
	addon.port.emit('menu-delete');
}

function extractSold()
{
	addon.port.emit('menu-sold');
}

function extractArchived()
{
	addon.port.emit('menu-archived');
}
