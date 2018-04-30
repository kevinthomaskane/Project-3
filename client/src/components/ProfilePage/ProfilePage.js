import React from "react";
import axios from "axios";
import Header from "../Header/Header";
import Invitation from "../Invitation";

let id = localStorage.getItem("user_id");
class ProfilePage extends React.Component{


    state = {
       name:"",
       username:"",
       password:"",
      };


    componentDidMount(){
        // make get request to get user info and update
        // get id from local sotrage
      
        axios.get("/api/userEvents/" + id).then((response) => {
            console.log(response);
          
            this.setState({
              name:response.data.name,
              username: response.data.username,
              password: response.data.password,
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
            url:"/update/"+id, data,
            data:data
        }).then((res)=>{
        }).catch((error)=>{
        });
    };



    render(){
        return(
            <div id="SignUpForm" className="row">
<Invitation />
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input onChange={this.handleNameInputChange} placeholder="Name" id="name" value={this.state.name} type="text" className="validate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input onChange={this.handleUserNameInputChange} placeholder="User Name" id="username" value={this.state.username} type="text" className="validate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input onChange={this.handlePasswordInputChange} placeholder="Password" id="password" value={this.state.password} type="text" className="validate" />
                        </div>
                        <div className="input-field col s6">
                        </div>
                    </div>
                    // <form id="uploadImg" action="/api/upload" method="post" enctype="multipart/form-data">
                    //     <p id="UploadText">Upload Your Image</p>
                    //     <input type="file" name="uploadFile" />
                    //     <input className="btn btn-success" type="submit" value="Submit!" />
                    //     <input id="hiddenInput" type="hidden" value="32" name="userId" />
                    // </form>
                </form>
            </div>
        )
    };
};

export default ProfilePage;
