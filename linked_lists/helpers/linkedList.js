// implementation of the linked list
/*
ADT:
# Main operations
append(value)         -> Add a node in the end : time Complexity O(n)
prepend(value)        -> Add a node in the beginning : time Complexity O(1)
delete(value)         ->  Deletes a node from the LinkedList : time Complexity O(n)
printList()           -> Return a string with all items
arrayToLinkedList     -> Adds all array items to the linked list
toArray()             -> Return an array with all items
*/

export class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
    //Me don't feel like using this.tail
  }
  append(value) {
    let node = new Node(value);
    let current;
    if (this.head == null) this.head = node;
    else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  prepend(value) {
    let node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  delete(value) {
    if (this.head === null) return -1;
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return value;
    }
    let current = this.head.next;
    let previous = this.head;
    while (current) {
      if (current.value === value) {
        previous.next = current.next;
        this.size--;
        return value;
      }

      previous = current;
      current = current.next;
    }
    return -1;
  }

  printList() {
    let curr = this.head;
    let str = "";
    while (curr) {
      str += curr.value + " ";
      curr = curr.next;
    }
    return str;
  }

  getTail() {
    let curr = this.head,
      tail = this.head;
    while (curr) {
      tail = curr;
      curr = curr.next;
    }
    return tail;
  }

  arrayToLinkedList(arr) {
    if (arr.length === 0) {
      return null;
    }

    let tail;
    if (this.head === null) {
      this.head = new Node(arr[0]);
      tail = this.head;
    } else {
      tail = this.getTail();
      tail.next = new Node(arr[0]);
      tail = tail.next;
    }
    this.size++;
    for (let i = 1; i < arr.length; i++) {
      tail.next = new Node(arr[i]);
      tail = tail.next;
      this.size++;
    }

    return arr;
  }

  toArray() {
    let curr = this.head;
    let arr = [];
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }
}

// let new_list = new LinkedList();
// new_list.arrayToLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// new_list.append(10);
// console.log(new_list.toArray());
// new_list.append(11);
// console.log(new_list.printList());
// new_list.prepend(9);
// console.log(new_list.printList());
// new_list.delete(9);
// console.log(new_list.printList());
