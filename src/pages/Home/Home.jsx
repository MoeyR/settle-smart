import './Home.scss';
import PostCardList from '../../components/PostCardList/PostCardList';

function Home(){

    return(
        <main className='posts'>
            <section className="posts-wrap">
                <PostCardList />
            </section>
        </main>
    );
}

export default Home;