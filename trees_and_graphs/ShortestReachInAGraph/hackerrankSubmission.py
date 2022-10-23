from collections import deque


class Graph:
    def __init__(self, size):
        self.size = size
        self.map = {}
        self.result = []
        self.addVertices()

    def addVertices(self):
        for i in range(self.size - 1):
            self.result.append(-1)
            self.map[i + 1] = set()
        self.map[self.size] = set()

    def connect(self, x, y):
        self.map[x + 1].add(y + 1)
        self.map[y + 1].add(x + 1)

    def bfs(self, s):
        visited = set()
        visitList = deque()
        visitList.append([s, 0])
        visited.add(s)
        while visitList:
            [node, distance] = visitList.popleft()
            if node < s:
                self.result[node - 1] = distance
            elif node > s:
                self.result[node - 2] = distance
            for adj in self.map[node]:
                if adj not in visited:
                    visitList.append([adj, distance + 6])
                    visited.add(adj)

    def find_all_distances(self, s):
        s = s + 1
        self.bfs(s)
        print(" ".join(map(str, self.result)))
        return self.result


def printResult(list):
    for item in list:
        graph = Graph(item["n"])
        for i in item["edges"]:
            graph.connect(i[0] - 1, i[1] - 1)
        graph.find_all_distances(item["s"] - 1)


printResult(
    [
        {"n": 6, "edges": [[1, 2], [2, 3], [3, 4], [1, 5]], "s": 1},
        {"n": 4, "edges": [[1, 2], [1, 3]], "s": 1},
        {"n": 3, "edges": [[2, 3]], "s": 2},
        {"n": 7, "edges": [[1, 2], [1, 3], [3, 4], [2, 5]], "s": 2},
    ]
)
