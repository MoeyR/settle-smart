import './Header.scss';
import { Link } from 'react-router-dom';
import settleSmartLogo from "../../assets/logo/logo.png";


function Header(){
    return(
        <header className='header'>
            <section className='logo-icon-wrap'>
                <Link to="/">
                    <img className='header__logo' src={settleSmartLogo} alt='settle-smart-logo'/>
                </Link>
                <div className='header__user-icon'></div>
            </section>

        </header>
    );
}

export default Header;