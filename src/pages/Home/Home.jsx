import "./Home.scss";
import PostCardList from "../../components/PostCardList/PostCardList";
import addIcon from "../../assets/icons/add.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiClient } from "../../utils/settle-smart-api";

function Home() {
  
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleChangeSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter(post=>{
    return post.post_title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  });

  const fetchPosts = async () => {
    try {
      const postResponse = await apiClient.getPosts();
      setDataLoading(false);
      setPosts(postResponse);
    } catch (error) {
      setDataLoading(false);
      setHasError(true);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  if (hasError) {
    return <p>Unable to access posts right now. Please try again later.</p>;
  }

  if (dataLoading) {
    return <p>Loading posts...</p>;
  }

  return (
    <main className="posts">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-list__item">
            <p className="nav-list__item-link nav-list__item-link--active">
              Nearby
            </p>
          </li>
          <li className="nav-list__item">
            <p className="nav-list__item-link">Food</p>
          </li>
          <li className="nav-list__item">
            <p className="nav-list__item-link">Travel</p>
          </li>
          <li className="nav-list__item">
            <p className="nav-list__item-link">Rental</p>
          </li>
          <li>
            <form>
              <input
                className="nav-list__search-bar"
                placeholder="Search..."
                type="text"
                value={searchQuery}
                onChange={handleChangeSearch}
              />
            </form>
          </li>
        </ul>
        <Link className="nav__add-link" to="/posts/add">
          <img className="nav__add-icon" src={addIcon} alt="add-icon" />
        </Link>
      </nav>
      <section className="posts-wrap">
        {/* PostCardList component for displaying the list of all posts */}
        <PostCardList filteredPosts={filteredPosts} />
      </section>
    </main>
  );
}

export default Home;
