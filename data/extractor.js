console.log('extractor: started');

var elems = getElementsByIds(/mall_post_\d+/i, document.body);

if (elems.length > 0)
{
	elems = elems.filter(function(item)
	{
		return shouldKeep(item, self.options.check);
	});
	var links = extractLinks(elems);

	var child = document.body.firstChild;

	while (child)
	{
		document.body.removeChild(child);
		child = document.body.firstChild;
	}

	var text = document.createElement('textarea');
	text.value = links.join('\n');
	text.rows = 25;
	text.cols = 75;
	document.body.appendChild(text);
}

console.log('extractor: done');




function extractLinks(elems)
{
	var links = [];

	for (var index = 0; index < elems.length; index++)
	{
		var target = elems[index].firstChild.children[1].firstChild.firstChild;
		links.push(target.href);
	}

	return links;
}

function shouldKeep(elem, check)
{
	try
	{
		var target = elem.firstChild.children[1].firstChild.firstChild.firstChild.firstChild;
		if (target.innerHTML === check)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	catch (exc)
	{
		return false;
	}
}

function getElementsByIds(pattern, root)
{
	var result = [];
	var toProcess = [];

	toProcess.push(root);

	while (toProcess.length > 0)
	{
		var elem = toProcess.pop();
		if (elem.id.search(pattern) >= 0)
		{
			result.push(elem);
		}
		for (var index = 0; index < elem.children.length; index++)
		{
			toProcess.push(elem.children[index]);
		}
	}

	return result;
}
