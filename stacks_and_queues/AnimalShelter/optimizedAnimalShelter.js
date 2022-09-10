import { Queue } from "../helpers/queue.js";
import { Dog, Cat, nameCat, nameDog } from "./animals.js";

class AnimalShelter {
  constructor() {
    this.dogs = new Queue();
    this.cats = new Queue();
    this.dogCount = 0;
    this.catCount = 0;
  }

  enqueue(animal) {
    animal.arrivalTime = Date.now();
    if (animal instanceof Dog) {
      this.dogs.add(animal);
      this.dogCount++;
    } else if (animal instanceof Cat) {
      this.cats.add(animal);
      this.catCount++;
    }
  }

  dequeueAny() {
    if (this.isShelterEmpty()) throw new Error("This shelter is empty");

    if (this.dogCount === 0) {
      return this.dequeueDog();
    } else if (this.catCount === 0) {
      return this.dequeueCat();
    }
    const dog = this.dogs.peek();
    const cat = this.cats.peek();
    if (this.isOlderThan(dog, cat)) {
      return this.dequeueDog();
    }
    return this.dequeueCat();
  }

  dequeueDog() {
    if (!this.hasDogs) throw new Error("This shelter has no dogs");
    this.dogCount--;
    return this.dogs.remove();
  }

  dequeueCat() {
    if (!this.hasCats) throw new Error("This shelter has no cats");
    this.catCount--;
    return this.cats.remove();
  }

  // check if animal1 arrived earlier than animal2
  isOlderThan(animal1, animal2) {
    return animal1.arrivalTime < animal2.arrivalTime;
  }

  isShelterEmpty() {
    return this.dogCount + this.catCount === 0;
  }

  hasDogs() {
    return this.dogCount > 0;
  }

  hasCats() {
    return this.catCount > 0;
  }
}

let arr = [
  nameDog("aja"),
  nameCat("pussy"),
  nameDog("autumn"),
  nameCat("ologbo"),
  nameDog("luna"),
  nameCat("missy"),
  nameCat("snow"),
];

const animalShelter = new AnimalShelter();
console.log(animalShelter.hasDogs(), false);
console.log(animalShelter.hasCats(), false);
console.log(animalShelter.isShelterEmpty(), true);
for (let i = 0; i < arr.length; i++) {
  animalShelter.enqueue(arr[i]);
}
console.log(animalShelter);
console.log(animalShelter.isShelterEmpty(), false);
console.log(animalShelter.dequeueAny().animal_name);
console.log(animalShelter.hasDogs(), true);
console.log(animalShelter.dequeueDog().animal_name);
console.log(animalShelter.hasCats(), true);
console.log(animalShelter.dequeueCat().animal_name);
