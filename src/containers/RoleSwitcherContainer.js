import { connect } from 'react-redux';
import { login, createUser } from 'modules/demos';
import RoleSwitcher from 'components/GlobalNav/RoleSwitcher';

const mapActionCreators = {
  login,
  createUser,
};

const mapStateToProps = (state) => ({
  users: state.demoSession.users,
});

export default connect(mapStateToProps, mapActionCreators)(RoleSwitcher);
