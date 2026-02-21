import { HashMap } from './hash-map.js';

const map = new HashMap();

// Insert enough keys to exceed load factor and force resize
for (let i = 0; i < 40; i++) {
    map.set(`key${i}`, i);
}

console.log('Size:', map.size);
console.log('Capacity:', map.capacity);

// Check a few values to ensure they survived resizing
console.log('key0:', map.buckets[map.hash('key0') % map.capacity].head.data);
console.log('key15:', map.buckets[map.hash('key15') % map.capacity].head.data);
console.log('key39:', map.buckets[map.hash('key39') % map.capacity].head.data);

// Print bucket distribution
console.log('\nBucket distribution:');
map.buckets.forEach((bucket, i) => {
    let count = 0;
    for (const _ of bucket) count++;
    console.log(`Bucket ${i}: ${count} entrie(s)`);
});
