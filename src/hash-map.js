/**
 * A hash map implementation.
 */
class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.75;
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
}
