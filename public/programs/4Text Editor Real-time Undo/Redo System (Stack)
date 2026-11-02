class TextEditorUndoRedo:
    def __init__(self):
        self.document = ""
        self.undo_stack = []  # History of states for undo
        self.redo_stack = []  # History of undone states for redo
    def make_change(self, new_text):
        # Save current state before modifying
        self.undo_stack.append(self.document)
        self.document += new_text
        self.redo_stack.clear() # Clear redo history on new action
        print(f"Made Change: added '{new_text}'")
    def undo(self):
        if not self.undo_stack:
            print("Undo Failed: Nothing to undo.")
            return
        self.redo_stack.append(self.document)
        self.document = self.undo_stack.pop()
        print("Action Undone.")
    def redo(self):
        if not self.redo_stack:
            print("Redo Failed: Nothing to redo.")
            return
        self.undo_stack.append(self.document)
        self.document = self.redo_stack.pop()
        print("Action Redone.")
    def display_state(self):
        print(f"Current Document State: '{self.document}'")