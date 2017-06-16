var roles={'harvester':{'max':3, 'body':[WORK,CARRY,MOVE], "cost":200},'upgrader':{'max':3, 'body':[WORK,CARRY,MOVE], "cost":200}};

var toolspawner = {
	run: function() {
		for (var kr in roles) {
			var list= _.filter(Game.creeps, (creep) => creep.memory.role == kr);
			if (list.length<roles[kr].max) {
				this.spawnNew(kr)
				break
			}
		}
	},
	spawnNew: function(kr) {
		for (var ks in Game.spawns) {
			if (Game.spawns[ks].energy>roles[kr].cost) {
				var newCreep = Game.spawns[ks].createCreep(roles[kr].body, undefined, {role: kr, action:'sp', stuck:0, cx:0, cy:0});
				console.log("Spawning new "+kr+" ["+newCreep+"]");
				break
			}
			else {
				//console.log("Not enought energy to spawn "+kr+" "+Game.spawns[ks].energy+"/"+roles[kr].cost);
			}
		}
	}

}
module.exports = toolspawner
