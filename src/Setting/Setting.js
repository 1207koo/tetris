import React, { Component } from 'react';
import './Setting.css';

class Setting extends Component {
  _isMounted = false;
  state={
    change:'',
    changedkey:0,
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
    if(this.state.change!==''){
      if(press!==27)this.setState({changedkey:press});
      else{
        this.setState({change:'',changedkey:0});
      }
    }
    else if(press===27){
      this.props.onClose();
    }
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
    if(this.state.change===''){
      var keysetting=[];
      const keyname=[
        'moveright',
        'moveleft',
        'spinright',
        'spinleft',
        'softdrop',
        'harddrop',
        'hold',
      ];
      for(let i=0;i<7;i++){
        keysetting.push(
          <div className="keysetting" key={keyname[i]+'setting'}>
            {keyname[i]+': '+this.keytext(this.props.set[keyname[i]])+' '}
            <button onClick={()=>{this.setState({change:keyname[i], changedkey:this.props.set[keyname[i]]})}}>change</button>
            <br/>
          </div>
        )
      }
      return (
        <div className="Setting">
          {keysetting}
          <button onClick={this.props.onClose}>BACK</button>
        </div>
      );
    }
    else{
      return(
        <div className="Toggle">
          {'Changing \''+this.state.change+'\' key'}
          <br/>
          {this.keytext(this.props.set[this.state.change])+'  ->  '+this.keytext(this.state.changedkey)}
          <br/>
          <button onClick={()=>{this.props.onChange(this.state.change,this.state.changedkey);this.setState({change:'',changedkey:0})}}>CHANGE</button>
          <button onClick={()=>{this.setState({change:'',changedkey:0})}}>CANCEL</button>
        </div>
      )
    }
  }
}

export default Setting;