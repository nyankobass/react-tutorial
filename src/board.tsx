import * as React from 'react';
// import * as ReactDOM from 'react-dom';

import Square from './square'

interface BoardProps {
  squares: string[]; /* ' ' or 'X' or 'O' */
  xIsNext: boolean;
  onClicked: (index: number) => void;
}


export default class Board extends React.Component<BoardProps> {
  renderSquare(i: number) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => { this.props.onClicked(i) }}
    />;
  }
  render() {
    return (
      <div>
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

