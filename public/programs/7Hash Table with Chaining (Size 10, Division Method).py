class HashTableChaining:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(self.size)] # Array of buckets (chains)
    def _hash_function(self, key):
        return key % self.size
    def insert(self, key, value):
        index = self._hash_function(key)
        bucket = self.table[index]
        for idx, (k, v) in enumerate(bucket):
            if k == key:
                bucket[idx] = (key, value) # Update existing key
                return
        bucket.append((key, value)) # Insert new pair
    def search(self, key):
        index = self._hash_function(key)
        bucket = self.table[index]
        for k, v in bucket:
            if k == key:
                return v
        return None
    def delete(self, key):
        index = self._hash_function(key)
        bucket = self.table[index]
        for idx, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[idx]
                print(f"Key {key} deleted from bucket {index}.")
                return True
        print(f"Delete Error: Key {key} not found.")
        return False