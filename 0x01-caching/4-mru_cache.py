#!/usr/bin/python3
"""
MRU Cache Module.
"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """Implement MRU policy in eviction"""

    def __init__(self):
        """Initialize MRUCache module"""
        super().__init__()

    def put(self, key, item):
        """Add an item in cache using MRU"""
        if key is not None and item is not None:
            # If the item is already in the cache, update it
            if key in self.cache_data:
                self.cache_data[key] = item
                return

            # If the cache is full, remove the most recently used item
            if len(self.cache_data) >= self.MAX_ITEMS:
                # MRU:the last inserted is the MRU
                mru_key = next(reversed(self.cache_data)) # Get last key
                del self.cache_data[mru_key]  # Remove the MRU key
                print(f"DISCARD: {mru_key}")  # Print discarded key

            self.cache_data[key] = item  # Add new item

    def get(self, key):
        """Get an item by key"""
        if key is None:
            return None
        return self.cache_data.get(key, None)
