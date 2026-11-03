class StudentNode:
    def __init__(self, roll_no, name, marks):
        self.roll_no = roll_no
        self.name = name
        self.marks = marks
        self.next = None
class StudentLinkedList:
    def __init__(self):
        self.head = None
    def add_student(self, roll_no, name, marks):
        new_node = StudentNode(roll_no, name, marks)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = new_node
    def delete_student(self, roll_no):
        curr = self.head
        prev = None
        while curr and curr.roll_no != roll_no:
            prev = curr
            curr = curr.next
        if not curr:
            print(f"Delete Error: Roll No {roll_no} not found.")
            return
        if not prev:
            self.head = curr.next
        else:
            prev.next = curr.next
        print(f"Deleted Student Roll No: {roll_no}")
    def search_student(self, roll_no):
        curr = self.head
        while curr:
            if curr.roll_no == roll_no:
                return curr
            curr = curr.next
        return None
    def display(self):
        curr = self.head
        print("\n--- Student Records ---")
        while curr:
            print(f"Roll No: {curr.roll_no} | Name: {curr.name} | Marks: {curr.marks}")
            curr = curr.next