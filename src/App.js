import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      home : '',
      list : [],
      update : false,
    }
  }

  componentDidMount(){
    this._getData();
  }

  _getData = async() => {
    const res = await axios.get('/get/data');

    if(res.data[0] === undefined){
      let cover = [];
      cover.push(res.data);

      return this.setState({ list : cover})
    }  

    this.setState({list : res.data});
  
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

  _delete = async (el) => {
    const remove = window.confirm(el.test_col + '을 삭제 합니까?');

    if(remove){
      const body = { num : el.num }
      const res  = await axios('/delete/data',{
        method : 'POST',
        data : { 'delete' : body },
        headers: new Headers()
      })

      if(res.data) {
        alert('데이터를 삭제했습니다.')
        return window.location.reload();
      }
    }
  
  }

  _nmaeUpdate(e){
    this.setState({name : e.target.value})
  }


  render() {
    
    const { list } = this.state;
    
    return(
      <div className='App'>
        <h3> Welcome to <u>kpg</u> Blog !</h3>
        <h5> https://test.blog.me </h5>

        <br />
        <form method="POST" onSubmit={this._addData}>
          <input type="text" maxLength='10' onChange={(e) => this._nmaeUpdate(e)} />
          <input type="submit" value='Add' />
        </form>

        <br /> <br />

          <div style={{overflow : 'auto' }}>
            <h4 style={{color : '#ababab'}}>Test List</h4>

              <div style={{ border : 'solid 1px black', width : '50%' , marginLeft : '25%' , textAlign : 'left' }}>
                <div style={{display : 'grid', gridTemplateColumns : '32% 35% 30%', textAlign : 'center'}}>
                  <div> Number </div>
                  <div> Name </div>
                  <div> Other </div>
                </div>
              </div>

              { list.length !== 0
                ? list.map((el,key) => { 
                  return(
                    <div key={key} style={{ display : 'grid', lineHeight: '40px', gridTemplateColumns : '32% 35% 20% 0%', width : '50%', marginLeft : '25%' }}>
                      <div> {el.num}</div>
                      <div> {el.test_col}</div>
                      <div
                      style={{color : '#ababab'}}
                      onClick={() => this._modify(el)}> modify </div>
                      <div
                      style={{ color : '#ababab' }} 
                      onClick={() => this._delete(el)}> Delete </div>
                    </div>
                  )
                }) 
              
                : null}

          </div>

      </div>
    )
  }
}

export default App;
