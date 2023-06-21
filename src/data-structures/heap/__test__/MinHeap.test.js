import MinHeap from '../MinHeap';

describe('MinHeap', () => {
  it('should create an empty min heap', () => {
    const minHeap = new MinHeap();

    expect(minHeap).toBeDefined();
    expect(minHeap.peek()).toBeNull();
    expect(minHeap.isEmpty()).toBe(true);
  });
});
