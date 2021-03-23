
import axios from 'axios';
import {Link} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import React, {Component } from 'react';

const useStyles = {
    table: {
      minWidth: 650,
    },
};

class List extends Component{

    constructor(props){
        super(props)
        this.state = {
          list : [],
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

      _delete = async (el) => {
        const remove = window.confirm(el.test_col + '을 삭제 합니까??');
    
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

      go_detail = async (el) =>{

        console.log('Detail')
        
      }


    render(){


        const { list } = this.state;
        
        const {classes} = this.props;
        

        return(
        
        <TableContainer component={Paper}>
      
        <Link to='/insert_form' style={{ textDecoration: 'none' }}><Button  variant="contained">등록</Button></Link>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>TITLE</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Date</TableCell>
            </TableRow> 
            </TableHead>
            <TableBody>
            { list.length !== 0 ? list.map((row) => (
            <TableRow key={row.num}>
                <TableCell component="th" scope="row">{row.num}</TableCell>
                <TableCell><Link to={`/detail/${row.num}`} onClick={this.go_detail}>{row.title}</Link></TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell></TableCell>
            </TableRow>
            )): null} 
            </TableBody>
        </Table> 
        </TableContainer> 

        )
    }
}
export default withStyles(useStyles)(List);