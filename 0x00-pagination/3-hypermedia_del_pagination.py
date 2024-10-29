#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """Get a page of dataset resilient to deletions"""
        assert index is None or (
            0 <= index < len(self.indexed_dataset())
        ), "Index is out of range"
        assert page_size > 0, "Page size must be a positive integer"

        indexed_data = self.indexed_dataset()
        data = []
        # Start from the given index and collect items
        current_index = index if index is not None else 0
        for _ in range(page_size):
            if current_index in indexed_data:
                data.append(indexed_data[current_index])
            current_index += 1

        return {
            'index': index if index is not None else 0,
            'next_index': current_index,
            'page_size': len(data),
            'data': data,
        }
