import LinkedListNode from './LinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

interface FindParams<T> {
  value?: T;
  callback?: (value: T) => boolean;
}

export default class LinkedList<T> {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;
  compare: Comparator<T>;

  constructor(comparatorFunction?: (a: T, b: T) => number) {
    this.head = null;

    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  prepend(value: T): this {
    // Make new node to be a head.
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: T): this {
    const newNode = new LinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Attach new node to the end of linked list.
    this.tail!.next = newNode;
    this.tail = newNode;

    return this;
  }

  delete(value: T): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    let deleteNode: LinkedListNode<T> | null = null;

    // If the head must be deleted then make next node to be a new head.
    while (this.head && this.compare.equal(this.head.value, value)) {
      deleteNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.tail && this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deleteNode;
  }

  find({ value = undefined, callback = undefined }: FindParams<T>): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    let currentNode: LinkedListNode<T> | null = this.head;

    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // If value is specified then try to compare by value.
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail(): LinkedListNode<T> | null {
    const deletedTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // If there are many nodes in linked list...

    // Rewind to the last node and delete "next" link for the node before the last one.
    let currentNode = this.head;
    while (currentNode!.next) {
      if (!currentNode!.next!.next) {
        currentNode!.next = null;
      } else {
        currentNode = currentNode!.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  deleteHead(): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  fromArray(values: T[]): this {
    values.forEach((value) => this.append(value));

    return this;
  }

  toArray(): LinkedListNode<T>[] {
    const nodes: LinkedListNode<T>[] = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback?: (value: T) => string): string {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  reverse(): this {
    let currNode = this.head;
    let prevNode: LinkedListNode<T> | null = null;
    let nextNode: LinkedListNode<T> | null = null;

    while (currNode) {
      // Store next node.
      nextNode = currNode.next;

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode;

      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
