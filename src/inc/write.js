import React, {Component } from 'react'; 

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import fileDownload from 'file-saver';


class Write extends Component{

    constructor(props){
        super(props);
        this.state = {
          selectedFile: {},
          num: '',
          test_col: '',
          title: '',
          author: '',
          content: '',
          files: [],
        }
      }

    
    //num 값 있으면 수정해야하므로 데이턱 가져오기
    componentDidMount(){
        if(this.props.match.params.num !== undefined){
            this._getInfo2();
        }
    }

    _getInfo2 = async() => {
        
        

        const res = await axios.post('/get/info',{
            'num': this.props.match.params.num,
        });

        //ㅁㅇㅎ~ ㄱㅁㅋㅅㄴㅅㄷㄴㄱㅈ
        console.log(res.data)
        if(res.data[0] === undefined){

            //값 배정
            this.setState({
                num : res.data.num,
                title : res.data.title,
                author : res.data.author,
                content : res.data.content
            })

            //파일 가져오기
            const res_file = await axios.post('/get/file',{
                'num': res.data.num,
            });

            this.setState({files : res_file.data});

            console.log(this.state.files)
            
        }  
    
    }

    // INPUT 글쓰기
    handleChange = (e) => {
        console.log("NAME : "+e.target.name)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    // 파일 선택시 담기
    handleFileInput(e){
        console.log(e.target.files[0])
        
        //fileDownload.saveAs(e.target.files[0], "test.txt");

        this.setState({
          selectedFile : e.target.files,
        })

    }


    //INSERT 작업 처리
    _addData = async() => {
        
        const { selectedFile } = this.state;

        const f = document.form;

        const formData = new FormData();
        formData.append('test_col', this.state.test_col);
        formData.append('title', this.state.title);
        formData.append('author', this.state.author);
        formData.append('content', this.state.content);
        formData.append('num', this.state.num);
        
        
        //파일 개수에따라 다중 업로드
        for (let i = 0 ; i < selectedFile.length ; i++) {
            formData.append('files', selectedFile[i]);
        } 
            

        //cnst {name} = this.state; 
        //e.preveontDefault();
        
        console.log(this.state.selectedFile)
        const res = await axios('/add/data',{
          method : 'POST',
          data : formData ,
          headers: {
            //"content-type": "multipart/form-data"
            
          } 
        })
    
        console.log(res.data.success)
        if(res.data.success === 1){
          alert('데이터를 추가했습니다.');
          return window.location.reload();
        }else{
          alert('데이터를 수정했습니다.');
          return window.location.reload();
        }   
      }




      filedown = async (file_name,file_path) => {
        
        

        // 나중에 이미지 경로랑 원본 이름도 받아서 넣어야함
 
        
        // fetch 로 이미지 경로 요청 보내서 받아옴

        console.log("file_name : " + file_name);
        const res = await fetch(file_path);
        // 받아온 경로 값 blob 으로 변환
        const blob = await res.blob();

        
        // blob 된거 변환
        fileDownload.saveAs(blob, file_name);
        
        
      }

      filedelete = async (file_num) => {
        //파일 삭제

        const remove = window.confirm('정말로 삭제 하시겠습니까?');

        if(remove){

            const res = await axios.post('/delete/file',{
                'num': file_num,
            });
        
            //ㅁㅇㅎ~ ㄱㅁㅋㅅㄴㅅㄷㄴㄱㅈ
            alert('삭제 되었습니다.')
            return window.location.reload();
            
                

        }
        
        


      }

    render(){
        return(
            <div>
                <form id="form" name="form"  /*action='/add/data' method="POST"  enctype="multipart/form-data" */ >
                <Table aria-label="simple table" >
                    <colgroup>
                        <col width="20%" /> 
                        <col width="70%" /> 
                    </colgroup>
                    <TableBody>
                        <TableRow>
                            <TableCell>TITLE</TableCell>
                            <TableCell><TextField  name="title" variant="outlined" value={this.state.title} onChange={this.handleChange} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>AUTHOR</TableCell>
                            <TableCell><TextField  name="author" variant="outlined" value={this.state.author} onChange={this.handleChange} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>CONTENT</TableCell>
                            <TableCell>
                            <TextField
                                id="outlined-multiline-static" 
                                label="Multiline"
                                name="content"
                                multiline
                                rows={10}
                                variant="outlined"
                                value={this.state.content}
                                onChange={this.handleChange}
                            />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>FILE(available multiple)</TableCell>
                            <TableCell>
                                <input type='file' id="files" name="files" multiple onChange={e => this.handleFileInput(e)}/>
                                { this.state.files.length !== 0 ? this.state.files.map( (row) => (
                                    <>
                                    <div>
                                        <a href="#" onClick={() => this.filedown(row.file_nm,row.file_location)}>{row.file_nm}</a> {"   "}
                                        <button type="button" onClick={() => this.filedelete(row.num)}>파일 삭제</button>
                                    </div>
                                    </>
                                )) : null} 
                            </TableCell>
                        </TableRow>
                        {/* 
                        <TableRow>
                            <TableCell>FILE2</TableCell>
                            <TableCell><input type='file' id="file" name="file" onChange={e => this.handleFileInput(e)} /></TableCell>
                        </TableRow> */} 
                    </TableBody> 
                </Table>

                
                <button type="button" value='Add' onClick={this._addData} >Add</button>
                {/* <button type="button" onClick={this.filedown}>FileDownTest</button> */}
                </form>
            </div> 

        )
    }
       

}

export default Write;