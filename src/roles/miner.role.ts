export class MinerRole {
  constructor() {}

  static run(creep: Creep) {
    if (creep.store.getFreeCapacity() > 0) {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1]);
      }
    } else {
      const extensions = creep.room.find(FIND_MY_STRUCTURES, {
        filter: structure =>
          structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity
      });
      if (Game.spawns["Spawn1"].energy < Game.spawns["Spawn1"].energyCapacity) {
        if (creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(Game.spawns["Spawn1"]);
        }
      } else if (
        extensions.length > 0 &&
        (<StructureExtension>extensions[0]).energy < (<StructureExtension>extensions[0]).energyCapacity
      ) {
        if (creep.transfer(extensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(extensions[0]);
        }
      }
    }
  }
}
