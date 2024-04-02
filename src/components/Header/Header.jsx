import "./Header.scss";
import { Link } from "react-router-dom";
import settleSmartLogo from "../../assets/logo/logo.png";
import addIcon from "../../assets/icons/add.svg";

function Header() {
  return (
    <header className="header">
      <section className="logo-icon-wrap">
        <Link to="/">
          <img
            className="header__logo"
            src={settleSmartLogo}
            alt="settle-smart-logo"
          />
        </Link>
        <section className="icons-wrap">
          <Link to="/users/20/posts">
            <div className="header__user-icon"></div>
          </Link>
          <Link className="header__add-link" to="/posts/add">
            <img className="header__add-icon" src={addIcon} alt="add-icon" />
          </Link>
        </section>
      </section>
    </header>
  );
}

export default Header;
