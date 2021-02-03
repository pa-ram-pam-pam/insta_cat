import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

const ButtonAuth = ({authorized, createActionToggleAuthorization, id, createActionFromUrl}) => {
    const [redirect, setRedirect] = useState()
    const onClickAuthHandler = () => {
        if (authorized) {
            createActionToggleAuthorization()
        } else {
            createActionFromUrl(id)
            setRedirect(true)
        }
    }
    if (redirect) {
        return (
            <Redirect to={`/preauth`}/>
        );}

    if (authorized) return (
        <button onClick={onClickAuthHandler}>Выйти</button>
    )
    else {
        return (<button onClick={onClickAuthHandler}>Авторизоваться</button>)
    }
}

export default ButtonAuth