import React from 'react';
import GlobalNav from 'components/GlobalNav';
import 'styles/core.scss';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
};

export const CoreLayout = ({ children }) => (
  <div style={styles.wrapper}>
    <GlobalNav />
    <div style={styles.content}>
      {children}
    </div>
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default CoreLayout;
