def linear_search(arr, target_id):
    for index, account_id in enumerate(arr):
        if account_id == target_id:
            return index  # Target found at index
    return -1  # Target not present
def binary_search(arr, target_id):
    # Binary Search requires sorted array
    low = 0
    high = len(arr) - 1
    
    while low &lt;= high:
        mid = (low + high) // 2
        if arr[mid] == target_id:
            return mid
        elif arr[mid] &lt; target_id:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1
# Sample Execution
customer_ids = [105, 201, 304, 412, 509, 620, 715, 830] # Sorted list
search_target = 509
# 1. Linear Search Test
lin_pos = linear_search(customer_ids, search_target)
print(f"Linear Search: Customer ID {search_target} found at index {lin_pos}")
# 2. Binary Search Test
bin_pos = binary_search(customer_ids, search_target)
print(f"Binary Search: Customer ID {search_target} found at index {bin_pos}")