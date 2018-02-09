import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

var POOL = [
  { dirty: false, title: "Game-在Jetstar群里发10元分10个红包吧" },
  { dirty: false, title: "Game-邀请一位异性与你情歌对唱" },
  { dirty: false, title: "Game-模仿脑白金广告，边唱边跳" },
  { dirty: false, title: "Game-背一个异性原地转三圈" },
  { dirty: false, title: "Game-找出现场中你最心动的异性表白一分钟" },
  { dirty: false, title: "Game-邀请一位异性与你情歌对唱" },
  { dirty: false, title: "RMB-现金50元" },
  { dirty: false, title: "RMB-现金20元" },
  { dirty: false, title: "RMB-现金10元" },
  { dirty: false, title: "RMB-现金 5元" },
  { dirty: false, title: "RMB-现金 1元" },
  { dirty: false, title: "RMB-现金 1" },
  { dirty: false, title: "Game-现场猫步走秀" },
  { dirty: false, title: "Game-用屁股写一个单词，观众需要猜出来" },
  { dirty: false, title: "Game-模仿一位自己熟悉的明星" },
];

let luckyPool = [
  { dirty: false, title: "RMB-现金 1元" },
  { dirty: false, title: "RMB-现金 5元" },
  { dirty: false, title: "RMB-现金 1毛" },
];

let acc = 0;
class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      award: "",
      error: "",
      redeemed: [],
      ending: false,
    }

  }

  getAwardFromPool = () => {

    const MAX = POOL.length;

    console.log(MAX);

    var randomIndex = parseInt(Math.random() * MAX);

    console.log('index+', randomIndex);

    var award = this.getFirstUndirtyItem(randomIndex);

    return award;
  }

  getFirstUndirtyItem = (index) => {

     while (POOL[index].dirty) {
       
       index ++;
       index = index % POOL.length;

       if (index > POOL.length){
         break;
       }
    }

    POOL[index].dirty = true;

    return POOL[index].title;
  }

  getLucyDog = () => {
      this.setState({
        award: luckyPool[acc-1].title,
        error: '',
      });

  }

  handleClick = () => {

    var inputValue = this.refs.myInput.value;
    var redeemed = this.state.redeemed;
    var inputNum = parseInt(inputValue);
    var award;

    if (isNaN(inputNum) || inputNum < 0) {
      this.setState({
        error: "Invalid Input",
        award: '(: 一首凉凉送给你 :)'
      });
      return;
    } 

    const MaxCount = POOL.length + luckyPool.length;
    if (inputNum >= MaxCount){
      this.setState({
        error: "Out of Range",
        award: '(: 一首凉凉送给你 :)'
      });
      return; 
    }


    if (this.hasBeenRedeemed(inputNum)) {
      this.setState({
        error: inputNum + " has been redeemed",
        award: '(: 一首凉凉送给你 :)'
      });
      return;
    }

    acc = acc + 1;
    if(acc <= 3) {
      this.getLucyDog(acc);
      award = luckyPool[acc-1].title
    } else {
      award = this.getAwardFromPool();
    }

    redeemed.push({inputNum, award});

    this.setState({
      award: award,
      redeemed: redeemed,
      error: '',
    });

  }

  hasBeenRedeemed = (inputNum) => {

    const redeemed = this.state.redeemed;

    const result = redeemed.some(x => {
      return x.inputNum === inputNum
    });

    return result;
  }

  showRedeemedList = () => {

    const redeemed = this.state.redeemed;

    const list = redeemed.map(x => {
      return <div key={x.inputNum}>#{x.inputNum}# ----- {x.award}</div>
    })

    return list;
  }

  checkEnding = () => {
    const isEnding = POOL.every(x => {
      return x.dirty;
    })

    return isEnding ? 'Game Ends! Thanks Everyone!' : '';
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      //console.log('do validate');
      this.handleClick();
    }
  }


  render() {

    return (
      <div className="App">
        {/*<header className="App-header">*/}
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*</header>*/}
        <div>
        <h1 className="App-title">你的梦想实现了吗</h1>
          <div>
            <label className="lucky-label" htmlFor="txt_input">Sing Out Your Magic Number</label>
          </div>
          
          <div>
            <input className="lucky-input" id="txt_input" type="text" ref="myInput" onKeyPress={this.handleKeyPress} />
          </div>
          <div>
            <button className="lucky-btn" onClick={this.handleClick.bind(this)}>兑奖</button>
          </div>
          {/*<div>{ this.state.error }</div>*/}
        </div>
        <div className="result">
          <div className="lucky-result">
            <span > { this.state.award || '新年快乐' } </span>
          </div>

          <div className="lucky-result__list">
            {this.showRedeemedList()}
          </div>
        </div>


        <div>
          {this.checkEnding()}
        </div>

      </div>
    );
  }
}

export default App;
