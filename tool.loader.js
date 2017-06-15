
var toolloader = {
    run: function() {
        console.log('Loading...');
		Memory.mysources=[];
		for (var ksp in Game.spawns) {
				var sou=Game.spawns[ksp].room.find(FIND_SOURCES)
				for (var kso in sou) {
					Memory.mysources[kso]={'con':0, 'max':1}
				}
		}

		if (!Memory.maxcreep) {
			var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
		}



		console.log(JSON.stringify(Memory.mysources))
    }

}

module.exports = toolloader
