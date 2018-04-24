import React from "react";
import "./header.css"
import {Dropdown,Button,NavItem} from "react-materialize"

const Header = props =>{
   
        if (props.profile) {
            return (
                <div>
                    <div class="row header">
                        <div class="col-md-6"></div>
                        <div class="col-md-3">
                            <a id="logo" href="/home">Collab</a>
                        </div>
                        <div id="dropDownMenu">
                            <div class="col-md-2"></div>
                            <Dropdown trigger={

                            <div class="col-md-1"><a id="imageLink" href=""><img id="profilePic" data-toggle="modal" data-target="#imageModal" src="https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png" />
                            </a>  <p>{props.username}</p>  
                            
                           
                            </div>
                        }>
                        <NavItem>Edit profile</NavItem>
                        <NavItem>Log Out</NavItem>
                        <NavItem divider />
                        <NavItem>Info</NavItem>
                        </Dropdown>
                          
                        </div>
                      
                    </div>
               
                    
                     
                </div>
            )
        }
         else if(props.lendingpage){
             return(
                 <div>
                     <div class="row header">
                         <div class="col-md-5"></div>
                         <div class="col-md-2">
                             <a id="logo" href="/home">Collab</a>
                         </div>
                         <div>
                         <div class="col-md-2"></div>
                             <a id="logout" href="/login">log in / </a>
                             <a id="logout" href="/signeup"> sing up</a>
                         </div>
                         <div class="col-md-2"></div>
                     </div>
                     
                 </div>
            )
          }; 
  

     
};
 
export default Header;
 

   