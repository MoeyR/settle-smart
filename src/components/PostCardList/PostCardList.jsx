import "./PostCardList.scss";
import { useState, useEffect } from "react";
import { apiClient } from "../../utils/settle-smart-api";
import PostCard from "../PostCard/PostCard";

function PostCardList() {
  const [posts, setPosts] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
    <ul className="posts-list">
        {posts.map((post)=>{
            return <PostCard key={post.id} post={post} />;
        })}
    </ul>
  );
}

export default PostCardList;
