var toolmover = {
	run: function (cr) {
	},
	setPathTo: function (cr, res) {
		var path=cr.pos.findPathTo(res)
		if (path) {
			cr.memory.pathToRes=Room.serializePath(path)
			cr.memory.resId=res.id
			cr.say("Parto!")
			return true
		}
		return false
	},
	moveTo(cr, action, option=false) {
		var ret=0
		var isroad=cr.pos.lookFor(LOOK_STRUCTURES)
//		console.log(JSON.stringify(isroad))
		if (isroad.length==0) {
		    //console.log(JSON.stringify(isroad))
		    var cposkey=String(cr.pos.x)+"-"+String(cr.pos.y);
    		//console.log(JSON.stringify(isroad))
    		if (!global.roadable[cr.room.name][cposkey]) {
    		    global.roadable[cr.room.name][cposkey]=1
    		}
    		else {
    		    global.roadable[cr.room.name][cposkey]++
    		}
		}

		if (option) {
			var act=cr[action](Game.getObjectById(cr.memory.resId), option)
		}
		else {
			var act=cr[action](Game.getObjectById(cr.memory.resId))
		}
		if (act==ERR_NOT_IN_RANGE) {
			if (cr.memory.cx==cr.pos.x && cr.memory.cy==cr.pos.y) {
					cr.memory.stuck++;
					if (cr.memory.stuck>1) {
						cr.memory.action='idl'
						cr.memory.stuck=0
						cr.say("Bloccato :(")
						ret=-1
					}
			}
			else {
				cr.memory.stuck=0
			}
			if (cr.memory.action!='idl') {
				cr.memory.cx=cr.pos.x
				cr.memory.cy=cr.pos.y
				cr.moveByPath(cr.memory.pathToRes)
				ret=1
			}

		}
		else if (act==ERR_INVALID_TARGET) {
			cr.memory.action='idl'
			ret=-2
		}
		else if (act==ERR_FULL) {
		    cr.memory.action='idl'
		    ret=-3
		}
		else if (act==0) {
			ret=2;
		}
		else {
			console.log("moveTo error ["+act+"] on "+action+" for "+cr.name)
			cr.memory.action='idl'
			ret=-3
		}
		return ret
	}

}
module.exports = toolmover
