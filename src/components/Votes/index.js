import React from 'react';

const Votes = ({ id, score, handleScore }) => {
  return (
    <div>
      <button onClick={() => handleScore(id, 'downVote')}> - </button>
      <strong>Score</strong> {score}
      <button onClick={() => handleScore(id, 'upVote')}> + </button>
    </div>
  );
};

export default Votes;
