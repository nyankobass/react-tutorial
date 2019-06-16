import * as React from 'react';
// import * as ReactDOM from 'react-dom';

import Board from './board'

interface GameProps {

}
interface GameState {
    squaresHistory: { squares: string[], xIsNext: boolean }[]; /* ' ' or 'X' or 'O' */
    showIndex: number;
}

export default class Game extends React.Component<GameProps, GameState> {
    public state: GameState = {
        squaresHistory: Array(1).fill({ squares: Array(9).fill(' '), xIsNext: true }),
        showIndex: 0
    }

    private jumpTo(index: number) {
        this.setState({ showIndex: index })
    }

    private handleClicked(index: number) {
        const squares = this.state.squaresHistory[this.state.showIndex].squares.slice()
        const xIsNext = this.state.squaresHistory[this.state.showIndex].xIsNext

        if (squares[index] !== ' ') {
            return;
        }
        if (calculateWinner(squares) !== ' ') {
            return;
        }

        squares[index] = xIsNext ? 'X' : 'O';

        const history = this.state.squaresHistory.slice(0, this.state.showIndex + 1)
        history.push({ squares: squares, xIsNext: !xIsNext })
        this.setState({
            squaresHistory: history,
            showIndex: history.length - 1
        })
    }

    render() {
        /* 勝敗生成 */
        const winner = calculateWinner(this.state.squaresHistory[this.state.showIndex].squares);
        let status: string;
        if (winner === ' ') {
            status = 'Next player: ' + (this.state.squaresHistory[this.state.showIndex].xIsNext ? 'X' : 'O');
        }
        else {
            status = 'Winner: ' + winner;
        }

        /* プレイバック生成 */
        const moveButton = this.state.squaresHistory.map((value, index) => {
            const description = index === 0 ? "Go to game start" : "Go to move #" + index;

            return (
                <li>
                    <button onClick={() => this.jumpTo(index)}>{description}</button>
                </li>
            )
        })

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.state.squaresHistory[this.state.showIndex].squares}
                        xIsNext={this.state.squaresHistory[this.state.showIndex].xIsNext}
                        onClicked={this.handleClicked.bind(this)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moveButton}</ol>
                </div>
            </div>
        );
    }
}


/* 勝敗判定ヘルパー関数 */
function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] !== ' ' && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return ' ';
}