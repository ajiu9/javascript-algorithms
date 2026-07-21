import DoublyLinkedListNode from './DoublyLinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

interface FindParams<T> {
  value?: T;
  callback?: (value: T) => boolean;
}

export default class DoublyLinkedList<T> {
  head: DoublyLinkedListNode<T> | null;
  tail: DoublyLinkedListNode<T> | null;
  compare: Comparator<T>;

  /**
   * @param {Function} comparatorFunction
   */
  constructor(comparatorFunction?: (a: T, b: T) => number) {
    /** @var DoublyLinkedNode */
    this.head = null;

    /** @var DoublyLinkedNode */
    this.tail = null;

    this.compare = new Comparator(comparatorFunction);
  }

  /**
   * @param {T} value
   * @return {DoublyLinkedList}
   */
  prepend(value: T): this {
    // Make new node to be a head.
    const newNode = new DoublyLinkedListNode(value, this.head);

    // If there is head, then it won't be head anymore.
    // Therefore, make it previous reference to be new node(new head).
    // Then make the new node as head.
    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * @param {T} value
   * @return {DoublyLinkedList}
   */
  append(value: T): this {
    const newNode = new DoublyLinkedListNode(value);

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Attach new node to the end of linked list.
    this.tail!.next = newNode;

    // Attach current tail to the new node's previous reference.
    newNode.previous = this.tail;

    // Set new node to be the tail of linked list.
    this.tail = newNode;

    return this;
  }

  /**
   * @param {T} value
   * @return {DoublyLinkedListNode}
   */
  delete(value: T): DoublyLinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    let deletedNode: DoublyLinkedListNode<T> | null = null;
    let currentNode: DoublyLinkedListNode<T> | null = this.head;

    while (currentNode) {
      if (this.compare.equal(currentNode.value, value)) {
        deletedNode = currentNode;

        if (deletedNode === this.head) {
          // If HEAD is going to be deleted...

          // Set head to second node, which will become new head.
          this.head = deletedNode.next;

          // Set new head's previous to null.
          if (this.head) {
            this.head.previous = null;
          }

          // If all the nodes in list has same value that is passed as argument.
          // then all nodes will get deleted, therefore tail needs to be updated.

          if (deletedNode === this.tail) {
            this.tail = null;
          }
        } else if (deletedNode === this.tail) {
          // If TAIL is going to be deleted...

          // Set tail to second last node, which will become new tail.
          this.tail = deletedNode.previous;
          this.tail!.next = null;
        } else {
          // If MIDDLE node is going to be deleted...
          const previousNode = deletedNode.previous!;
          const nextNode = deletedNode.next!;

          previousNode.next = nextNode;
          nextNode.previous = previousNode;
        }
      }

      currentNode = currentNode.next;
    }

    return deletedNode;
  }

  /**
   * @param {Object} findParams
   * @param {T} findParams.value
   * @param {function} [findParams.callback]
   * @return {DoublyLinkedListNode}
   */
  find({ value = undefined, callback = undefined }: FindParams<T>): DoublyLinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    let currentNode: DoublyLinkedListNode<T> | null = this.head;

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

  /**
   * @return {DoublyLinkedListNode}
   */
  deleteTail(): DoublyLinkedListNode<T> | null {
    if (!this.tail) {
      // No tail to delete.
      return null;
    }

    if (this.tail === this.head) {
      // There is only one node in linked list.
      const deletedTail = this.tail;
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // If there are many nodes in linked list...
    const deletedTail = this.tail;
    this.tail = this.tail.previous;
    this.tail!.next = null;

    return deletedTail;
  }

  /**
   * @return {DoublyLinkedListNode}
   */
  deleteHead(): DoublyLinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
      this.head.previous = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  /**
   * @return {DoublyLinkedListNode[]}
   */
  toArray(): DoublyLinkedListNode<T>[] {
    const nodes: DoublyLinkedListNode<T>[] = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * @param {T[]} values - Array of values that need to be converted to linked list.
   * @return {DoublyLinkedList}
   */
  fromArray(values: T[]): this {
    values.forEach((value) => this.append(value));

    return this;
  }

  /**
   * @param {function} callback
   * @return {string}
   */
  toString(callback?: (value: T) => string): string {
    return this.toArray().map((node) => node.toString(callback)).toString();
  }

  /**
   * Reverse a linked list.
   * @returns {DoublyLinkedList}
   */
  reverse(): this {
    let currNode: DoublyLinkedListNode<T> | null = this.head;
    let prevNode: DoublyLinkedListNode<T> | null = null;
    let nextNode: DoublyLinkedListNode<T> | null = null;

    while (currNode) {
      // Store next node.
      nextNode = currNode.next;
      prevNode = currNode.previous;

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode;
      currNode.previous = nextNode;

      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
