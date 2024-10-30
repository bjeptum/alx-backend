#!/usr/bin/python3
"""
FIFOCache Module.
"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """Implements FIFO policy for eviction"""

    def __init__(self):
        """Initialize the FIFO cache"""
        super().__init__()

    def put(self, key, item):
        """Add an item in the cache using FIFO"""
        if key is not None and item is not None:
            if len(self.cache_data) >= self.MAX_ITEMS:
                first_key = next(iter(self.cache_data))  # Get first key in
                del self.cache_data[first_key]  # Remove first item in
                print(f"DISCARD: {first_key}")
            self.cache_data[key] = item

    def get(self, key):
        """Get an item by key"""
        if key is None:
            return None
        return self.cache_data.get(key, None)
