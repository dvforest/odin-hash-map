import { LinkedList } from './linked-list.js';

/**
 * A hash map implementation.
 */
class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.size = 0;
        this.buckets = Array.from({ length: this.capacity }, () => new LinkedList());
    }

    /**
     * Generates a hash code by adding the charcode from each character of a string.
     *
     *
     * @param {string} key - The string key used to generate the hash code.
     * @returns {number} The generated hash code.
     */
    hash(key) {
        const MOD = 1000000007; // To avoid exceedingly large integers.
        const PRIME = 31; // To reduce collisions for similar strings.

        let hashCode = 0;
        for (let i = 0; i < key.length; i++) {
            hashCode = (hashCode * PRIME + key.charCodeAt(i)) % MOD;
        }

        return hashCode;
    }

    /**
     * Assigns a value to a key and store it in the hash map.
     *
     * @param {string} key - The name of the key.
     * @param {*} value - The value assigned to the key.
     */
    set(key, value) {
        // Resize if needed
        if ((this.size + 1) / this.capacity >= this.loadFactor) {
            this.resize();
        }

        const bucket = this.getBucket(key);

        // Overwrite existing key if found
        for (const data of bucket) {
            if (data.key === key) {
                data.value = value;
                return;
            }
        }

        // Otherwise append new entry
        bucket.append({ key, value });
        this.size += 1;
    }

    /**
     * Double the capacity and redistribute the existing keys in the new buckets.
     */
    resize() {
        // Temporarily store old buckets
        const oldBuckets = this.buckets;

        // Double capacity and create new buckets
        this.capacity *= 2;
        this.buckets = Array.from({ length: this.capacity }, () => new LinkedList());

        // Reset size before reinsterting each key
        this.size = 0;

        // Use iterator to insert keys back into the new buckets
        for (const bucket of oldBuckets) {
            for (const { key, value } of bucket) {
                this.set(key, value);
            }
        }
    }

    /**
     * Returns the stored value based on a given key, or null if not found.
     *
     * @param {string} key - The key used to retrieve the value.
     * @returns {*} The value found at the key.
     */
    get(key) {
        const bucket = this.getBucket(key);
        for (const entry of bucket) {
            if (entry.key === key) return entry.value;
        }
        return null;
    }

    /**
     * Returns true or false based on whether the given key is found.
     *
     * @param {string} key - The key to search for.
     * @returns {boolean} If the key is found.
     */
    has(key) {
        const bucket = this.getBucket(key);
        for (const entry of bucket) {
            if (entry.key === key) return true;
        }
        return false;
    }

    /**
     * Removes an entry associated with a given key.
     * @param {string} key - The key of the node to remove.
     */
    remove(key) {
        const bucket = this.getBucket(key);
        if (bucket.remove((entry) => entry.key === key)) {
            this.size -= 1;
            return true;
        }
        return false;
    }

    /**
     * Returns the total number of stored keys in the hash map.
     * @returns {number} The total of stored keys.
     */
    length() {
        return this.size;
    }

    /**
     * Removes all entries in the hash map while keeping the same capacity.
     */
    clear() {
        this.buckets = Array.from({ length: this.capacity }, () => new LinkedList());
        this.size = 0;
    }

    /**
     * Returns an array containing all keys in the hash map.
     * @returns {string[]} An array of stored keys.
     */
    keys() {
        const array = [];
        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                array.push(entry.key);
            }
        }
        return array;
    }

    /**
     * Returns an array containing all values in the hash map.
     * @returns {*[]} An array of stored values.
     */
    values() {
        const array = [];
        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                array.push(entry.value);
            }
        }
        return array;
    }

    /**
     * Returns the bucket (linked list) associated with a given key.
     * @param {string} key - The key to hash in order to locate its bucket.
     * @returns {LinkedList} The bucket where entries for this key are stored.
     */
    getBucket(key) {
        const hashCode = this.hash(key);
        const bucketIndex = hashCode % this.capacity;
        return this.buckets[bucketIndex];
    }
}

export { HashMap };
