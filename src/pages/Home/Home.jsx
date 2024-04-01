import "./Home.scss";
import PostCardList from "../../components/PostCardList/PostCardList";
import { useState, useEffect, useMemo } from "react";
import { apiClient } from "../../utils/settle-smart-api";

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [filterType, setFilterType] = useState("explore"); // Default filter type

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

  // Memoize the filtered posts to avoid unnecessary re-computation on every render.
    // Only recompute when the dependencies (posts, searchQuery, filterType) change.
  const filteredPosts = useMemo(() => {
    let filtered = posts;
    if (searchQuery) {
      filtered = filtered.filter((post) =>
        post.post_title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterType === "nearby") {
      filtered = filtered.filter((post) =>
        post.post_location.toLowerCase().includes("toronto")
      );
    }
    return filtered;
  }, [posts, searchQuery, filterType]);

  const handleChangeSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUpdateFilter = (e) => {
    const btnValue = e.target.value; // nearby / explore
    setFilterType(btnValue);
  };

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
          <li className="nav-list__buttons-wrap">
            <button
              className={`nav-list__button ${
                filterType === "nearby" ? "nav-list__button--active" : ""
              }`}
              value="nearby"
              onClick={handleUpdateFilter}
            >
              Nearby
            </button>
            <button
              className={`nav-list__button ${
                filterType === "explore" ? "nav-list__button--active" : ""
              }`}
              value="explore"
              onClick={handleUpdateFilter}
            >
              Explore
            </button>
          </li>
          <li className="nav-list__search-wrap">
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
      </nav>
      <section className="posts-wrap">
        <PostCardList postsDisplay={filteredPosts} />
      </section>
    </main>
  );
}

export default Home;