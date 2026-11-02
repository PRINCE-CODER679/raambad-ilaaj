class HashTableLinearProbing:
    def __init__(self, size=10):
        self.size = size
        self.table = [None] * self.size
        self.DELETED = "&lt;DELETED&gt;" # Tombstone marker
    def _hash(self, key):
        return key % self.size
    def insert(self, key):
        idx = self._hash(key)
        for i in range(self.size):
            probe_idx = (idx + i) % self.size
            if self.table[probe_idx] in (None, self.DELETED):
                self.table[probe_idx] = key
                print(f"Inserted key {key} at slot {probe_idx}")
                return True
        print("Table Overflow: Cannot insert key.")
        return False
    def search(self, key):
        idx = self._hash(key)
        for i in range(self.size):
            probe_idx = (idx + i) % self.size
            if self.table[probe_idx] == key:
                return probe_idx
            if self.table[probe_idx] is None:
                break # Key not present
        return -1
    def delete(self, key):
        slot = self.search(key)
        if slot != -1:
            self.table[slot] = self.DELETED
            print(f"Deleted key {key} from slot {slot}")
            return True
        print(f"Key {key} not found.")
        return False