import * as package from './package.json'

export default {
	name: package.name,
	version: package.version,
	description: package.description,
	author: package.author,
	website: package.website,
	isEnabled: false,
	dependencies: ["myImportantExtension"],
	conflicts: ["veryBadExtension"],
	create: () => {
		console.log("myExtension created!");
	},
	destroy: () => {
		console.log("myExtension destroyed!");
	},
}
