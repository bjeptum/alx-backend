#!/usr/bin/env python3
"""
Index range calculation module.
"""


from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Return a tuple containing the start index and end index
    Args:
        page (int): The page number (1-indexed).
        page_size (int): The number of items per page.

    Returns:
    Tuple[int, int]: A tuple containing the start index and end index.
    """
    if page < 1 or page_size < 1:
        raise Valueerror("Page and page_size must be positive integers.")

    start = (page - 1) * page_size
    end = start + page_size

    return start, end
