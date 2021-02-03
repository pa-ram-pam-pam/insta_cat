import React from 'react';

const PhotoStatiscs = ({ photo }) => {
  const { user: { name, links: { html: { authorLink } } }, created_at, likes } = photo;

  return (
    <div>
      <div>
        Автор:
        <a href={authorLink}>{name}</a>
      </div>
      <div>Дата: {created_at}</div>
      <div>Лайков: {likes}</div>
    </div>
  );
};

export default PhotoStatiscs;
