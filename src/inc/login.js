import axios from 'axios';
import React, {Component } from 'react';
import Button from '@material-ui/core/Button';

import {Link} from 'react-router-dom';



class Login extends Component{


    constructor(props) {
        super(props)

        this.state = {
            id : "",
            pw : "",
          }
    }



    doLogin = async(e) => {
        console.log('로그인하러 간다')

        const {id} = this.state;
        const {pw} = this.state;

        e.preventDefault();

        // localStorage.setItem(
        //     "userInfo",
        //     JSON.stringify({
        //       id: id,
        //     })
        // );
    
        const res = await axios('/login',{
          method : 'POST',
          data : {'id' : id , 'pw' : pw } ,
          headers: new Headers() 
        }) 
        
        console.log(res.data);
    

    }


    // INPUT 글쓰기
    handleChange = (e) => {
        console.log("NAME : "+e.target.name)
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render(){

        return(
            <>
            <form>
                ID <input type="text" name="id" onChange={this.handleChange} /> <br />
                PW <input type="password" name="pw" onChange={this.handleChange}/> 
            </form>
            <Button onClick={this.doLogin} variant="contained">로그인</Button>
            </>

        )
    }

}

export default Login;