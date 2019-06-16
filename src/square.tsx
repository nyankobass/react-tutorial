import * as React from 'react';
// import * as ReactDOM from 'react-dom';

interface SquareProps {
  value: string;
  onClick: () => void;
}

/* State Less な Component は関数で表現できる */
export default function Square(props:SquareProps){
  return (
      <button className="square" onClick={() => {
          props.onClick();
        }}>
        {props.value}
      </button>
    );    
}

/* クラスで表現する必要はない */
// export default class Square extends React.Component<SquareProps> {
//   render() {
//     return (
//       <button className="square" onClick={() => {
//           this.props.onClick();
//         }}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
