import React, { Component } from 'react';
import './Main.css';
import Tetris from '../Tetris/Tetris';
import Setting from '../Setting/Setting';

class Main extends Component {
  _isMounted = false;
  state={
    key:{
      up: 38,
      left: 37,
      down: 40,
      right: 39,
      select: 32,
      moveright: 39,
      moveleft: 37,
      spinright: 38,
      spinleft: 17,
      softdrop: 40,
      harddrop: 32,
      hold: 67,
    },
    view: 'main',
  }
  componentDidMount(){
    this._isMounted=true;
  }
  componentWillUnmount(){
    this._isMounted=false;
  }
  keytext(key){
    if(key===38){
      return '↑';
    }
    else if(key===37){
      return '←';
    }
    else if(key===40){
      return '↓';
    }
    else if(key===39){
      return '→';
    }
    else if(key===32){
      return 'SPACE BAR';
    }
    else if(key===17){
      return 'CTRL';
    }
    else if(key===18){
      return 'ALT';
    }
    else if(key===9){
      return 'TAB';
    }
    else if(key===16){
      return 'SHIFT';
    }
    else if(key===13){
      return 'ENTER';
    }
    else if(key===27){
      return 'ESC';
    }
    else if(key===188){
      return ',';
    }
    else if(key===190){
      return '.';
    }
    else if(key===191){
      return '/';
    }
    else if(key===186){
      return ';';
    }
    else if(key===222){
      return '\'';
    }
    else if(key===219){
      return '[';
    }
    else if(key===221){
      return ']';
    }
    else if(key===107){
      return '+';
    }
    else if(key===109||key===189){
      return '-';
    }
    else if(key===187){
      return '=';
    }
    else if(key===220){
      return '\\';
    }
    else if(key===111){
      return '/';
    }
    else if(key===106){
      return '*';
    }
    else{
      return String.fromCharCode(key);
    }
  }
  render() {
    if(this.state.view==='sprint'||this.state.view==='freeplay'){
      return (<Tetris type={this.state.view} set={this.state.key} onClose={()=>this.setState({view:'main'})}/>);
    }
    if(this.state.view==='setting'){
      return (<Setting set={this.state.key} onClose={()=>{this.setState({view:'main'});}} onChange={(keyType,newKey)=>{const keyset=this.state.key;keyset[keyType]=newKey;this.setState({key:keyset})}}/>);
    }
    return (
      <div className="Main">
        TETRIS
        <br/>
        <button onClick={()=>this.setState({view:'sprint'})}>SPRINT</button>
        <br/>
        <button onClick={()=>this.setState({view:'setting'})}>SETTING</button>
      </div>
    );
  }
}

export default Main;