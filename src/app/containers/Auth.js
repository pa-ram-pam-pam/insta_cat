import React, {useEffect, useState} from 'react'
import {unsplash} from '../unsplash'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {createActionToggleAuthorization} from '../actionCreators/actionCreators';

const Auth = ({createActionToggleAuthorization}) => {
    let url
    const [redirect, setRedirect] = useState()
    const fromPhotoId = localStorage.getItem(`fromPhotoId`);
    if (fromPhotoId !== null) {
        url = `/view/` + fromPhotoId

    } else url = `/feed`
    useEffect(() => {
        const code = document.location.search.split(`code=`)[1];
        if (code) unsplash.auth.userAuthentication(code).then(res => res.json()).then(json => {
                createActionToggleAuthorization()
                unsplash.auth.setBearerToken(json.access_token)
                localStorage.setItem(`token`, json.access_token)
                setRedirect(true)
            }
        )
    })
    if (redirect) {
        localStorage.removeItem(`fromPhotoId`)
        return (<Redirect to={url}/>)
    } else return null
};


const mapDispatchToProps = (dispatch) => {
    return {
        createActionToggleAuthorization: () => dispatch(createActionToggleAuthorization()),
    };
};
export default connect(null, mapDispatchToProps)(Auth);
