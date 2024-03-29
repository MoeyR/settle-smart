import './Home.scss';
import PostCardList from '../../components/PostCardList/PostCardList';
import addIcon from '../../assets/icons/add.svg';
import { Link } from 'react-router-dom';

function Home(){

    return(
        <main className='posts'>
            <nav className='nav'>
               <ul className='nav-list'>
                    <li className='nav-list__item'>
                        <p className='nav-list__item-link nav-list__item-link--active'>Nearby</p>  
                    </li>
                    <li className='nav-list__item'>
                        <p className='nav-list__item-link'>Food</p>
                    </li>
                    <li className='nav-list__item'>
                        <p className='nav-list__item-link'>Travel</p>
                    </li>
                    <li className='nav-list__item'>
                        <p className='nav-list__item-link'>Rental</p>
                    </li>
                </ul>
                <Link className='nav__add-link' to="/posts/add">
                    <img className='nav__add-icon' src={addIcon} alt='add-icon'/>
                </Link>
            </nav>
            <section className="posts-wrap">
                {/* PostCardList component for displaying the list of all posts */}
                <PostCardList />
            </section>
        </main>
    );
}

export default Home;