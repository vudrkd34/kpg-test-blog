import axios from 'axios';
import React, {Component } from 'react';

import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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

      autoEnter(str){

        var re = /\r\n/g    //개행문자를 나타내는 정규표현식
        var eng_word = str;
        return eng_word = eng_word.replace(re, "이이잉");   //개행문자를 _로 치환

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
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableBody>
            { list.length !== 0 ? list.map( (row) => (
            <>
              <TableRow key={row.num}>
                <TableCell>제목</TableCell>
                <TableCell>{row.title}</TableCell>
              </TableRow> 
              <TableRow>
                <TableCell>글쓴이</TableCell>
                <TableCell>{row.author}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>내용</TableCell>
                <TableCell>{this.autoEnter(row.content)}</TableCell>
              </TableRow>
              
            </>
            )) : null} 
            </TableBody>
            </Table>
            <Link to={`/insert_form/${this.props.match.params.num}`} ><button type='button'>수정</button></Link>
            <button type='button' onClick={this.goBack}>뒤로가기</button>
            </TableContainer>
            </>

        )
    }

}

export default Detail;