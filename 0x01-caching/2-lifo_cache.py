#!/usr/bin/python3
"""
LIFO Cache Module.
"""
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """Implement LIFO policy in eviction"""

    def __init__(self):
        """Initialize LIFOCache module"""
        super().__init__()

    def put(self, key, item):
        """Add an item in cache using LIFO"""
        if key is not None and item is not None:
            val = self.cache_data
            if key not in val and len(val) >= self.MAX_ITEMS:
                last_key = list(val.keys())[-1]  # Get last key in
                del val[last_key]  # Remove last key
                print(f"DISCARD: {last_key}")
            val[key] = item

    def get(self, key):
        """Get an item by key"""
        if key is None:
            return None
        return self.cache_data.get(key, None)
