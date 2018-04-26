import React from "react";
import axios from "axios";
import "./SignUp.css";
import {Link} from "react-router-dom"
class SignUp extends React.Component{

    state = {
      name:"",
      username:"",
      password:"",
     
    };

    handleFirstNameInputChange = (event) =>{
      this.setState({
        name:event.target.value
      })
    };
    handleUserNameInputChange = (event) =>{
      this.setState({
        username:event.target.value
      })
    };

    handlePasswordInputChange = (event) =>{
      this.setState({
        password:event.target.value
      })
    };
 
    handleInputSubmit = (event) =>{
        var data={
          name:this.state.name,
          username:this.state.username,
          password:this.state.password,
         
        };
        axios({
            method:"POST",
            url:"/api/newUser",
            data:data
        }).then((res)=>{
        }).catch((error)=>{
        });
    };



    render(){
        return(
          <div id="SignUpForm" class="row">
          <form className="col s12">
 
            <div className="row">
              <div className="input-field col s6">
                <input onChange={this.handleFirstNameInputChange} placeholder="First Name" id="first_name"  value={this.state.name}type="text" className="validate"/>
              </div>
            </div>
            <div className="row">
            <div className="input-field col s6">
                <input onChange={this.handleUserNameInputChange} placeholder="Username" id="Username" value={this.state.username} type="text" className="validate"/>
              </div>
              <div className="input-field col s6">
                <input onChange={this.handlePasswordInputChange} placeholder="Password" id="Password" value={this.state.password} type="password" className="validate"/>
              </div>
            </div>
             <form  id="uploadImg" method="post" enctype="multipart/form-data">
             <p id="UploadText">Upload Your Image</p>
             <input type="file" name="uploadFile"/>
             <input id="hiddenInput" type="hidden" value="32" name="userId"/>
             </form>
             <Link to={"login"}>
             <button onClick={this.handleInputSubmit} className="btn btn-success" type="submit" value="Submit!"></button>
             </Link>
             </form>
          </div>
          
      )

    };
};

export default SignUp;

