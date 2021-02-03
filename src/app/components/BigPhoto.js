import React from 'react';
import PhotoStatiscs from './PhotoStatistics';
import {Link} from 'react-router-dom';
import ButtonLike from './ButtonLike'
import ButtonAuth from './ButtonAuth';

const BigPhoto = ({
                      id,
                      toggleLikePhoto,
                      photo,
                      authorized,
                      createActionToggleAuthorization,
                      createActionFromUrl
                  }) => {

    // try {
        const liked = photo?.liked_by_user
        const {description, urls: {regular: url}} = photo
        const handleClickButton = () => {
            toggleLikePhoto(id)
        }
        return (
            <div>
                <h2>Большая фоточка</h2>

                <ButtonAuth id={id} authorized={authorized}
                            createActionToggleAuthorization={createActionToggleAuthorization}
                            createActionFromUrl={createActionFromUrl}/>

                <PhotoStatiscs photo={photo}/>
                <div>
                    <img src={url} alt={description}></img>
                    <br/>
                    {authorized ? (
                        <ButtonLike liked={liked} handleClickButton={handleClickButton}/>) : null}
                </div>
                <Link to='/feed'> Назад </Link>
            </div>
        );
    // } catch (e) {
    //     return (
    //         <div>
    //             Фотография не найдена
    //             <br />
    //             <Link to='/feed'> Назад к ленте </Link>
    //         </div>
    //     )
    //
    // }
};


export default BigPhoto;
