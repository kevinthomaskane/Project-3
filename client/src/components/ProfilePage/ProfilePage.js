import React from "react";
import axios from "axios";
import Header from "../Header/Header";
import Invitation from "../Invitation";

const id = localStorage.getItem("user_id");

class ProfilePage extends React.Component{


    state = {
       name:"",
       username:"",
       password:"",
       file:""
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
        //     axios.update("/userUpdate/" )
        //     .then((data)=>{
        //         this.setState({
        //             name:data.name,
        //             username:data.username,
        //             password:data.password,

        //         });
        //     });
    };

    handleInput = (event) => {
      console.log(event);
      let name = event.target.name;

      this.setState({[name]: event.target.value})
    }

    handleInputSubmit = (event) =>{
      event.preventDefault();
      console.log(this.state.file);
      const formData = new FormData();
      if(this.state.file !== ""){
        let file = document.getElementById("test").files[0];
        formData.append('file',file);
      }
      formData.append('name', this.state.name);
      formData.append('username', this.state.username);
      formData.append('password', this.state.password);
      axios({
     url: "/update/"+id,
     method: "PUT",
     data: formData,
      headers: {
       'Content-Type': 'multipart/form-data'
     }
    }).then((res)=>{
        }).catch((error)=>{
        });
    };



    render(){
        return(
            <div id="SignUpForm" className="row">
<Invitation />
                <form onSubmit={this.handleInputSubmit} className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input onChange={this.handleInput} placeholder="Name" name="name" value={this.state.name} type="text" className="validate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input onChange={this.handleInput} placeholder="User Name" name="username" value={this.state.username} type="text" className="validate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input onChange={this.handleInput} placeholder="Password" name="password" value={this.state.password} type="text" className="validate" />
                        </div>
                        <div className="input-field col s6">
                        </div>
                    </div>
                    <h1>File Upload</h1>
                    <input id="test" type="file" name="file"
                       onChange={this.handleInput} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        )
    };
};

export default ProfilePage;
