import React from "react";
import Button from "./Button";
import "../styles/FormInput.css";
import axios from "axios";

const baseUrl = "https://express-postgress-server-production.up.railway.app/api/v1"

class FormInput extends React.Component {
    // state handle input user
    state = {
        text : ""
    }

    // function add task
    change = e => {
        this.setState({text : e.target.value})
    }
    submit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        if(this.state.text !== ""){
            const newTodo = {
                title : this.state.text
            }
            const res = await fetch(`${baseUrl}/todos`, {
                method : "POST",
                headers : {
                    "Authorization" : token
                 },
                 body : newTodo
                })
                const data = await res.json()
            
            // this.props.add(this.state.text);
        }
        this.setState({
            text : ""
        })
    }
    render(){
        return(
            <form style={inputForm} onSubmit={this.submit}>
                <input type="text"
                    style={input} 
                    placeholder="add new task"
                    value={this.state.text}
                    onChange={this.change}/>
                <Button text="add" variant="primary" action={this.submit}/>
            </form>
        )
    }
}

export default FormInput;

// inline css
const inputForm = {
    background : "#fff",
    color : "white",
    display : "flex",
    alignItems : "center",
    height : "3rem",
    padding : "0 1rem",
    justifyContent : "space-between",
    margin : "0.5rem 0"
}

const input = {
    width : "70%",
    border : "none",
}