import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {
    getAuthorizedReselected, getErrMessageReselected,
    getMapReselected,
} from '../selectors/selectors';
import {
    createActionFromUrl,
    createActionToggleAuthorization,
    toggleLikePhoto,
    loadPhotos, createActionClearError
} from '../actionCreators/actionCreators';
import BigPhoto from '../components/BigPhoto';
import ErrMessage from "../components/ErrorMessage";

const BlockOfBigPhoto = ({
                             photoMap,
                             authorized,
                             createActionToggleAuthorization,
                             createActionFromUrl,
                             loadPhotos,
                             toggleLikePhoto,
                             errMessage,
                             createActionClearError
                         }) => {
    const {id} = useParams()
    useEffect(() => {
        if (photoMap.size === undefined) {
            loadPhotos(id)
        }
    }, [id, loadPhotos, photoMap.size])

    if (photoMap.size === undefined) {
        return (
            <div>
                Грузим...
                {errMessage && <ErrMessage errMessage={errMessage} clearMessage={createActionClearError}/>}
                <br />
                <Link to='/feed'> Назад к ленте </Link>
            </div>
        )
    } else {
        const photo = photoMap.get(id)
        return (<div>
            {errMessage && <ErrMessage errMessage={errMessage} clearMessage={createActionClearError}/>}
            <BigPhoto photo={photo} id={id} authorized={authorized}
                      createActionToggleAuthorization={createActionToggleAuthorization}
                      createActionFromUrl={createActionFromUrl} toggleLikePhoto={toggleLikePhoto}/></div>);
    }
}

const mapStateToProps = (state) => {
    return {
        photoMap: getMapReselected(state),
        authorized: getAuthorizedReselected(state),
        errMessage: getErrMessageReselected(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLikePhoto: (id) => dispatch(toggleLikePhoto(id)),
        createActionToggleAuthorization: () => dispatch(createActionToggleAuthorization()),
        createActionFromUrl: (id) => dispatch(createActionFromUrl(id)),
        loadPhotos: (id) => dispatch(loadPhotos(id)),
        createActionClearError: () => dispatch(createActionClearError()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockOfBigPhoto);

