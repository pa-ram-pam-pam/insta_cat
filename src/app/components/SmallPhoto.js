import React from 'react'
import { Link } from 'react-router-dom';
import PhotoStatistics from '../components/PhotoStatistics';

const SmallPhoto = ({ photo, selectPhoto }) => {
  const {
    id,
    description,
    urls: { small: url },
  } = photo;

  const handlerOnClick = () => {
    selectPhoto(window.pageYOffset); 
  }
  return (
    <div key={id}>
      <Link
        to={`/view/` + id}
        onClick={handlerOnClick}
      >
        <img src={url} alt={description}/>
      </Link>
      <PhotoStatistics photo={photo} />
    </div>
  )
}

export default SmallPhoto