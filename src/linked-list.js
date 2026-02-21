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
     * Returns the data of the node at the given index.
     *
     * @param {*} index - The index of the node to retrieve.
     * @returns {*} The data of the node, or undefined if it doesn't exist.
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
        return current ? current.data : undefined;
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
     * Returns true if the passed in data is in the list, otherwise returns false.
     *
     * @returns {boolean} Whether the data is contained or not.
     */
    contains(data) {
        let current = this.head;

        while (current) {
            if (current.data === data) return true;
            current = current.next;
        }
        return false;
    }

    /**
     * Returns the index of the node containing the given data. If the data can’t be found, returns -1.
     * If more than one node have matching datas, the first-found node's index is returned.
     *
     * @param {*} data - The data to search the index of.
     * @returns {number} The index at which the data was found.
     */
    findIndex(data) {
        let current = this.head;
        let i = 0;

        while (current) {
            if (current.data === data) return i;
            current = current.next;
            i++;
        }
        return -1;
    }

    /**
     * Returns the linked list as a string to preview in the console.
     *
     * @returns {string} A string in the format (data) -> (data) -> (null)
     */
    toString() {
        let current = this.head;
        let string = '';

        while (current) {
            string += `( ${current.data.toString()} ) -> `;
            current = current.next;
        }

        return string + '(null)';
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
