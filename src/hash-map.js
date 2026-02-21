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
     * Generates a hash code by adding the charcode from each character of a string
     *
     *
     * @param {string} key - The string key used to generate the hash code.
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
     * @param {string} value - The value assigned to the key.
     */
    set(key, value) {
        // Resize if needd
        if ((this.size + 1) / this.capacity >= this.loadFactor) {
            this.resize();
        }

        // Generate hash code and bucket for the current key
        const hashCode = this.hash(key);
        const bucketIndex = hashCode % this.capacity;
        const bucket = this.buckets[bucketIndex];

        // Overwrite existing key if found
        for (const data of bucket) {
            if (data.key === key) {
                data.value = value; // Update in place
                return; // Do not increase size
            }
        }

        // Otherwise append new entry
        bucket.append({ key, value });
        this.size += 1;
    }

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
}

export { HashMap };
