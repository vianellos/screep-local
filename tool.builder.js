var roomsCSites=[]
//roomsCSites['W5N8']={'1':{}, '2':{ '1': {'pos': {'x':24, 'y':17}, 'type': STRUCTURE_EXTENSION }, '2': {'pos':{'x':24, 'y':18}, 'type': STRUCTURE_EXTENSION }, '3':{'pos': {'x':25, 'y':17}, 'type': STRUCTURE_EXTENSION }, '4':{'pos':{'x':25, 'y':18}, 'type': STRUCTURE_EXTENSION }, '5':{'pos':{'x':26, 'y':17}, 'type': STRUCTURE_EXTENSION } } }
roomsCSites['W5N8']={'1':{}, '2':{ '1': {'pos': {'x':24, 'y':17}, 'type': STRUCTURE_EXTENSION }, '2': {'pos':{'x':24, 'y':18}, 'type': STRUCTURE_EXTENSION }, '3':{'pos': {'x':25, 'y':17}, 'type': STRUCTURE_EXTENSION }, '4':{'pos':{'x':25, 'y':18}, 'type': STRUCTURE_EXTENSION } } }

var toolbuilder = {
	run: function() {
		for (var kr in Game.rooms) {

			if (!Game.rooms[kr].memory.lastlevel) {
				Game.rooms[kr].memory.lastlevel=0
			}
			Game.rooms[kr].memory.lastlevel=0
			
			if (!global.roadable[kr]) {
			    console.log('nuovastanza '+kr)
			    global.roadable[kr]=[]
			    global.buildRoad[kr]=[]
			}

			if (Game.rooms[kr].find(FIND_MY_CONSTRUCTION_SITES).length==0) {
				if (Game.rooms[kr].controller.level!=Game.rooms[kr].memory.lastlevel) {
					Game.rooms[kr].memory.constructPlan=roomsCSites[kr][Game.rooms[kr].controller.level]
					Game.rooms[kr].memory.lastlevel=Game.rooms[kr].controller.level
				}

				for (var ks in Game.rooms[kr].memory.constructPlan) {
					var sitePos=new RoomPosition(Game.rooms[kr].memory.constructPlan[ks].pos.x, Game.rooms[kr].memory.constructPlan[ks].pos.y, kr)
					var csr=Game.rooms[kr].createConstructionSite(sitePos, Game.rooms[kr].memory.constructPlan[ks].type)
					if (csr==0) {
						console.log('Inizio costruzione '+ JSON.stringify(Game.rooms[kr].memory.constructPlan[ks]))
						delete Game.rooms[kr].memory.constructPlan[ks]
						break
					}
					else {
						console.log('Costruzione non riuscita ' + JSON.stringify(Game.rooms[kr].memory.constructPlan[ks]))
						delete Game.rooms[kr].memory.constructPlan[ks]
					}
				}
				
				for (var ks in global.buildRoad[kr]) {
				    console.log(ks)
				    var sitePos=new RoomPosition(global.buildRoad[kr][ks].pos.x, global.buildRoad[kr][ks].pos.y, kr)
					var csr=Game.rooms[kr].createConstructionSite(sitePos, STRUCTURE_ROAD)
				    console.log("NUOVA strada "+JSON.stringify(sitePos)+ " res:"+JSON.stringify(csr))
				    delete global.buildRoad[kr][ks]
				    break
				}
			}
		}
	}
}
module.exports = toolbuilder
