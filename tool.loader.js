
var toolloader = {
    run: function() {
		if (!Memory.mysources) {
			console.log('Loading sources...');
			Memory.mysources=[];
			for (var ksp in Game.spawns) {
					var sou=Game.spawns[ksp].room.find(FIND_SOURCES)
					for (var kso in sou) {
						//console.log(JSON.stringify(sou[kso]))
						Memory.mysources[kso]={'pos':sou[kso].pos, 'id':sou[kso].id}
					}
			}
			console.log(JSON.stringify(Memory.mysources))
		}
    }
}

module.exports = toolloader
