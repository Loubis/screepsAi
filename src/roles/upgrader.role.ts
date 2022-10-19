export class UpgraderRole {
  static run(creep: Creep) {
    switch (creep.memory.state) {
      case 'mining':
        this.mining(creep);
        break;
      case 'upgrading':
        this.upgrading(creep);
        break;
      default:
        creep.memory.state = 'mining';
    }
  }

  static mining(creep: Creep) {
    const actionResponse = creep.harvest(creep.room.find(FIND_SOURCES)[0])

    if(actionResponse == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.find(FIND_SOURCES)[0]);
    } else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
      creep.memory.target = creep.room.controller;
      creep.memory.state = 'upgrading'
    }
  }

  static upgrading(creep: Creep) {
    if (creep.room.controller) {
      const actionResponse = creep.upgradeController(creep.room.controller);

      if (actionResponse == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      } else if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
        creep.memory.state = 'mining';
      }
    }
  }
}
