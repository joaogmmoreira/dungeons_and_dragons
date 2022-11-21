import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Mage extends Archetype {
  private static _createdArchetypeInstances = 0;
  private _energyType: EnergyType = 'mana';

  constructor(name: string) {
    super(name);
    Mage.addMage();
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  private static addMage() {
    this._createdArchetypeInstances += 1;
  }

  static createdArchetypeInstances(): number {
    return this._createdArchetypeInstances;
  }
}