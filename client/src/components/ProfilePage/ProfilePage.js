import React from "react";
import axios from "axios";
import Header from "../Header/Header"
class ProfilePage extends React.Component{


    state = {
        Firstname:"",
        LastName:"",
        Password:"",
        UserName:"",
        Email:""
      };

      
    componentDidMount(){
        // make get request to get user info and update
        // get id from local sotrage
       let id = this.props.match.params.id
            axios.update("/userUpdate/"+id)
            .then((data)=>{
                this.setState({
                    Firstname:data.Firstname,
                    LastName:data.LastName,
                    UserName:data.UserName,
                    Email:data.Email
                });
            });
    };

    handleFirstNameInputChange = (event) =>{
      this.setState({
        Firstname:event.target.value
      })
    };

    handleLastNameInputChange = (event) =>{
      this.setState({
        LastName:event.target.value
      })
    };

    handlePasswordInputChange = (event) =>{
      this.setState({
        Password:event.target.value
      })
    };

    handleEmailInputChange = (event) =>{
      this.setState({
        Email:event.target.value
      })
    };

    handleUserNameInputChange = (event) =>{
      this.setState({
        UserName:event.target.value
      })
    }

    handleInputSubmit = (event) =>{
      event.preventDefault()
        var data={
          Firstname:this.state.Firstname,
          LastName:this.state.LastName,
          Password:this.state.Password,
          Email:this.state.Email
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
                            <input onChange={this.handleUserNameInputChange} placeholder="Username" id="Username" value={this.state.UserName} type="text" className="validate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input onChange={this.handleEmailInputChange} placeholder="Email" id="email" value={this.state.Email} type="email" className="validate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input onChange={this.handleFirstNameInputChange} placeholder="First Name" id="first_name" value={this.state.Firstname} type="text" className="validate" />
                        </div>
                        <div className="input-field col s6">
                            <input onChange={this.handleLastNameInputChange} placeholder="Last Name" id="last_name" value={this.state.LastName} type="text" className="validate" />
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

