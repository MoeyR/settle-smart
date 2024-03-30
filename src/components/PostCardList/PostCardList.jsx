import "./PostCardList.scss";
import PostCard from "../PostCard/PostCard";

function PostCardList({filteredPosts}) {
  return (
    <ul className="posts-list">
        {filteredPosts.map((post)=>{
          return <PostCard key={post.id} post={post} />;
      })
      }
    </ul>
  );
}

export default PostCardList;
