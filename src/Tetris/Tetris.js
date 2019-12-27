import React, { Component } from 'react';
import './Tetris.css';

class Tetris extends Component {
  _isMounted = false;
  timerId=null;
  state={
    map:[
      [7,7,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [2,7,7,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [2,2,2,4,4,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [1,1,1,1,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [3,3,3,6,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [3,5,5,6,6,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [5,5,0,6,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [4,4,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [4,4,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    time:-180,
  }
  componentDidMount(){
    this._isMounted=true;
    this.timerId=setInterval(()=>{this.eachframe()}, 17);
    document.addEventListener("keydown", (event)=>{this.keyhandler(event.keyCode)});
  }
  componentWillUnmount(){
    this._isMounted=false;
    clearInterval(this.timerId);
  }
  keyhandler(press){
    if(!this._isMounted)return;
    if(press===27)this.props.onClose();
  }
  eachframe(){
    if(!this._isMounted)return;
    this.setState({time:this.state.time+1});
    
  }
  render() {
    //IJLOSTZ
    const color=['#000000','#00FFFF','#0000FF','#FFAA00','#FFFF00','#00FF00','#9900FF','#FF0000'];
    var ttable=[];
    var ithelement=[];
    for(let i=0;i<20;i++){
      ithelement=[];
      for(let j=0;j<10;j++){
        ithelement.push(<td key={i+'row-'+j+'col'} style={{backgroundColor:color[this.state.map[j][19-i]]}}></td>);
      }
      ttable.push(<tr key={i+'row'}>{ithelement}</tr>);
    }
    const tmap=(<table><tbody>{ttable}</tbody></table>);
    return (
      <div className="Tetris">
        {tmap}
        {(this.state.time/60.0).toFixed(3)}
        <br/>
        <button onClick={this.props.onClose}>BACK</button>
      </div>
    );
  }
}

export default Tetris;