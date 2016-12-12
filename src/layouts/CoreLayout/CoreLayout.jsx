import React from 'react';
import GlobalNav from 'components/GlobalNav';
import 'styles/core.scss';

const styles = {
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
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
