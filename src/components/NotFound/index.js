import React from 'react';
import { HashLoader, SyncLoader } from 'react-spinners';

export const Error = () => {
  return (
    <div className="d-flex flex-column align-items-center text-secondary">
      <h1 className="my-5">Error fetching data</h1>
      <HashLoader color="#F8344C" />
    </div>
  );
};

export const Loading = () => {
  return (
    <div className="d-flex flex-column align-items-center text-secondary">
      <h1 className="my-5">Loading...</h1>
      <SyncLoader color="#F8344C" />
    </div>
  );
};

export const PageNotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center text-secondary">
      <h1 className="my-5">Page not found!</h1>
      <HashLoader color="#F8344C" />
    </div>
  );
};
