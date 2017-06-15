var loader= require ('tool.loader');
var spawner= require ('tool.spawner');
var harverster= require ('role.harvester');

//loader.run();


module.exports.loop = function () {

	spawner.run();

	harverster.run();



}
