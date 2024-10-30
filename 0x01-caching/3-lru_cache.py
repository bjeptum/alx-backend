#!/usr/bin/python3
"""
LRU Cache Module.
"""
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """Implement LRU policy in eviction"""

    def __init__(self):
        """Initialize LRUCache module"""
        super().__init__()

    def put(self, key, item):
        """Add an item in cache using LRU"""
        if key is not None and item is not None:
            # If the item is already in the cache, update it
            if key in self.cache_data:
                self.cache_data[key] = item
                return

            # If the cache is full, remove the least recently used item
            if len(self.cache_data) >= self.MAX_ITEMS:
                lru_key = next(iter(self.cache_data))  # Get first key (LRU)
                del self.cache_data[lru_key]  # Remove the LRU key
                print(f"DISCARD: {lru_key}")  # Print discarded key

            self.cache_data[key] = item  # Add new item

    def get(self, key):
        """Get an item by key"""
        if key is None:
            return None
        if key in self.cache_data:
            # Move the accessed item to the front (most recently used)
            item = self.cache_data[key]
            del self.cache_data[key]  # Remove it to reinsert it
            self.cache_data[key] = item  # Reinsert it as most recently used
            return item
        return None
