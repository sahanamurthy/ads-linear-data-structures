class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    const node = new this.Node({element, next: this._head(), prev: this._sentinel});
    this._head().prev = node;
    this._sentinel.next = node;
    return node;
  }

  insertTail(element) {
    const node = new this.Node({element, next: this._sentinel, prev: this._tail()});
    this._tail().next = node;
    this._sentinel.prev = node;
    return node;
  }

  removeHead() {
    return this.remove(this._head());
    // var node = this._head();
    // this._sentinel.next = this._head().next;
    // this._head().prev = this._sentinel;
    // node._active = false;
    // return node.element;
  }

  removeTail() {
    return this.remove(this._tail());
    // var node = this._tail();
    // this._sentinel.prev = this._tail().prev;
    // this._tail().next = this._sentinel;
    // node._active = false;
    // return node.element;
  }

  remove(node) {
    if (!node._active)
    {
      return;
    }
    return node.remove();
  }

  forEach(callback, caller=this) {
    var index = 0;
    var node = this._head();
    // var boundCallback = callback.bind(this);
    while (node !== this._sentinel)
    {
      callback(node.element, index, caller);
      index += 1;
      node = node.next;
    }
    return;
  }

  count() {
    var count = 0;
    var node = this._head();
    while (node !== this._sentinel)
    {
      count += 1;
      node = node.next;
    }
    return count;
  }
}

export default DoublyLinkedList;
