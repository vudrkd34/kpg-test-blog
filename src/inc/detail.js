import axios from 'axios';
import React, {Component } from 'react';

import {Link} from 'react-router-dom';
//muyaho!

class Detail extends Component{

    constructor(props) {
        super(props)

        this.state = {
            list : [],
          }
    }

    componentDidMount(){
        this._getInfo2();
      }

      _getInfo2 = async() => {
        const res = await axios.post('/get/info',{
            'num': this.props.match.params.num,
        });
    
        //ㅁㅇㅎ~ ㄱㅁㅋㅅㄴㅅㄷㄴㄱㅈ
        console.log(res.data)
        if(res.data[0] === undefined){
          let cover = [];
          cover.push(res.data);

          console.log(cover)
    
          return this.setState({ list : cover})
        }  
    
        this.setState({list : res.data});

        
      
      }
    
      _getInfo = async() => {
          fetch('/get/info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'num': 'sunghae'
            })
          })
          .then(response => response.json())
          .then((data) => console.log(data.title))
      
      }

      goBack = () => {
        this.props.history.goBack();
      };
    


    render(){
        
        const { list} = this.state;

        return(
            <>
            { list.length !== 0 ? list.map( (row) => (
              <div key={row.num}>
                <div>
                  제목 : {row.title}
                </div>
                <div>
                  글쓴이 : {row.author}
                </div>
                <div>
                  내용 : {row.content}
                </div>

                <Link to={`/insert_form/${row.num}`} ><button type='button'>수정</button></Link>
              </div>
            )) : null} 

            <button type='button' onClick={this.goBack}>뒤로가기</button>
            </>

        )
    }

}

export default Detail;