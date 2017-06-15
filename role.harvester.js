var roleharvester = {
    run: function() {
		var listh= _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
		for (var kh in listh) {
			this.harvest(listh[kh])
		}
    },
	harvest: function(cr) {
		console.log(cr.memory.action)

		switch(cr.memory.action) {
			case "sp":
				if (cr.spawning!=true) {
					if (this.findResource(cr)) {
						cr.memory.action='mo'
					}
					else {
						cr.memory.action='idl'
					}
				}
			break;
			case 'idl':
				console.log(cr.name + " is idle.")
				if (this.findResource(cr)) {
					cr.memory.action='mo'
				}
			break;
			case 'mo':
				this.moveToRes(cr)
			break;
		}
	},
	findResource: function(cr) {
		let goals = _.map(cr.room.find(FIND_SOURCES), function(source) {
		    // We can't actually walk on sources-- set `range` to 1
		    // so we path next to it.
		    return { pos: source.pos, range: 1 };
		});
		//console.log(JSON.stringify(cr.pos))
	 	var fpath=PathFinder.search(cr.pos, goals)
		//path.path.unshift(cr.pos)
		console.log(JSON.stringify(fpath.path))

		if (fpath.incomplete==false) {
			var spath=this.serializePath(fpath.path)
			//console.log(JSON.stringify(spath))
			cr.memory.pathToRes=spath
			return true
		}
		else {
			return false
		}
	},
	moveToRes: function(cr) {
		console.log(JSON.stringify(cr.memory.pathToRes))
		console.log(JSON.stringify(Room.deserializePath(cr.memory.pathToRes)))
		//var res=cr.moveByPath(cr.memory.pathToRes)
		console.log("moving")
		console.log(JSON.stringify(cr.memory.pathToRes))
		console.log(res)
		/*if (res==-5){
			cr.memory.action='idl';
		}*/
	},
	serializePath(pt) {
		var st="";

		for (var kp in pt) {
			console.log(JSON.stringify(pt[kp]))
			console.log(JSON.stringify(pt[kp].x))
			console.log(JSON.stringify(pt[kp].y))
			st+=String(pt[kp].x)+String(pt[kp].y)
		}
		console.log(JSON.stringify(st))
		return st
	}
}

module.exports = roleharvester
