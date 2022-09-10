class Animal {
  constructor(name) {
    this.name = name;
    this.arrival_time = null;
  }

  get arrivalTime() {
    return this.arrival_time;
  }

  set arrivalTime(timeStamp) {
    this.arrival_time = timeStamp;
  }

  get animal_name() {
    return this.name;
  }
}

export class Dog extends Animal {
  constructor(name) {
    super(name);
  }
}

export class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}

export const nameDog = (name) => {
  return new Dog(name);
};

export const nameCat = (name) => {
  return new Cat(name);
};

// const aja = nameDog("aja");
// const pussy = nameDog("pussy");
// console.log(aja);
// console.log(pussy);
