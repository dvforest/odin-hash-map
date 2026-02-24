/**
 * Represents a single node in a singly linked list.
 */
class Node {
    /**
     * Creates a new node.
     * @param {*} data - The data stored in the node.
     */
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

/**
 * A singly linked list implementation.
 */
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    /**
     * Adds a data to the end of the list.
     *
     * @param {*} data - The data to append.
     */
    append(data) {
        const newNode = new Node(data);

        // If empty list, add node as head and tail
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return;
        }

        // Else, assign as new tail
        this.tail.next = newNode;
        this.tail = newNode;
    }

    /**
     * Adds a data to the beginning of the list.
     *
     * @param {*} data - The data to append.
     */
    prepend(data) {
        const newNode = new Node(data);

        // If list not empty, shift it to next position
        if (this.head) {
            newNode.next = this.head;
        }

        this.head = newNode;

        // If list was empty, update tail
        if (!this.tail) {
            this.tail = newNode;
        }
    }

    /**
     * Returns the total number of number of nodes in the list
     *
     * @returns {number} The total number of nodes.
     */
    size() {
        let count = 0;
        let current = this.head;

        while (current) {
            count++;
            current = current.next;
        }

        return count;
    }

    /**
     * Returns the data of the first node in the list
     *
     * @returns {*} The data of the head node, or undefined if it doesn't exist.
     */
    head() {
        return this.head ? this.head.data : undefined;
    }

    /**
     * Returns the data of the final node in the list
     *
     * @returns {*} The data of the tail node, or undefined if it doesn't exist.
     */
    tail() {
        return this.tail ? this.tail.data : undefined;
    }

    /**
     * Removes the head node from the list and returns its data.
     *
     * @returns {*} The data of the removed head node.
     */
    pop() {
        // Handle empty list
        if (!this.head) return undefined;

        const data = this.head.data;
        this.head = this.head.next;

        // Handle empty list after popping a single node;
        if (!this.head) {
            this.tail = null;
        }

        return data;
    }

    /**
     * Removes the first node whose data satisfies the given predicate.
     *
     * @param {(data: any) => boolean} predicate - A function that returns true for the node to remove.
     * @returns {boolean} True if a node was removed, otherwise false.
     */
    remove(predicate) {
        if (!this.head) return false;

        // Removing the head
        if (predicate(this.head.data)) {
            this.head = this.head.next;
            this.tail = this.head ? this.tail : null; // If empty list, update tail
            return true;
        }

        let current = this.head;

        while (current.next) {
            if (predicate(current.next.data)) {
                // Update tail
                if (current.next === this.tail) {
                    this.tail = current;
                }
                // Skip the node
                current.next = current.next.next;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    /**
     * Implements the iterator protocol using a generator function.
     */
    *[Symbol.iterator]() {
        let current = this.head;
        while (current) {
            yield current.data;
            current = current.next;
        }
    }
}

export { LinkedList };
