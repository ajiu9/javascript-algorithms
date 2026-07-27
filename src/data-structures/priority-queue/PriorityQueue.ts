import MinHeap from '../heap/MinHeap';
import Comparator from '../../utils/comparator/Comparator';

// It is the same as min heap except that when comparing two elements
// we take into account its priority instead of the element's value.

export default class PriorityQueue<T> extends MinHeap<T> {
  private priorities: Map<T, number>;

  constructor() {
    // Call MinHeap constructor first.
    super();

    // Setup priorities map.
    this.priorities = new Map<T, number>();

    // Use custom comparator for heap elements that will take element priority
    // instead of element value into account.
    this.compare = new Comparator<T>(this.comparePriority.bind(this));
  }

  /**
   * Add item to the priority queue.
   * @param item - item we're going to add to the queue.
   * @param priority - items priority.
   */
  add(item: T, priority: number = 0): this {
    this.priorities.set(item, priority);
    super.add(item);
    return this;
  }

  /**
   * Remove item from priority queue.
   * @param item - item we're going to remove.
   * @param customFindingComparator - custom function for finding the item to remove
   */
  remove(item: T, customFindingComparator?: Comparator<T>): this {
    super.remove(item, customFindingComparator);
    this.priorities.delete(item);
    return this;
  }

  /**
   * Change priority of the item in a queue.
   * @param item - item we're going to re-prioritize.
   * @param priority - new item's priority.
   */
  changePriority(item: T, priority: number): this {
    this.remove(item, new Comparator<T>(this.compareValue.bind(this)));
    this.add(item, priority);
    return this;
  }

  /**
   * Find item by its value.
   * @param item
   */
  findByValue(item: T): number[] {
    return this.find(item, new Comparator<T>(this.compareValue.bind(this)));
  }

  /**
   * Check if item already exists in a queue.
   * @param item
   */
  hasValue(item: T): boolean {
    return this.findByValue(item).length > 0;
  }

  /**
   * Compares priorities of two items.
   */
  private comparePriority(a: T, b: T): number {
    const priorityA = this.priorities.get(a)!;
    const priorityB = this.priorities.get(b)!;

    if (priorityA === priorityB) {
      return 0;
    }

    return priorityA < priorityB ? -1 : 1;
  }

  /**
   * Compares values of two items.
   */
  private compareValue(a: T, b: T): number {
    if (a === b) {
      return 0;
    }
    return (a as unknown as number) < (b as unknown as number) ? -1 : 1;
  }
}
