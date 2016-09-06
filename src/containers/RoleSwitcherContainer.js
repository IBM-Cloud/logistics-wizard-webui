import { connect } from 'react-redux';
import { switchUser, createUser } from 'modules/demos';
import RoleSwitcher from 'components/GlobalNav/RoleSwitcher';

const mapActionCreators = {
  switchUser,
  createUser,
};

const mapStateToProps = (state) => ({
  users: state.demoSession.users,
});

export default connect(mapStateToProps, mapActionCreators)(RoleSwitcher);
