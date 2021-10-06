import React from "react";
import './button.scss';


const Button = (props) => (
    <button className="super-button" onClick={props.onClick}>
      {props.label}
    </button>
  );
  
  export default Button;