#!/usr/bin/env python3
"""
BasicCache module.
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """ Caching system with no limits"""
    def put(self, key, item):
        """ Add an item into the cache"""
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """Retrieve an item by key"""
        if key is None:
            return None
        else:
            return self.cache_data.get(key, None)
