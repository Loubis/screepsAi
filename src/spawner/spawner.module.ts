export enum Role {
  BUILDER = "builder",
  HAULER = "hauler",
  UPGRADER = "upgrader",
  MINER = "miner"
}

const config = {
  miner: {
    amount: 1
  }
};

export class Spawner {
  constructor() {}

  static run() {
    const miner = _.filter(Game.creeps, creep => creep.memory.role == "miner");
    const upgrader = _.filter(Game.creeps, creep => creep.memory.role == "upgrader");
    const builder = _.filter(Game.creeps, creep => creep.memory.role == "builder");


    if (miner.length < 3) {
      const newName = "Miner" + Game.time;
      console.log("Spawning new miner: " + newName);
      Game.spawns["Spawn1"].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName, {
        memory: {
          role: "miner"
        }
      });
    }

    if (upgrader.length < 6) {
      const newName = "Upgrader" + Game.time;
      console.log("Spawning new miner: " + newName);
      Game.spawns["Spawn1"].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName, {
        memory: {
          role: "upgrader"
        }
      });
    }

    if(Object.keys(Game.constructionSites).length > 0 && builder.length < 1) {
      const newName = "Builder" + Game.time;
      console.log("Spawning new builder: " + newName);
      Game.spawns["Spawn1"].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName, {
        memory: {
          role: "builder"
        }
      });
    }

    if (Game.spawns["Spawn1"].spawning) {
      const spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
      Game.spawns["Spawn1"].room.visual.text(
        "🛠️" + spawningCreep.memory.role,
        Game.spawns["Spawn1"].pos.x + 1,
        Game.spawns["Spawn1"].pos.y,
        { align: "left", opacity: 0.8 }
      );
    }
  }
}
