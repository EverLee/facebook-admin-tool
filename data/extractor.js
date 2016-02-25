console.log('extractor: started');

var elems = getElementsByIds(/mall_post_\d+/i, document.body);

if (elems.length > 0)
{
	elems = elems.filter(isSoldPost);
	var links = extractLinks(elems);
	document.innerHTML = links.join('\n');
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

function isSoldPost(elem)
{
	try
	{
		var target = elem.firstChild.children[1].firstChild.firstChild.firstChild.firstChild;
		if (target.innerHTML === '(SOLD)')
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
