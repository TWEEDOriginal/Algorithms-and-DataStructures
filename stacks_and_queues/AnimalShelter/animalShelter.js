import { Queue } from "../helpers/queue.js";

const acceptedAnimals = ["dog", "cat"];

class AnimalShelter extends Queue {
  constructor() {
    super();
    this.dogCount = 0;
    this.catCount = 0;
  }

  enqueue(animal) {
    if (!acceptedAnimals.includes(animal))
      throw new Error("This shelter holds only cats and dogs");

    this.add(animal);
    animal === "dog" ? this.dogCount++ : this.catCount++;
  }

  dequeueAny() {
    if (!this.hasDogs && !this.hasCats)
      throw new Error("This shelter is empty");
    const animal = this.remove();
    animal === "dog" ? this.dogCount-- : this.catCount--;
    return animal;
  }

  dequeueDog() {
    if (!this.hasDogs) throw new Error("This shelter has no dogs");
    return this.dequeueAnimal("dog");
  }

  dequeueCat() {
    if (!this.hasCats) throw new Error("This shelter has no cats");
    return this.dequeueAnimal("cat");
  }

  dequeueAnimal(type) {
    type === "dog" ? this.dogCount-- : this.catCount--;

    if (this.first.data === type) {
      return this.remove();
    }

    let curr = this.first,
      prev;
    while (curr.data != type) {
      prev = curr;
      curr = curr.next;
    }
    prev.next = curr.next;
    return curr.data;
  }

  hasDogs() {
    return this.dogCount > 0;
  }

  hasCats() {
    this.catCount > 0;
  }
}

let arr = ["dog", "cat", "dog", "cat", "dog", "cat", "cat"];

const queue = new AnimalShelter();
for (let i = 0; i < arr.length; i++) {
  queue.enqueue(arr[i]);
}

console.log(queue);
console.log(queue.dequeueAny());
console.log(queue);
console.log(queue.dequeueCat());
console.log(queue);

try {
  queue.enqueue("lion");
} catch (e) {
  console.log(e.message === "This shelter holds only cats and dogs");
}
