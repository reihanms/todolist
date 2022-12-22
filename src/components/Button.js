import React from "react";
import "../styles/Button.css";
import PropTypes from "prop-types";

const Button = ({load, variant,text,action}) => { // parameter adalah props
    return(
        <div>
            <button className={`btn btn-${variant}`} onClick={action}>
                {load ? "Loading...." : text}
            </button>
        </div>
    )
}
// prop types
Button.propTypes = {
    text : PropTypes.string.isRequired,
    variant : PropTypes.string.isRequired,
    action : PropTypes.func
}
export default Button;