import React from 'react';

const Comments = ({ data, isLoading }) => {
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <h1>Comments</h1>
      {data.map(comment => <p key={comment.id}>{comment.body}</p>)}
    </div>
  );
};

export default Comments;
