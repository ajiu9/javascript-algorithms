import Heap from '../Heap';
import MinHeap from '../MinHeap';
import MaxHeap from '../MaxHeap';
import Comparator from '../../../utils/comparator/Comparator';

describe('Heap', () => {
  it('should not allow to create instance of the Heap directly', () => {
    const instantiateHeap = () => {
      const heap = new Heap();
      heap.add(5);
    };

    expect(instantiateHeap).toThrow();
  });

  describe('index calculations', () => {
    let heap: Heap<number>;

    beforeEach(() => {
      heap = new MinHeap<number>();
      heap.add(1).add(2).add(3).add(4).add(5);
    });

    it('should calculate left child index', () => {
      expect(heap.getLeftChildIndex(0)).toBe(1);
      expect(heap.getLeftChildIndex(1)).toBe(3);
      expect(heap.getLeftChildIndex(2)).toBe(5);
    });

    it('should calculate right child index', () => {
      expect(heap.getRightChildIndex(0)).toBe(2);
      expect(heap.getRightChildIndex(1)).toBe(4);
      expect(heap.getRightChildIndex(2)).toBe(6);
    });

    it('should calculate parent index', () => {
      expect(heap.getParentIndex(1)).toBe(0);
      expect(heap.getParentIndex(2)).toBe(0);
      expect(heap.getParentIndex(3)).toBe(1);
      expect(heap.getParentIndex(4)).toBe(1);
    });

    it('should return parent index for root as -1', () => {
      expect(heap.getParentIndex(0)).toBe(-1);
    });
  });

  describe('child/parent existence checks', () => {
    it('should check if node has parent', () => {
      const heap = new MinHeap<number>();
      heap.add(1).add(2);

      expect(heap.hasParent(0)).toBe(false);
      expect(heap.hasParent(1)).toBe(true);
    });

    it('should check if node has left child', () => {
      const heap = new MinHeap<number>();
      heap.add(1).add(2);

      expect(heap.hasLeftChild(0)).toBe(true);
      expect(heap.hasLeftChild(1)).toBe(false);
    });

    it('should check if node has right child', () => {
      const heap = new MinHeap<number>();
      heap.add(1).add(2).add(3);

      expect(heap.hasRightChild(0)).toBe(true);
      expect(heap.hasRightChild(1)).toBe(false);
    });

    it('should return false for hasRightChild when only left child exists', () => {
      const heap = new MinHeap<number>();
      heap.add(1).add(2);

      expect(heap.hasLeftChild(0)).toBe(true);
      expect(heap.hasRightChild(0)).toBe(false);
    });
  });

  describe('child/parent accessors', () => {
    let heap: Heap<number>;

    beforeEach(() => {
      heap = new MinHeap<number>();
      heap.add(1).add(2).add(3).add(4).add(5);
    });

    it('should get left child value', () => {
      expect(heap.leftChild(0)).toBe(2);
    });

    it('should get right child value', () => {
      expect(heap.rightChild(0)).toBe(3);
    });

    it('should get parent value', () => {
      expect(heap.parent(1)).toBe(1);
      expect(heap.parent(2)).toBe(1);
    });
  });

  describe('swap', () => {
    it('should swap two elements in the heap container', () => {
      const heap = new MinHeap<number>();
      heap.add(1).add(2).add(3);

      heap.swap(0, 2);

      expect(heap.peek()).toBe(3);
      expect(heap.toString()).toBe('3,2,1');
    });
  });

  describe('peek', () => {
    it('should return null for empty heap', () => {
      const heap = new MinHeap<number>();
      expect(heap.peek()).toBeNull();
    });

    it('should return the root element without removing it', () => {
      const heap = new MinHeap<number>();
      heap.add(5).add(3).add(10);

      expect(heap.peek()).toBe(3);
      expect(heap.toString()).toContain('3');
      // Peek should not remove the element.
      expect(heap.peek()).toBe(3);
    });
  });

  describe('poll', () => {
    it('should return null for empty heap', () => {
      const heap = new MinHeap<number>();
      expect(heap.poll()).toBeNull();
    });

    it('should return and remove the root element', () => {
      const heap = new MinHeap<number>();
      heap.add(5).add(3).add(10);

      expect(heap.poll()).toBe(3);
      expect(heap.poll()).toBe(5);
      expect(heap.poll()).toBe(10);
      expect(heap.poll()).toBeNull();
    });

    it('should handle heap with single element', () => {
      const heap = new MinHeap<number>();
      heap.add(42);

      expect(heap.poll()).toBe(42);
      expect(heap.isEmpty()).toBe(true);
    });
  });

  describe('add', () => {
    it('should return the heap instance for chaining', () => {
      const heap = new MinHeap<number>();
      const result = heap.add(1);

      expect(result).toBe(heap);
    });

    it('should add items and maintain heap property', () => {
      const heap = new MinHeap<number>();
      heap.add(5).add(3).add(10).add(1).add(7);

      expect(heap.peek()).toBe(1);
    });
  });

  describe('remove', () => {
    it('should remove item and return the heap instance', () => {
      const heap = new MinHeap<number>();
      heap.add(1).add(2).add(3);

      const result = heap.remove(2);

      expect(result).toBe(heap);
      expect(heap.find(2)).toEqual([]);
    });

    it('should remove duplicate items', () => {
      const heap = new MinHeap<number>();
      heap.add(1).add(2).add(2).add(3);

      heap.remove(2);

      expect(heap.find(2)).toEqual([]);
      expect(heap.toString()).toBe('1,3');
    });

    it('should handle removing non-existent item', () => {
      const heap = new MinHeap<number>();
      heap.add(1).add(2);

      heap.remove(99);

      expect(heap.toString()).toBe('1,2');
      expect(heap.peek()).toBe(1);
    });

    it('should heapify down when removing from root', () => {
      const heap = new MinHeap<number>();
      heap.add(3).add(2).add(5).add(1).add(4);

      expect(heap.peek()).toBe(1);

      heap.remove(1);

      expect(heap.peek()).toBe(2);
    });
  });

  describe('find', () => {
    it('should return empty array when item not found', () => {
      const heap = new MinHeap<number>();
      heap.add(1).add(2).add(3);

      expect(heap.find(5)).toEqual([]);
    });

    it('should find all indices of matching items', () => {
      const heap = new MinHeap<number>();
      heap.add(3).add(2).add(3).add(1).add(3);

      expect(heap.find(3).length).toBe(3);
    });

    it('should use custom comparator when provided', () => {
      const heap = new MaxHeap<string>();
      heap.add('a').add('bb').add('ccc');

      const comparator = new Comparator<string>((a, b) => {
        if (a.length === b.length) return 0;
        return a.length < b.length ? -1 : 1;
      });

      expect(heap.find('xx', comparator)).toEqual([2]);
    });
  });

  describe('isEmpty', () => {
    it('should return true for new heap', () => {
      const heap = new MinHeap<number>();
      expect(heap.isEmpty()).toBe(true);
    });

    it('should return false after adding items', () => {
      const heap = new MinHeap<number>();
      heap.add(1);
      expect(heap.isEmpty()).toBe(false);
    });

    it('should return true after all items are polled', () => {
      const heap = new MinHeap<number>();
      heap.add(1).add(2);
      heap.poll();
      heap.poll();
      expect(heap.isEmpty()).toBe(true);
    });
  });

  describe('toString', () => {
    it('should return empty string for empty heap', () => {
      const heap = new MinHeap<number>();
      expect(heap.toString()).toBe('');
    });

    it('should return comma-separated values', () => {
      const heap = new MinHeap<number>();
      heap.add(1).add(2).add(3);

      expect(heap.toString()).toBe('1,2,3');
    });
  });

  describe('heapifyDown with custom start index', () => {
    it('should heapify down from given index', () => {
      const heap = new MinHeap<number>();

      // Manually populate to create a violation.
      heap.heapContainer = [5, 1, 3, 4, 2];

      heap.heapifyDown(0);

      expect(heap.peek()).toBe(1);
    });
  });
});
