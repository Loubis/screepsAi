export class Builder {
  static run(creep: Creep) {
    switch (creep.memory.state) {
      case 'mining':
        this.mining(creep);
        break;
      case 'build':
        this.build(creep);
        break;
      default:
        creep.memory.state = 'mining';
    }
  }

  static mining(creep: Creep) {
    const actionResponse = creep.harvest(creep.room.find(FIND_SOURCES)[1])

    if(actionResponse == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.find(FIND_SOURCES)[1]);
    } else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
      creep.memory.target = creep.room.controller;
      creep.memory.state = 'build'
    }
  }


  static build(creep: Creep) {
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets) {
      if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
      } else if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
        creep.memory.state = 'mining';
      }
    }
  }

  // TODO: For later when extension are finished
  static collect() {}


  static takeBack() {}
}
