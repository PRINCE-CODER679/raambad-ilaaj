from collections import deque
class CityGraph:
    def __init__(self, locations):
        self.nodes = locations # e.g. ['A', 'B', 'C', 'D']
        self.node_map = {name: i for i, name in enumerate(locations)}
        self.n = len(locations)
        # Adjacency Matrix for DFS
        self.adj_matrix = [[0]*self.n for _ in range(self.n)]
        # Adjacency List for BFS
        self.adj_list = {loc: [] for loc in locations}
    def add_route(self, u, v):
        i, j = self.node_map[u], self.node_map[v]
        self.adj_matrix[i][j] = 1
        self.adj_matrix[j][i] = 1
        self.adj_list[u].append(v)
        self.adj_list[v].append(u)
    def bfs_adjacency_list(self, start_node):
        visited = set([start_node])
        queue = deque([start_node])
        order = []
        while queue:
            curr = queue.popleft()
            order.append(curr)
            for neighbor in self.adj_list[curr]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        print("BFS Traversal (Adjacency List):", " -&gt; ".join(order))
    def dfs_adjacency_matrix(self, start_node):
        visited = [False] * self.n
        order = []
        def dfs_util(u_idx):
            visited[u_idx] = True
            order.append(self.nodes[u_idx])
            for v_idx in range(self.n):
                if self.adj_matrix[u_idx][v_idx] == 1 and not visited[v_idx]:
                    dfs_util(v_idx)
        dfs_util(self.node_map[start_node])
        print("DFS Traversal (Adjacency Matrix):", " -&gt; ".join(order))