import React, {Component} from 'react';
import Node from './Node/Node';

import './pathfindingVisualizer.css';
import {dijkstra} from "../algorithms/dijkstra";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: []
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState(
            {grid}
        )
    }
    handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

    visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        console.log(visitedNodesInOrder);
    }

    render() {
        const {grid} = this.state;
        console.log(grid);
        return (
            <>
                <button onClick={() => this.visualizeDijkstra()}>Visualize Dijkstra's Algorithm</button>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {isFinish, isStart,} = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            isFinish={isFinish}
                                            isStart={isStart}/>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow)
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col, row, isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity, isVisited: false, isWall: false, previousNode: null
    }
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

export default PathfindingVisualizer;