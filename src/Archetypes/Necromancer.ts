import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Necromancer extends Archetype {
  private static _createdArchetypeInstances = 0;
  private _energyType: EnergyType = 'mana';

  constructor(name: string) {
    super(name);
    Necromancer.addNecromancer();
  }
  
  get energyType(): EnergyType {
    return this._energyType;
  }

  private static addNecromancer() {
    this._createdArchetypeInstances += 1;
  }

  static createdArchetypeInstances(): number {
    return this._createdArchetypeInstances;
  }
}