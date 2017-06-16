var roleupgrader = {
    run: function() {
		var listh= _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
		for (var kh in listh) {
			this.upgrade(listh[kh])
		}
    },
	upgrade: function(cr) {

		switch(cr.memory.action) {
			case "sp":
				if (cr.spawning!=true) {
					this.findResource(cr)
				}
			break;
			case 'idl':
				if (cr.carry.energy<cr.carryCapacity) {
					this.findResource(cr)
				}
				else {
					this.findController(cr)
				}
			break;
			case 'ha':
				this.harvestRes(cr)
			break;
			case 'fs':
				this.findController(cr)
			break;
			case 'cb':
				this.upgradeCon(cr)
			break;
		}
	},
	findResource: function(cr) {
		console.log(cr.name+ " is looking for a resource")
		var res=cr.pos.findClosestByPath(FIND_SOURCES)
		cr.memory.action='idl'
		if (res) {
			//console.log(JSON.stringify(res))
			var path=cr.pos.findPathTo(res)
			if (path) {
				cr.memory.pathToRes=Room.serializePath(path)
				cr.memory.resId=res.id
				console.log(cr.name+ " found resource "+res.id)
				cr.memory.action='ha'
				return true
			}
		}
		return false
	},
	harvestRes: function(cr) {
		if (cr.carry.energy<cr.carryCapacity) {
			var har=cr.harvest(Game.getObjectById(cr.memory.resId))
			if (har==ERR_NOT_IN_RANGE) {
				if (cr.memory.cx==cr.pos.x && cr.memory.cy==cr.pos.y) {
						cr.memory.stuck++;
						console.log(cr.name + "is stuck num "+cr.memory.stuck)
						if (cr.memory.stuck>2) {
							cr.memory.action='idl'
							cr.memory.stuck=0
						}
				}
				else {
					cr.memory.stuck=0
				}
				if (cr.memory.action!='idl') {
					//console.log(cr.memory.cx+"-"+cr.memory.cy+" -> "+cr.pos.x+"-"+cr.pos.x)
					cr.memory.cx=cr.pos.x
					cr.memory.cy=cr.pos.y
					var res=cr.moveByPath(cr.memory.pathToRes)
				}

			}
			else if (har==ERR_INVALID_TARGET) {
				cr.memory.action='idl'
			}
			else if (har==0) {

			}
			else {
				console.log("har:"+har)
			}
		}
		else {
			cr.memory.action='fs'
		}
	},
	findController: function(cr) {
		console.log(cr.name+ " is looking for a controller")
		cr.memory.action='idl'
			var path=cr.pos.findPathTo(cr.room.controller)
			if (path) {
					cr.memory.pathToRes=Room.serializePath(path)
					cr.memory.resId=0
					console.log(cr.name+ " found controller")
					cr.memory.action='cb'
					return true
			}
		return false
	},
	upgradeCon: function(cr) {
		if (cr.carry.energy>0) {
			var trs=cr.upgradeController(cr.room.controller)
			if (trs==ERR_NOT_IN_RANGE) {
				var res=cr.moveByPath(cr.memory.pathToRes)
			}
			else if (trs==ERR_INVALID_TARGET) {
				cr.memory.action='idl'
			}
			else if (trs==0) {

			}
			else {
				console.log("trs:"+trs)
			}
		}
		else {
			cr.memory.action='idl'
		}
	}
}

module.exports = roleupgrader
