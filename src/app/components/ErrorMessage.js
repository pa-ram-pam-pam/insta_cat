import React from "react";

const ErrMessage = ({errMessage, clearMessage}) => {
    return (
        <div style={{color: `red`}}>
            {errMessage}
            <br />
            <button onClick={clearMessage}>Понятно</button>
        </div>
    )
}

export default ErrMessage