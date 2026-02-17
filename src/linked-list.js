/**
 * Represents a single node in a singly linked list.
 */
class Node {
    /**
     * Creates a new node.
     * @param {*} value - The value stored in the node.
     */
    constructor(value) {
        this.value = value;
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
     * Adds a value to the end of the list.
     *
     * @param {*} value - The value to append.
     */
    append(value) {
        const newNode = new Node(value);

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
     * Adds a value to the beginning of the list.
     *
     * @param {*} value - The value to append.
     */
    prepend(value) {
        const newNode = new Node(value);

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
     * Returns the value of the first node in the list
     *
     * @returns {*} The value of the head node, or undefined if it doesn't exist.
     */
    head() {
        return this.head ? this.head.value : undefined;
    }

    /**
     * Returns the value of the final node in the list
     *
     * @returns {*} The value of the tail node, or undefined if it doesn't exist.
     */
    tail() {
        return this.tail ? this.tail.value : undefined;
    }

    /**
     * Returns the value of the node at the given index.
     *
     * @param {*} index - The index of the node to retrieve.
     * @returns {*} The value of the node, or undefined if it doesn't exist.
     */
    at(index) {
        // Handle negative index.
        if (index < 0) return undefined;

        let current = this.head;
        let i = 0;

        while (current && i < index) {
            current = current.next;
            i++;
        }
        return current ? current.value : undefined;
    }

    /**
     * Removes the head node from the list and returns its value.
     *
     * @returns {*} The value of the removed head node.
     */
    pop() {
        // Handle empty list
        if (!this.head) return undefined;

        const value = this.head.value;
        this.head = this.head.next;

        // Handle empty list after popping a single node;
        if (!this.head) {
            this.tail = null;
        }

        return value;
    }

    /**
     * Returns true if the passed in value is in the list, otherwise returns false.
     *
     * @returns {boolean} Whether the value is contained or not.
     */
    contains(value) {
        let current = this.head;

        while (current) {
            if (current.value === value) return true;
            current = current.next;
        }
        return false;
    }

    /**
     * Returns the index of the node containing the given value. If the value can’t be found, returns -1.
     * If more than one node have matching values, the first-found node's index is returned.
     *
     * @param {*} value - The value to search the index of.
     * @returns {number} The index at which the value was found.
     */
    findIndex(value) {
        let current = this.head;
        let i = 0;

        while (current) {
            if (current.value === value) return i;
            current = current.next;
            i++;
        }
        return -1;
    }

    /**
     * Returns the linked list as a string to preview in the console.
     *
     * @returns {string} A string in the format (value) -> (value) -> (null)
     */
    toString() {
        let current = this.head;
        let string = '';

        while (current) {
            string += `( ${current.value.toString()} ) -> `;
            current = current.next;
        }

        return string + '(null)';
    }
}

// Testing the code
const list = new LinkedList();

list.append('dog');
list.append('cat');
list.append('parrot');
list.append('hamster');
list.append('snake');
list.append('turtle');

console.log(list.toString());
