var rolebuilder = {
    run: function() {
		var listh= _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
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
						this.findBuildS(cr)
					}
				}
			break;
			case 'ha':
				this.harvestRes(cr)
			break;
			case 'fs':
				this.findBuildS(cr)
			break;
			case 'cb':
				this.buildSite(cr)
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
	findBuildS: function(cr) {
		cr.memory.action='idl'
		var res=cr.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
		if (res) {
			if (mover.setPathTo(cr, res)) {
				cr.memory.action='cb'
				return true
			}
		}
		return false
	},
	buildSite: function(cr) {
		if (cr.carry.energy>0) {
			mover.moveTo(cr, "build")
		}
		else {
			cr.memory.action='idl'
		}
	}
}

module.exports = rolebuilder
