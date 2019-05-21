const create = () => {
	var node = document.createElement('style');
	node.innerHTML = 'body { color: red }';
	document.body.appendChild(node);
};

const destroy = () => {
	console.log("myExtension destroyed!");
};

module.exports = {
	create,
	destroy
}