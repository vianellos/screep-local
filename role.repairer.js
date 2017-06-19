var rolerepairer = {
    run: function() {
		var listh= _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
		for (var kh in listh) {
			this.build(listh[kh])
		}
    },
	build: function(cr) {
		switch(cr.memory.action) {
			case 'idl':
				if (cr.spawning!=true) {
					if (cr.carry.energy<cr.carryCapacity) {
						this.findResource(cr)
					}
					else {
						this.findDamagedS(cr)
					}
				}
			break;
			case 'ha':
				this.harvestRes(cr)
			break;
			case 'fs':
				this.findDamagedS(cr)
			break;
			case 'cb':
				this.repairSite(cr)
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
	findDamagedS: function(cr) {
		cr.memory.action='idl'
		var res = creep.room.find(FIND_STRUCTURES, {
    		filter: object => object.hits < object.hitsMax
		});
		if (res) {
			if (mover.setPathTo(cr, res)) {
				cr.memory.action='cb'
				return true
			}
		}
		return false
	},
	repairSite: function(cr) {
		if (cr.carry.energy>0) {
			mover.moveTo(cr, "repair")
		}
		else {
			cr.memory.action='idl'
		}
	}
}

module.exports = rolerepairer
