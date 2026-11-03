def selection_sort(salaries):
    arr = salaries.copy()
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] &lt; arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
def bubble_sort(salaries):
    arr = salaries.copy()
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] &gt; arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped: # Optimization
            break
    return arr
def display_top_5_highest(sorted_salaries):
    print("\nTop 5 Highest Salaries:")
    # Since array is sorted ascending, top salaries are at the end
    top_5 = sorted_salaries[-5:][::-1]
    for idx, sal in enumerate(top_5, 1):
        print(f"Rank {idx}: ${sal:.2f}")