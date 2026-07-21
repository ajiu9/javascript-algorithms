export default class DoublyLinkedListNode<T> {
  value: T;
  next: DoublyLinkedListNode<T> | null;
  previous: DoublyLinkedListNode<T> | null;

  constructor(value: T, next: DoublyLinkedListNode<T> | null = null, previous: DoublyLinkedListNode<T> | null = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString(callback?: (value: T) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
