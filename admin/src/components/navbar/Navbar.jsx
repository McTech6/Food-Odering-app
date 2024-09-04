 import './navbar.css'
import {assets} from '../../assets/admin_assets/assets.js'
const Navbar = () => {
  return <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <img className='profine' src={assets.profile_image} alt="" />
  </div>;
};

export default Navbar;
