import React from 'react';

const ButtonLike = ({liked, handleClickButton}) => {
  if (liked) {
      return (
          <button onClick={handleClickButton}>Убрать лайк</button>
      )
  }
  else {
      return (
      <button onClick={handleClickButton}>Поставить лайк</button>)
  }
}

export default ButtonLike