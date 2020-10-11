import React from 'react';

export default ({ description, children }) => (
  <div className="border-bottom mb-2">
    <div className="mb-2 ">{description}</div>
    <div className="ml-4">
      {children}
    </div>
  </div>
);
