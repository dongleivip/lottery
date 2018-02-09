import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

var POOL = [
  { dirty: false,  title: "RMB-1" },
  { dirty: false,  title: "RMB-2" },
  { dirty: false, title: "RMB-3" },
  { dirty: false, title: "RMB-4" },
  { dirty: false, title: "RMB-5" },
  { dirty: false, title: "RMB-6" },
];


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


  handleClick = () => {

    var inputValue = this.refs.myInput.value;

    var inputNum = parseInt(inputValue);

    if (isNaN(inputNum) || inputNum < 0) {
      this.setState({
        error: "Invalid Input",
        award: ''
      });
      return;
    } 

    if (inputNum >= POOL.length){
      this.setState({
        error: "Out of Range",
        award: ''
      });
      return; 
    }

    var redeemed = this.state.redeemed;

    const redeem = { inputNum,  }

    if (this.hasBeenRedeemed(inputNum)) {
      this.setState({
        error: inputNum + " has been redeemed",
        award: ''
      });
      return;
    }

    const award = this.getAwardFromPool();

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
            <span>{ this.state.error && '凉凉 :)'}</span>
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
