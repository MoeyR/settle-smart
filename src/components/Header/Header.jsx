import './Header.scss';
import { Link } from 'react-router-dom';
import settleSmartLogo from "../../assets/logo/logo.png";
import addIcon from '../../assets/icons/add.svg';

function Header(){
    return(
        <header className='header'>
            <section className='logo-icon-wrap'>
                <Link to="/">
                    <img className='header__logo' src={settleSmartLogo} alt='settle-smart-logo'/>
                </Link>
                <div className='header__user-icon'></div>
            </section>
            <nav className='header__nav'>
                <ul className='nav-list'>
                    <li className='nav-list__item'>
                        <p className='nav-list__item-link nav-list__item-link--active'>Nearby</p>  
                    </li>
                    <li className='nav-list__item'>
                        <p className='nav-list__item-link'>Followings</p>
                    </li>
                    <li className='nav-list__item'>
                        <p className='nav-list__item-link'>Food</p>
                    </li>
                    <li className='nav-list__item'>
                        <p className='nav-list__item-link'>Word</p>
                    </li>
                </ul>
                <Link className='header__add-link' to="/PostAdd">
                    <img className='header__add-icon' src={addIcon} alt='add-icon'/>
                </Link>
            </nav>
        </header>
    );
}

export default Header;