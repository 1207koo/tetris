import React, { Component } from 'react';
import './Gameover.css';

class Gameover extends Component {
  _isMounted = false;
  state={
  }
  componentDidMount(){
    this._isMounted=true;
    document.addEventListener("keydown", (event)=>{this.keyhandler(event.keyCode)});
  }
  componentWillUnmount(){
    this._isMounted=false;
  }
  keyhandler(press){
    if(!this._isMounted)return;
    if(press===27){
      this.props.onClose();
    }
  }
  render() {
    return(
      <div className="Gameover">
        {'Game '+this.props.clear?'clear!':'over'}
        <br/><br/><br/>
        {'score: '+this.props.score}
        <br/>
        {(this.props.type==='sprint'?null:(<div className="Line-clear">{'line: '+this.props.line}<br/></div>))}
        {'time: '+this.props.time+'sec'}
        <br/>
        <button onClick={()=>this.props.onReplay(this.props.type)}>REPLAY</button>
        <br/>
        <button onClick={()=>this.props.onClose()}>BACK</button>
      </div>
    )
  }
}

export default Gameover;