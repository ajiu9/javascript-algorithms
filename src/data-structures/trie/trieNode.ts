import HashTable from '../hash-table/HashTable';

export default class TrieNode {
  character: string;
  isCompleteWord: boolean;
  children: HashTable<TrieNode>;

  /**
   * @param character
   * @param isCompleteWord
   */
  constructor(character: string, isCompleteWord: boolean = false) {
    this.character = character;
    this.isCompleteWord = isCompleteWord;
    this.children = new HashTable<TrieNode>();
  }

  /**
   * @param character
   */
  getChild(character: string): TrieNode | undefined {
    return this.children.get(character);
  }

  /**
   * @param character
   * @param isCompleteWord
   */
  addChild(character: string, isCompleteWord: boolean = false): TrieNode {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord));
    }

    const childNode = this.children.get(character)!;

    // In cases similar to adding "car" after "carpet" we need to mark "r" character as complete.
    childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord;

    return childNode;
  }

  /**
   * @param character
   */
  removeChild(character: string): this {
    const childNode = this.getChild(character);

    // Delete childNode only if:
    // - childNode has NO children,
    // - childNode.isCompleteWord === false.
    if (
      childNode
      && !childNode.isCompleteWord
      && !childNode.hasChildren()
    ) {
      this.children.delete(character);
    }

    return this;
  }

  /**
   * @param character
   */
  hasChild(character: string): boolean {
    return this.children.has(character);
  }

  /**
   * Check whether current TrieNode has children or not.
   */
  hasChildren(): boolean {
    return this.children.getKeys().length !== 0;
  }

  /**
   */
  suggestChildren(): string[] {
    return [...this.children.getKeys()];
  }

  /**
   */
  toString(): string {
    let childrenAsString = this.suggestChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
    const isCompleteString = this.isCompleteWord ? '*' : '';

    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}
