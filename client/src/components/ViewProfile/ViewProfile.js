import React from "react";
import axios from "axios";
import "./ViewProfile.css";
class ViewProfile extends React.Component{
 
 state ={

 }

    componentDidMount(){
        let id = this.props.match.params.id
        axios.get("/api/userEvents/" + id)
        .then((response)=>{
            console.log(response);
            this.setState({

            });
        });
    };

   render(){
        return(
            <div className="col s12 m12 l12" id="container">
             
             
            </div>
        )
    }

};

export default ViewProfile;