import React from "react";
import axios from "axios";
import Header from "../Header/Header"
class ProfilePage extends React.Component{


    state = {
       name:"",
       username:"",
       password:"",
      };

      
    componentDidMount(){
        // make get request to get user info and update
        // get id from local sotrage
       // let id = this.props.match.params.id
            axios.update("/userUpdate/" )
            .then((data)=>{
                this.setState({
                    name:data.name,
                    username:data.username,
                    password:data.password,
                
                });
            });
    };

    handleNameInputChange = (event) =>{
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
      event.preventDefault()
        var data={
          name:this.state.name,
          username:this.state.username,
          password:this.state.password,
        };
        axios({
            method:"PUT",
            url:"/update/:id",
            data:data
        }).then((res)=>{
        }).catch((error)=>{
        });
    };



    render(){
        return(
            <div id="SignUpForm" className="row">
   
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input onChange={this.handleNameInputChange} placeholder="Username" id="name" value={this.state.name} type="text" className="validate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input onChange={this.handleUserNameInputChange} placeholder="Email" id="username" value={this.state.username} type="text" className="validate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input onChange={this.handlePasswordInputChange} placeholder="First Name" id="password" value={this.state.password} type="text" className="validate" />
                        </div>
                        <div className="input-field col s6">
                        </div>
                    </div>
                    <form id="uploadImg" action="/api/upload" method="post" enctype="multipart/form-data">
                        <p id="UploadText">Upload Your Image</p>
                        <input type="file" name="uploadFile" />
                        <input className="btn btn-success" type="submit" value="Submit!" />
                        <input id="hiddenInput" type="hidden" value="32" name="userId" />
                    </form>
                </form>
            </div>
        )
    };
};

export default ProfilePage;

