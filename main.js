var loader= require ('tool.loader');
var spawner= require ('tool.spawner');
var harverster= require ('role.harvester');
var upgrader= require ('role.upgrader');

//loader.run();


module.exports.loop = function () {

	spawner.run();

	harverster.run();
	upgrader.run();



}
