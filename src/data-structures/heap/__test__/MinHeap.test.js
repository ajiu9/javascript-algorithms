  
import MinHeap from '../MinHeap';
import Comparator from '../../../utils/comparator/Comparator';

describe('MinHeap', () => {
  it('should create an empty min heap', () => {
    const minHeap = new MinHeap();

    expect(minHeap).toBeDefined();
    expect(minHeap.peek()).toBeNull();
    expect(minHeap.isEmpty()).toBe(true);
  });
});