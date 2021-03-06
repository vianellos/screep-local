var roleharvester = {
    run: function() {
		var listh= _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
		for (var kh in listh) {
			this.harvest(listh[kh])
		}
    },
	harvest: function(cr) {
		switch(cr.memory.action) {
			case 'idl':
				if (cr.spawning!=true) {
					if (cr.carry.energy<(cr.carryCapacity/2)) {
						this.findResource(cr)
					}
					else {
						this.findSpawn(cr)
					}
				}
			break;
			case 'ha':
				this.harvestRes(cr)
			break;
			case 'fs':
				this.findSpawn(cr)
			break;
			case 'cb':
				this.comeBack(cr)
			break;
		}
	},
	findResource: function(cr) {
		var res=cr.pos.findClosestByPath(FIND_SOURCES)
		cr.memory.action='idl'
		if (res) {
			if (mover.setPathTo(cr, res)) {
				cr.memory.action='ha'
				return true
			}
		}
		return false
	},
	harvestRes: function(cr) {
		if (cr.carry.energy<cr.carryCapacity) {
			mover.moveTo(cr, "harvest")
		}
		else {
			cr.memory.action='fs'
		}
	},
	findSpawn: function(cr) {
		cr.memory.action='idl'
		var res=cr.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
		if (res) {
			if (mover.setPathTo(cr, res)) {
				cr.memory.action='cb'
				return true
			}
		}
		return false
	},
	comeBack: function(cr) {
		if (cr.carry.energy>0) {
			mover.moveTo(cr, "transfer", RESOURCE_ENERGY)
		}
		else {
			cr.memory.action='idl'
		}
	}
}

module.exports = roleharvester
