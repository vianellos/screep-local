global.mover= require ('tool.mover');
var loader= require ('tool.loader');
var spawner= require ('tool.spawner');
var topbuilder= require ('tool.builder');
var harverster= require ('role.harvester');
var upgrader= require ('role.upgrader');
var builder = require ('role.builder');

//loader.run();
global.roadable=[]
global.buildRoad=[]
global.roadReset=Game.time+10

console.log('Launching script...')


module.exports.loop = function () {
    
    if (Game.time>global.roadReset) {
        for (var kr in Game.rooms) {
            var roads=global.roadable[kr]
            console.log(JSON.stringify(roads))
            roads=roads.sort(function(a,b) {
                return a - b;
            });
            console.log(JSON.stringify(roads))
            var maxroad=5;
            var numroad=0;
            for (var cpk in roads) {
                if (numroad<maxroad) {
                    var ps=cpk.split("-")
                    global.buildRoad[kr][cpk]={'pos':{'x':ps[0], 'y':ps[1]}}
                    numroad++
                    console.log("Nuova strada in lista "+cpk)
                }
    	    }
        }
        global.roadReset=Game.time+100
        console.log("Resetting roads counter...")
        global.roadable=[]
    }

	spawner.run();
	topbuilder.run();

	builder.run()

	harverster.run();
	upgrader.run();



}
