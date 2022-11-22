import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(name: string) {
    this._dexterity = Math.ceil(Math.random() * 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = Math.ceil(Math.random() * 10);
    this._defense = Math.ceil(Math.random() * 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: Math.ceil(Math.random() * 10),
    };
  }

  get race() {
    return this._race;
  }
  
  get archetype() {
    return this._archetype;
  }

  get lifePoints() {
    return this._lifePoints;
  }

  get strength() {
    return this._strength;
  }

  get defense() {
    return this._defense;
  }

  get dexterity() {
    return this._dexterity;
  }

  get energy(): Energy {
    return {
      type_: this._energy.type_,
      amount: this._energy.amount,
    };
  }

  receiveDamage(AttackPoints: number): number {
    const damage = AttackPoints - this._defense;

    if (damage > 0) {
      this._lifePoints -= damage;
    } else {
      this._lifePoints -= 1;
    }

    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }

    return this._lifePoints;
  }
  
  attack(enemy: Fighter): void {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    this._maxLifePoints += Math.ceil(Math.random() * 10);
    this._strength += Math.ceil(Math.random() * 10);
    this._dexterity += Math.ceil(Math.random() * 10);
    this._defense += Math.ceil(Math.random() * 10);
    this._energy.amount = 10;
    
    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }

    this._lifePoints = this._maxLifePoints;
  }

  special(enemy: Fighter): void {
    const energySpent = (Math.ceil(Math.random() * 5) * 1.5);
    this._energy.amount -= energySpent;

    if (energySpent < 6) {
      enemy.receiveDamage(this._strength * 1.2);
    } else {
      enemy.receiveDamage((this._strength * energySpent) * (energySpent / 5));
    }
  }
}