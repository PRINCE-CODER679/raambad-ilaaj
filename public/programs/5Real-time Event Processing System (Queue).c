class EventQueueSystem:
    def __init__(self):
        self.event_queue = []
    def add_event(self, event_id, event_name):
        event = {"id": event_id, "name": event_name}
        self.event_queue.append(event) # Enqueue at end
        print(f"Event Added: [{event_id}] {event_name}")
    def process_next_event(self):
        if not self.event_queue:
            print("Processing Error: Queue is empty.")
            return None
        processed_event = self.event_queue.pop(0) # Dequeue from front
        print(f"Processed Event: [{processed_event['id']}] {processed_event['name']}")
        return processed_event
    def display_pending_events(self):
        print(f"\nPending Events Count: {len(self.event_queue)}")
        for idx, ev in enumerate(self.event_queue, 1):
            print(f"  {idx}. ID: {ev['id']} | Name: {ev['name']}")
    def cancel_event(self, event_id):
        for idx, ev in enumerate(self.event_queue):
            if ev['id'] == event_id:
                canceled = self.event_queue.pop(idx)
                print(f"Canceled Event: [{canceled['id']}] {canceled['name']}")
                return True
        print(f"Cancel Error: Event ID {event_id} not found in pending queue.")
        return False