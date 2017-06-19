global.mover= require ('tool.mover');
var loader= require ('tool.loader');
var spawner= require ('tool.spawner');
var topbuilder= require ('tool.builder');
var harverster= require ('role.harvester');
var upgrader= require ('role.upgrader');
var builder = require ('role.builder');

//loader.run();

console.log('Launching script...')


module.exports.loop = function () {

	spawner.run();
	topbuilder.run();

	builder.run()

	harverster.run();
	upgrader.run();



}
