import React, {useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import {
    loadPhotos,
    createActionShowMeBigPhoto,
    createActionToggleAuthorization,
    createActionFromUrl, createActionClearError
} from '../actionCreators/actionCreators';
import {
    getPageYReselected,
    getMapReselected,
    getAuthorizedReselected, getErrMessageReselected,
} from '../selectors/selectors';
import SmallPhoto from '../components/SmallPhoto';
import ButtonAuth from '../components/ButtonAuth';
import ErrMessage from "../components/ErrorMessage";

const BlockOfSmallPhotos = ({
                                loadPhotos,
                                createActionShowMeBigPhoto,
                                pageY,
                                photoMap,
                                authorized,
                                createActionToggleAuthorization,
                                errMessage,
                                createActionClearError
                            }) => {
    const handleScroll = useCallback((ev) => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        ) {
            return;
        }
        ev.preventDefault();
        loadPhotos();
    }, [loadPhotos]);

    useEffect(() => {
        window.scrollTo(0, pageY);
    }, [pageY]);

    useEffect(() => {
        window.addEventListener(`scroll`, handleScroll);
        return () => window.removeEventListener(`scroll`, handleScroll);
    }, [handleScroll]);


    const onClickHandler = (ev) => {
        ev.preventDefault();
        ev.target.blur();
        loadPhotos();
    };
    if (photoMap?.size === undefined) {
        loadPhotos()
        return (
            <div>
                Грузим...
                {errMessage && <ErrMessage errMessage={errMessage} clearMessage={createActionClearError}/>}
            </div>
        )
    } else {
        let content = []
        for (let value of photoMap.values()) {
            content.push(<SmallPhoto key={value.id} photo={value} selectPhoto={createActionShowMeBigPhoto}/>);
        }

        return (
            <div onScroll={loadPhotos}>
                {errMessage&&<ErrMessage errMessage={errMessage} clearMessage={createActionClearError}/>}
                <ButtonAuth authorized={authorized} createActionToggleAuthorization={createActionToggleAuthorization}
                            createActionFromUrl={createActionFromUrl}/>
                {content}
                <br/>
                <button onClick={onClickHandler}>Загрузить еще фоточек</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pageY: getPageYReselected(state),
        photoMap: getMapReselected(state),
        authorized: getAuthorizedReselected(state),
        errMessage: getErrMessageReselected(state),
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadPhotos: () => dispatch(loadPhotos()),
        createActionShowMeBigPhoto: (pageY) => dispatch(createActionShowMeBigPhoto(pageY)),
        createActionToggleAuthorization: () => dispatch(createActionToggleAuthorization()),
        createActionFromUrl: (id) => dispatch(createActionFromUrl(id)),
        createActionClearError: () => dispatch(createActionClearError()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockOfSmallPhotos);
