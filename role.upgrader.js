var roleupgrader = {
    run: function() {
		var listh= _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
		for (var kh in listh) {
			this.upgrade(listh[kh])
		}
    },
	upgrade: function(cr) {

		switch(cr.memory.action) {
			case 'idl':
				if (cr.spawning!=true) {
					if (cr.carry.energy<cr.carryCapacity) {
						this.findResource(cr)
					}
					else {
						this.findController(cr)
					}
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
	findController: function(cr) {

		cr.memory.action='idl'
		if (mover.setPathTo(cr, cr.room.controller)) {
			cr.memory.action='cb'
			return true
		}
		return false
	},
	upgradeCon: function(cr) {
		if (cr.carry.energy>0) {
			mover.moveTo(cr, "upgradeController")
		}
		else {
			cr.memory.action='idl'
		}
	}
}

module.exports = roleupgrader
