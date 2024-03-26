import './Home.scss';
import postImg from '../../assets/images/image0.jpg';
import collectIcon from "../../assets/icons/collect.svg";

function Home(){
    return(
        <main className='posts'>
            <section className="posts-wrap">
                <ul className='posts-list'>
                    <li className='posts-list__item'>
                        <section className="post-card">
                            <img className="post-card__image" src={postImg} alt="img"/>
                            <h3 className="post-card__title">Looking for a WFH partner</h3>
                            <section className="username-collects-wrap">
                                <h4 className="post-card__username">Ava</h4>
                                <div className='collect-icon-number-wrap'>
                                    <img className="post-card__collect-icon" src={collectIcon} alt="collect-icon"/>
                                    <span className="post-card__collect-number">36</span>
                                </div>
                            </section>
                        </section>
                    </li>
                </ul>
            </section>
        </main>
    );
}

export default Home;