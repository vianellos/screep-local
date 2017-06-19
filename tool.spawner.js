global.roomRoleSpawner=[]
global.roomRoleSpawner['W5N8']=[]
var roles={'harvester':{'max':2, 'body':[WORK,CARRY,MOVE], "cost":200},'upgrader':{'max':5, 'body':[WORK,CARRY,MOVE], "cost":200}, 'builder':{'max':5, 'body':[WORK,CARRY,MOVE], "cost":200} };
global.roomRoleSpawner['W5N8'][1]=roles
roles={'harvester':{'max':2, 'body':[WORK,WORK,CARRY,CARRY,MOVE,MOVE], "cost":400},'upgrader':{'max':2, 'body':[WORK,WORK,CARRY,CARRY,MOVE,MOVE], "cost":400}, 'builder':{'max':8, 'body':[WORK,WORK,CARRY,CARRY,MOVE,MOVE], "cost":400} };
global.roomRoleSpawner['W5N8'][2]=roles
var toolspawner = {
	run: function() {
	    for (var kr in Game.rooms) {
	        var spLevel= this.getSLevel(kr)
    		for (var ks in global.roomRoleSpawner[kr][spLevel]) {
    			var list= _.filter(Game.creeps, (creep) => creep.memory.role == ks);
    			
    			if (list.length<global.roomRoleSpawner[kr][spLevel][ks].max) {
    				this.spawnNew(kr, ks, global.roomRoleSpawner[kr][spLevel][ks])
    				break
    			}
    		}
	    }
	},
	spawnNew: function(kr, ro, spi) {
	    var spa=Game.rooms[kr].find(FIND_MY_SPAWNS)
	    //console.log ('spnew:'+JSON.stringify(spa))
	    for (var ks in spa) {
	        //console.log ('sp:'+JSON.stringify(spa[ks]))
			if (spa[ks].room.energyAvailable>=spi.cost) {
				var newCreep =spa[ks].createCreep(spi.body, undefined, {role: ro, action:'idl', stuck:0, cx:0, cy:0});
				console.log("Spawning new "+ro+" ("+spi.body+") named "+newCreep+"")
				break
			}
			else {
				//console.log("Not enought energy to spawn "+kr+" "+Game.spawns[ks].energy+"/"+roles[kr].cost);
			}
		}
	},
	getSLevel: function (kr) {
	    var level=1
	    if (Game.rooms[kr].energyCapacityAvailable>=400) {
	        level=2
	    }
	    return level
	}

}
module.exports = toolspawner
