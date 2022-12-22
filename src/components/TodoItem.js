import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import SkeletonLoading from "./SkeletonLoading";

const Todoitem = ({ loading, todo, del, open, opendelete }) => {
    // function delete task by id
    
    return(
        <>
        {loading ? (<SkeletonLoading />) : (
            <div style={todoItem}>
                <p>{todo.title}</p>
                <div style={button}>
                    <Button 
                        text="edit" 
                        variant="success"
                        action={() => open(todo.id,todo.title)}
                        />
                    <Button 
                        text="delete" 
                        variant="warning"
                        action = {() => opendelete(todo.id,todo.title)}/>
                </div>
            </div>
        )}  
        </>
    )
}

export default Todoitem;


// prop types
Todoitem.propTypes = {
    todo : PropTypes.object.isRequired,
    del : PropTypes.func.isRequired
}

// inline style
const todoItem = {
    background : "#2da4f8",
    color : "white",
    display : "flex",
    alignItems : "center",
    height : "3rem",
    padding : "0 1rem",
    justifyContent : "space-between",
    margin : "0.5rem 0"
}
const button = {
    display : "flex"
}