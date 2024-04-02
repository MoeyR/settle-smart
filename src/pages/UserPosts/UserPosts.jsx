import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/settle-smart-api";
import PostCard from "../../components/PostCard/PostCard";

function UserPosts() {
  const params = useParams();
  const [userPosts, setUserPosts] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  //Fetch posts data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postResponse = await apiClient.getUserPosts(params.userId);
        //sort posts by posting time
        const sortedPosts = postResponse.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setDataLoading(false);
        setUserPosts(sortedPosts);
      } catch (error) {
        setDataLoading(false);
        setHasError(true);
      }
    };

    fetchPosts();
  }, [params.userId]);

  if (hasError) {
    return (
      <p>Unable to access post details right now. Please try again later.</p>
    );
  }

  if (dataLoading) {
    return <p>Loading post details...</p>;
  }

  return (
    <ul className="posts-list">
      {userPosts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </ul>
  );
}

export default UserPosts;
