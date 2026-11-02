ef library_borrowing_system(borrow_records):
    # borrow_records: dict {book_title: [borrow_count_per_member]}
    # or list of borrow counts per member e.g., [3, 0, 5, 0, 2, 5, 1]
    
    if not borrow_records:
        return "No borrowing records available."
    # 1. Compute average number of books borrowed per member
    total_books = sum(borrow_records)
    num_members = len(borrow_records)
    avg_borrowed = total_books / num_members if num_members &gt; 0 else 0
    # 2. Find highest and lowest borrow counts
    max_borrowed = max(borrow_records)
    min_borrowed = min(borrow_records)
    # 3. Count members who have not borrowed any books (count == 0)
    zero_borrowers = borrow_records.count(0)
    # 4. Display most frequently borrowed count (mode)
    freq_map = {}
    for count in borrow_records:
        freq_map[count] = freq_map.get(count, 0) + 1
    
    mode_count = max(freq_map, key=freq_map.get)
    print("--- Library Borrowing Analysis ---")
    print(f"Total Members: {num_members}")
    print(f"Average Books Borrowed: {avg_borrowed:.2f}")
    print(f"Maximum Borrowed by a Member: {max_borrowed}")
    print(f"Minimum Borrowed by a Member: {min_borrowed}")
    print(f"Members with Zero Borrowings: {zero_borrowers}")
    print(f"Mode (Most Frequent Borrow Count): {mode_count} (Frequency: {freq_map[mode_count]})")