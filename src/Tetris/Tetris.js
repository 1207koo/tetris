import React, { Component } from 'react';
import './Tetris.css';

class Tetris extends Component {
  _isMounted = false;
  timerId=null;
  color=['#000000','#00FFFF','#0000FF','#FFAA00','#FFFF00','#00FF00','#9900FF','#FF0000',
                   '#22A1A1','#2222A1','#A17722','#A1A122','#22A122','#6E22A1','#A12222',];
  dx=[
    [],
    [[1,2,3,4],[2,2,2,2],[0,1,2,3],[2,2,2,2]],
    [[1,1,2,3],[2,2,2,3],[1,2,3,3],[1,2,2,2]],
    [[1,2,3,3],[2,2,2,3],[1,1,2,3],[1,2,2,2]],
    [[2,2,3,3],[2,2,3,3],[1,1,2,2],[1,1,2,2]],
    [[1,2,2,3],[2,2,3,3],[1,2,2,3],[1,1,2,2]],
    [[1,2,2,3],[2,2,2,3],[1,2,2,3],[1,2,2,2]],
    [[1,2,2,3],[2,2,3,3],[1,2,2,3],[1,1,2,2]],
  ];
  dy=[
    [],
    [[2,2,2,2],[0,1,2,3],[2,2,2,2],[1,2,3,4]],
    [[2,3,2,2],[1,2,3,3],[2,2,1,2],[1,1,2,3]],
    [[2,2,2,3],[1,2,3,1],[1,2,2,2],[3,1,2,3]],
    [[2,3,2,3],[1,2,1,2],[1,2,1,2],[2,3,2,3]],
    [[2,2,3,3],[2,3,1,2],[1,1,2,2],[2,3,1,2]],
    [[2,2,3,2],[1,2,3,2],[2,1,2,2],[2,1,2,3]],
    [[3,2,3,2],[1,2,2,3],[2,1,2,1],[1,2,2,3]],
  ];
  spinIx=[
    [0,-1,2,-1,2],
    [-1,0,0,0,0],
    [-1,1,-2,1,-2],
    [0,0,0,0,0],
  ];
  spinIy=[
    [0,0,0,0,0],
    [0,0,0,1,-2],
    [1,1,1,0,0],
    [1,1,1,-1,2],
  ];
  spinOx=[
    [0],
    [0],
    [-1],
    [-1],
  ];
  spinOy=[
    [0],
    [-1],
    [-1],
    [0],
  ];
  spinEx=[
    [0,0,0,0,0],
    [0,1,1,0,1],
    [0,0,0,0,0],
    [0,-1,-1,0,-1],
  ];
  spinEy=[
    [0,0,0,0,0],
    [0,0,-1,2,2],
    [0,0,0,0,0],
    [0,0,-1,2,2],
  ];
  state={
    map:[
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    time:-180,
    block: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    drop: 60,
    stop: 60,
    now: 0,
    hold: 0,
    x: 2,
    y: 18,
    d: 0,
    holded: false,
    lastmove: 'started',
    backtoback: false,
    combo: 0,
    erasedline: 0,
    lineclearmessage: '',
    score: 0,
  }
  componentDidMount(){
    this._isMounted=true;
    this.timerId=setInterval(()=>{this.eachframe()}, 17);
    document.addEventListener("keydown", (event)=>{this.keyhandler(event.keyCode)});
    this.fill();
  }
  componentWillUnmount(){
    this._isMounted=false;
    clearInterval(this.timerId);
  }
  moveright(){
    let able=true;
    for(let i=0;i<4;i++){
      const rx=this.state.x+this.dx[this.state.now][this.state.d][i]+1;
      const ry=this.state.y+this.dy[this.state.now][this.state.d][i];
      if(rx<0||rx>=10||ry<0||ry>=30||this.state.map[rx][ry]!==0)able=false;
    }
    if(able)this.setState({x:this.state.x+1,stop:60,lastmove:'moveright'});
  }
  moveleft(){
    let able=true;
    for(let i=0;i<4;i++){
      const rx=this.state.x+this.dx[this.state.now][this.state.d][i]-1;
      const ry=this.state.y+this.dy[this.state.now][this.state.d][i];
      if(rx<0||rx>=10||ry<0||ry>=30||this.state.map[rx][ry]!==0)able=false;
    }
    if(able)this.setState({x:this.state.x-1,stop:60,lastmove:'moveleft'});
  }
  spinright(){
    const ox=this.state.now===1?this.spinIx:(this.state.now===4?this.spinOx:this.spinEx);
    const oy=this.state.now===1?this.spinIy:(this.state.now===4?this.spinOy:this.spinEy);
    let tx=[];
    let ty=[];
    for(let i=0;i<ox[0].length;i++){
      tx.push(ox[this.state.d][i]-ox[(this.state.d+1)%4][i]);
      ty.push(oy[this.state.d][i]-oy[(this.state.d+1)%4][i]);
    }
    for(let j=0;j<tx.length;j++)
    {
      let able=true;
      for(let i=0;i<4;i++){
        const rx=this.state.x+this.dx[this.state.now][(this.state.d+1)%4][i]+tx[j];
        const ry=this.state.y+this.dy[this.state.now][(this.state.d+1)%4][i]+ty[j];
        if(rx<0||rx>=10||ry<0||ry>=30||this.state.map[rx][ry]!==0)able=false;
      }
      if(able){
        this.setState({stop:60,d:(this.state.d+1)%4,x:this.state.x+tx[j],y:this.state.y+ty[j],lastmove:'spinright'});
        return;
      }
    }
  }
  spinleft(){
    const ox=this.state.now===1?this.spinIx:(this.state.now===4?this.spinOx:this.spinEx);
    const oy=this.state.now===1?this.spinIy:(this.state.now===4?this.spinOy:this.spinEy);
    let tx=[];
    let ty=[];
    for(let i=0;i<ox[0].length;i++){
      tx.push(ox[this.state.d][i]-ox[(this.state.d+3)%4][i]);
      ty.push(oy[this.state.d][i]-oy[(this.state.d+3)%4][i]);
    }
    for(let j=0;j<tx.length;j++)
    {
      let able=true;
      for(let i=0;i<4;i++){
        const rx=this.state.x+this.dx[this.state.now][(this.state.d+3)%4][i]+tx[j];
        const ry=this.state.y+this.dy[this.state.now][(this.state.d+3)%4][i]+ty[j];
        if(rx<0||rx>=10||ry<0||ry>=30||this.state.map[rx][ry]!==0)able=false;
      }
      if(able){
        this.setState({stop:60,d:(this.state.d+3)%4,x:this.state.x+tx[j],y:this.state.y+ty[j],lastmove:'spinleft'});
        return;
      }
    }
  }
  softdrop(){
    let able=true;
    for(let i=0;i<4;i++){
      const rx=this.state.x+this.dx[this.state.now][this.state.d][i];
      const ry=this.state.y+this.dy[this.state.now][this.state.d][i]-1;
      if(rx<0||rx>=10||ry<0||ry>=30||this.state.map[rx][ry]!==0)able=false;
    }
    if(able)this.setState({y:this.state.y-1,stop:60,drop:60,lastmove:'softdrop'});
  }
  harddrop(){
    let able=true;
    for(let i=0;i<4;i++){
      const rx=this.state.x+this.dx[this.state.now][this.state.d][i];
      const ry=this.state.y+this.dy[this.state.now][this.state.d][i]-1;
      if(rx<0||rx>=10||ry<0||ry>=30||this.state.map[rx][ry]!==0)able=false;
    }
    if(able)this.setState({lastmove:'harddrop'});
    this.popblock();
    this.setState({y:18,stop:60,drop:60});
  }
  hold(){
    if(this.state.hold===0){
      let newnow=this.state.block[0];
      let newblock=this.state.block;
      for(let i=0;i<14;i++)newblock[i]=newblock[i+1];
      if(newblock[7]===0){
        let i=0;
        for(;newblock[i]!==0;i++){}
        let newb=[1,2,3,4,5,6,7];
        for(let j=7;j>0;j--){
          let k=Math.floor(Math.random()*j);
          let tmp=newb[k];
          newb[k]=newb[j-1];
          newb[j-1]=tmp;
          newblock[i]=newb[j-1];
          i++;
        }
      }
      this.setState({now:newnow,block:newblock,x:2,d:0,hold:this.state.now,holded:true,lastmove:'hold'});
    }
    else this.setState({x:2,y:18,d:0,now:this.state.hold,hold:this.state.now,holded:true,lastmove:'hold'});
  }
  keyhandler(press){
    if(!this._isMounted)return;
    if(press===27)this.props.onClose();
    else if(this.state.time<0||this.state.now===0)return;
    else if(press===this.props.set.moveright)this.moveright();
    else if(press===this.props.set.moveleft)this.moveleft();
    else if(press===this.props.set.spinright)this.spinright();
    else if(press===this.props.set.spinleft)this.spinleft();
    else if(press===this.props.set.softdrop)this.softdrop();
    else if(press===this.props.set.harddrop)this.harddrop();
    else if(press===this.props.set.hold&&!this.state.holded)this.hold();
  }
  fill(){
    let newblock=this.state.block;
    if(newblock[7]===0){
      let i=0;
      for(;newblock[i]!==0;i++){}
      let newb=[1,2,3,4,5,6,7];
      for(let j=7;j>0;j--){
        let k=Math.floor(Math.random()*j);
        let tmp=newb[k];
        newb[k]=newb[j-1];
        newb[j-1]=tmp;
        newblock[i]=newb[j-1];
        i++;
      }
    }
    else return;
    if(newblock[7]===0){
      let i=0;
      for(;newblock[i]!==0;i++){}
      let newb=[1,2,3,4,5,6,7];
      for(let j=7;j>0;j--){
        let k=Math.floor(Math.random()*j);
        let tmp=newb[k];
        newb[k]=newb[j-1];
        newb[j-1]=tmp;
        newblock[i]=newb[j-1];
        i++;
      }
    }
    this.setState({block:newblock});
  }
  isTspin(){
    if(this.state.now!==6)return 0;
    if(this.state.lastmove!=='spinright'&&this.state.lastmove!=='spinleft')return 0;
    let corner=0;
    if(this.state.x-1<0||this.state.x-1>=0||this.state.y-1<0||this.state.y-1>=30||this.state.map[this.state.x-1][this.state.y-1]!==0)corner++;
    if(this.state.x-1<0||this.state.x-1>=0||this.state.y+1<0||this.state.y+1>=30||this.state.map[this.state.x-1][this.state.y+1]!==0)corner++;
    if(this.state.x+1<0||this.state.x+1>=0||this.state.y-1<0||this.state.y-1>=30||this.state.map[this.state.x+1][this.state.y-1]!==0)corner++;
    if(this.state.x+1<0||this.state.x+1>=0||this.state.y+1<0||this.state.y+1>=30||this.state.map[this.state.x+1][this.state.y+1]!==0)corner++;
    if(corner<3)return 0;
    let able=true;
    for(let i=0;i<4;i++){
      const rx=this.state.x+this.dx[this.state.now][this.state.d][i];
      const ry=this.state.y+this.dy[this.state.now][this.state.d][i]+1;
      let pass=false;
      for(let j=0;j<4;j++){
        const tx=this.state.x+this.dx[this.state.now][this.state.d][j];
        const ty=this.state.y+this.dy[this.state.now][this.state.d][j];
        if(rx===tx&&ry===ty){
          pass=true;
          continue;
        }
      }
      if(pass)continue;
      if(rx<0||rx>=10||ry<0||ry>=30||this.state.map[rx][ry]!==0)able=false;
    }
    if(able)return 1;//mini
    else return 2;//tspin
  }
  popblock(){
    let newline=0;
    let newscore=0;
    if(this.state.now!==0){
      for(let newy=this.state.y;;newy--){
        let able=true;
        for(let i=0;i<4;i++){
          const rx=this.state.x+this.dx[this.state.now][this.state.d][i];
          const ry=newy+this.dy[this.state.now][this.state.d][i];
          if(rx<0||rx>=10||ry<0||ry>=30||this.state.map[rx][ry]!==0)able=false;
        }
        if(!able){
          const newmap=this.state.map;
          for(let i=0;i<4;i++){
            const rx=this.state.x+this.dx[this.state.now][this.state.d][i];
            const ry=newy+1+this.dy[this.state.now][this.state.d][i];
            newmap[rx][ry]=this.state.now;
          }
          let bcount=[];
          for(let i=0;i<30;i++)bcount.push(0);
          for(let i=0;i<10;i++){
            for(let j=0;j<30;j++){
              if(newmap[i][j]!==0)bcount[j]++;
            }
          }
          let clearedline=0;
          for(let i=0;i<30;i++){
            if(bcount[i]===10)clearedline++;
          }
          let message='';
          let newcombo=(clearedline===0)?0:(this.state.combo+1);
          let newbacktoback=(clearedline===4||this.isTspin()>0)?true:(clearedline>0?false:this.state.backtoback);
          let addscore=0;
          if(newbacktoback&&this.state.backtoback&&clearedline>0){
            message=message+'BackToBack ';
            addscore++;
          }
          if(this.isTspin()===1)message=message+'Tspin-mini ';
          else if(this.isTspin()===2){
            message=message+'Tspin ';
            addscore+=1+clearedline;
          }
          if(clearedline===1)message=message+'Single ';
          if(clearedline===2){
            message=message+'Double ';
            addscore++;
          }
          if(clearedline===3){
            message=message+'Triple ';
            addscore+=2;
          }
          if(clearedline===4){
            message=message+'Tetris ';
            addscore+=4;
          }
          if(newcombo>1){
            message=message+(newcombo-1)+'combo ';
            const damage=[0,0,0,1,1,2,2,3,3,4,4,4,5,5];
            if(newcombo>13)addscore+=5;
            else addscore+=damage[newcombo];
          }
          newscore=this.state.score+addscore;
          newline=this.state.erasedline+clearedline;
          if(newline>=40&&this.props.type==='sprint'){
            this.props.setTime((this.state.time/60.0).toFixed(3));
            this.props.setScore(newscore);
            this.props.onClear();
            this.props.onOver();
          }
          this.setState({erasedline:newline,backtoback:newbacktoback,combo:newcombo,lineclearmessage:message,score:newscore});
          let p=0;
          for(let i=0;i<30;i++){
            while(p<30&&bcount[p]===10)p++;
            for(let j=0;j<10;j++){
              newmap[j][i]=((p>=30)?0:newmap[j][p]);
            }
            p++;
          }
          this.setState({map:newmap});
          break;
        }
      }
    }
    let newnow=this.state.block[0];
    for(let i=0;i<4;i++){
      const rx=2+this.dx[newnow][0][i];
      const ry=18+this.dy[newnow][0][i];
      if(this.state.map[rx][ry]!==0){
        this.props.setTime((this.state.time/60.0).toFixed(3));
        this.props.setScore(newscore);
        this.props.setLine(newline);
        this.props.onOver();
      }
    }
    let newblock=this.state.block;
    for(let i=0;i<14;i++)newblock[i]=newblock[i+1];
    if(newblock[7]===0){
      let i=0;
      for(;newblock[i]!==0;i++){}
      let newb=[1,2,3,4,5,6,7];
      for(let j=7;j>0;j--){
        let k=Math.floor(Math.random()*j);
        let tmp=newb[k];
        newb[k]=newb[j-1];
        newb[j-1]=tmp;
        newblock[i]=newb[j-1];
        i++;
      }
    }
    this.setState({now:newnow,block:newblock,x:2,d:0,holded:false,lastmove:'blockfall'});
  }
  eachframe(){
    if(!this._isMounted)return;
    let newtime=this.state.time+1;
    let newdrop=this.state.drop;
    let newstop=this.state.stop;
    let newy=this.state.y;
    if(this.state.time===0)this.popblock();
    if(this.state.now!==0&&this.state.time>0){
      let blocked=false;
      for(let i=0;i<4;i++){
        const rx=this.state.x+this.dx[this.state.now][this.state.d][i];
        const ry=this.state.y+this.dy[this.state.now][this.state.d][i]-1;
        if(ry<0||this.state.map[rx][ry]!==0)blocked=true;
      }
      if(blocked){
        newstop--;
        if(newstop===0){
          newstop=60;
          newdrop=60;
          newy=18;
          this.popblock();
        }
      }
      else{
        newdrop--;
        newstop=60;
        if(newdrop===0){
          newdrop=60;
          newy--;
          this.setState({lastmove:'autodrop'});
        }
      }
    }
    this.setState({time:newtime,drop:newdrop,stop:newstop,y:newy});
  }
  render() {
    //IJLOSTZ
    let ttable=[];
    let ithelement=[];
    const tabledata=[];
    for(let i=0;i<this.state.map.length;i++){
      tabledata.push([]);
      for(let j=0;j<this.state.map[i].length;j++){
        tabledata[i].push(this.state.map[i][j]);
      }
    }
    if(this.state.now!==0){
      let gy=this.state.y;
      for(;;gy--){
        let able=true;
        for(let i=0;i<4;i++){
          const rx=this.state.x+this.dx[this.state.now][this.state.d][i];
          const ry=gy+this.dy[this.state.now][this.state.d][i];
          if(rx<0||rx>=10||ry<0||ry>=30||this.state.map[rx][ry]!==0)able=false;
        }
        if(!able){
          gy++;
          break;
        }
      }
      for(let i=0;i<4;i++){
        const rx=this.state.x+this.dx[this.state.now][this.state.d][i];
        const ry=gy+this.dy[this.state.now][this.state.d][i];
        if(rx>=0&&ry>=0&&rx<10&&ry<30)tabledata[rx][ry]=this.state.now+7;
      }
      for(let i=0;i<4;i++){
        const rx=this.state.x+this.dx[this.state.now][this.state.d][i];
        const ry=this.state.y+this.dy[this.state.now][this.state.d][i];
        if(rx>=0&&ry>=0&&rx<10&&ry<30)tabledata[rx][ry]=this.state.now;
      }
    }
    for(let i=0;i<22;i++){
      ithelement=[];
      for(let j=0;j<10;j++){
        ithelement.push(<td key={i+'row-'+j+'col'} style={{backgroundColor:this.color[tabledata[j][21-i]]}}></td>);
      }
      ttable.push(<tr key={i+'row'}>{ithelement}</tr>);
    }
    const tmap=(<table><tbody>{ttable}</tbody></table>);
    let htable=[];
    const holddata=[];
    for(let i=0;i<5;i++){
      holddata.push([0,0,0,0,0]);
    }
    if(this.state.hold!==0){
      for(let i=0;i<4;i++){
        const rx=this.dx[this.state.hold][0][i];
        const ry=this.dy[this.state.hold][0][i];
        holddata[rx][ry]=this.state.hold;
      }
    }
    for(let i=0;i<5;i++){
      ithelement=[];
      for(let j=0;j<5;j++){
        ithelement.push(<td key={i+'row-'+j+'col-hold'} style={{backgroundColor:this.color[holddata[j][4-i]]}}></td>);
      }
      htable.push(<tr key={i+'row-hold'}>{ithelement}</tr>);
    }
    const hmap=(<table><tbody>{htable}</tbody></table>);
    let ntable=[];
    const nextdata=[];
    for(let i=0;i<5;i++){
      nextdata.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    }
    for(let j=0;j<5;j++){
      if(this.state.block[j]!==0){
        for(let i=0;i<4;i++){
          const rx=this.dx[this.state.block[j]][0][i];
          const ry=this.dy[this.state.block[j]][0][i];
          nextdata[rx][ry+20-5*j]=this.state.block[j];
        }
      }
    }
    for(let i=0;i<25;i++){
      ithelement=[];
      for(let j=0;j<5;j++){
        ithelement.push(<td key={i+'row-'+j+'col-next'} style={{backgroundColor:this.color[nextdata[j][24-i]]}}></td>);
      }
      ntable.push(<tr key={i+'row-next'}>{ithelement}</tr>);
    }
    const nmap=(<table><tbody>{ntable}</tbody></table>);
    return (
      <div className="Tetris">
        <div className="Tetris-inner" style={{height:'480px',width:'100%',display: 'flex',flexDirection:'row'}}>
          <div className="Tetris-hold" style={{height:'480px',width:'120px'}}>
            {hmap}
            <br/>
            {'TIME: '+(this.state.time/60.0).toFixed(3)}
            <br/>
            {(this.props.type==='sprint'?('LINE LEFT: '+(40-this.state.erasedline)):('LINE: '+this.state.erasedline))}
            <br/>
            {'SCORE: '+this.state.score}
            <br/>
            {this.state.lineclearmessage}
          </div>
          <div className="Tetris-tetris" style={{height:'480px',width:'240px',justifyContent:'center',flexDirection:'row'}}>
            {tmap}
          </div>
          <div className="Tetris-next" style={{height:'480px',width:'240px',justifyContent:'flex-start',flexDirection:'row'}}>
            {nmap}
          </div>
        </div>
        <br/>
        <button onClick={this.props.onClose}>BACK</button>
      </div>
    );
  }
}

export default Tetris;