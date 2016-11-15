import React from 'react';
import GlobalNav from 'components/GlobalNav';
import 'styles/core.scss';

export const CoreLayout = ({ children }) => (
  <div>
    <GlobalNav />
    <div>
      {children}
    </div>
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default CoreLayout;
