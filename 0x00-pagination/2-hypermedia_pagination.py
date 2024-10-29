#!/usr/bin/env python3
"""
Index range calculation module.
"""

import csv
import math
from typing import List, Dict, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Return a tuple containing the start index and end index
    Args:
        page (int): The page number (1-indexed).
        page_size (int): The number of items per page.

    Returns:
    Tuple[int, int]: A tuple containing the start index and end index.
    """
    assert page > 0, "Page must be a positive integer"
    assert page_size > 0, "Page size must be a positive integer"

    start = (page - 1) * page_size
    end = start + page_size

    return start, end


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Get a page of the dataset.
        """
        assert isinstance(page, int) and page > 0, (
               "Page must be a positive integer"
               )
        assert isinstance(page_size, int) and page_size > 0, (
                "Page size must be a positive integer"
                )

        start_index, end_index = index_range(page, page_size)
        dataset = self.dataset()

        if start_index >= len(dataset):
            return []  # Out of range

        return dataset[start_index:end_index]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """Create hypermedia links."""
        dataset_page = self.get_page(page, page_size)
        total_items = len(self.dataset())
        total_pages = (total_items + page_size - 1) // page_size
        links = {
                'page_size': len(dataset_page),
                'page': page,
                'data': dataset_page,
                'next_page': page + 1 if page < total_pages else None,
                'prev_page': page - 1 if page > 1 else None,
                'total_pages': total_pages
                }

        return links
