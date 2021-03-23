import axios from 'axios';
import React, {Component } from 'react';

import {Link} from 'react-router-dom';
//muyaho!

class Update extends Component{

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
                  제목 : <input type ="" value={row.title}></input>
                </div>
                <div>
                  글쓴이 : {row.author}
                </div>
                <div>
                  내용 : {row.content}
                </div>

                
              </div>
            )) : null} 

            <button type='button' onClick={this.goBack}>뒤로가기</button>
            </>

        )
    }

}

export default Update;