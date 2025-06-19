import React from 'react'
import "./Die.css";
export const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "green" : "white"
    }
  return (
    <button style={styles} onClick={props.hold}>
    {props.value}
    </button>
  )
}
