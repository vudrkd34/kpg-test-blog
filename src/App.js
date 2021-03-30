import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route , Link, Switch} from 'react-router-dom';
import axios from 'axios';

import Home from './inc/home.js';
import Test from './inc/test.js';
import List from './inc/list.js';
import Write from './inc/write.js';
import Detail from './inc/detail.js';
import Update from './inc/update.js';
import Login from './inc/login.js';
import Join from './inc/join.js';
import Button from '@material-ui/core/Button';
import { join } from 'path';

class App extends Component {
  constructor(props){
    super(props)
    console.log('TEST 페이지다')
    this.state = { 
      home : '',
      //list : [],
      update : false,
    } 
  } 

  _addData = async(e) => {
    const {name} = this.state;
    e.preventDefault();

    const res = await axios('/add/data',{
      method : 'POST',
      data : {'data' : name} ,
      headers: new Headers()
    }) 
    


    if(res.data){
      alert('데이터를 추가했습니다.');
      return window.location.reload();
    }
  }

  _modify = async (el) => {
    const modify = prompt(el.test_col + '을 어떤 이름으로 변경할까요?')

    if(modify !== null ){
      console.log("modify? : " + modify)
      console.log("num ? : " + el.num)
      const body = {
        test_col : modify,
        num : el.num
      }
    

    const res = await axios('/modify/data' ,{
      method : 'POST',
      data : { 'modify' : body },
      headers : new Headers()
    })

    if(res.data){
      alert('데이터를 수정했습니다.')
      return window.location.reload();
      }
    }
  } 



  _nmaeUpdate(e){
    this.setState({name : e.target.value})
  }


  render() {

    return(
      <div className='App'>
        <div className="RouterTest">
          
       
          <div id="loginForm" style={{float: "right"}} >
            <Link to='/login_form' style={{ textDecoration: 'none' }}>로그인</Link> {" "}
            <Link to='/join_form' style={{ textDecoration: 'none' }}>회원가입</Link>
          </div>
          <Route path="/" component={Home} exact />
          <Route path="/test/:data" component={Test}   />
          
            <div>
            <Link to='/'>Home</Link> {'\u00A0'} 
            <Link to='/list'>게시판</Link>
            </div>
          
        
        
        </div>

        <br />


        <br /> <br />
          <div className="login_area">
            <Route path="/login_form" component={Login} />
            <Route path="/join_form" component={Join} />

          </div>

          <div className="board_area">
            <Route path="/list" component={List} />
            <Switch>
              <Route path="/insert_form/:num" component={Write} />
              <Route path="/insert_form" component={Write} />
            </Switch>
            <Switch>
              <Route path="/detail/:num" component={Detail} />
              <Route path="/detail" component={Detail} />
            </Switch>
            <Switch>
              <Route path="/update/:num" component={Update} />
              <Route path="/update" component={Update} />
            </Switch>
          </div>

      </div>
    )
  }
}

export default App;
