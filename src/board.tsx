import * as React from 'react';
// import * as ReactDOM from 'react-dom';

import Square from './square'

interface BoardProps {

}
interface BoardState {
  squares: string[]; /* ' ' or 'X' or 'O' */
  xIsNext: boolean;
}

export default class Board extends React.Component<BoardProps, BoardState> {

  public state: BoardState = {
    squares: Array(9).fill(' '),
    xIsNext: true
  }

  private handleClicked(index:number) {
    if (this.state.squares[index] !== ' '){
      return;
    }
    if (calculateWinner(this.state.squares) !== ' '){
      return;
    }

    const squares = this.state.squares.slice();
    squares[index] = this.state.xIsNext ? 'X' : 'O';
    this.setState({squares:squares, xIsNext: !this.state.xIsNext})
  }  

  renderSquare(i: number) {
    return <Square
      value={this.state.squares[i]}
      onClick={()=>{this.handleClicked(i)}}
      />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status: string;
    if (winner === ' '){
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    else{
      status = 'Winner: ' + winner;
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
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