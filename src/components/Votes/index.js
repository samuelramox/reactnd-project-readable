import React from 'react';
import { Button } from 'reactstrap';

const Votes = ({ id, score, handleScore }) => {
  return (
    <div>
      <Button
        color="danger"
        className="py-0 mr-2"
        onClick={() => handleScore(id, 'downVote')}
      >
        -
      </Button>
      <span className="text-secondary">Score: </span>
      <span className="font-weight-bold"> {score} </span>
      <Button
        color="success"
        className="py-0 ml-2"
        onClick={() => handleScore(id, 'upVote')}
      >
        +
      </Button>
    </div>
  );
};

export default Votes;
