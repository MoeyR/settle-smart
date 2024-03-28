import './Home.scss';
import PostCardList from '../../components/PostCardList/PostCardList';

function Home(){

    return(
        <main className='posts'>
            <section className="posts-wrap">
                {/* PostCardList component for displaying the list of all posts */}
                <PostCardList />
            </section>
        </main>
    );
}

export default Home;