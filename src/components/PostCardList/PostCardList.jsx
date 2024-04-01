import "./PostCardList.scss";
import PostCard from "../PostCard/PostCard";

function PostCardList({postsDisplay}) {
  return (
    <ul className="posts-list">
        {postsDisplay.map((post)=>{
          return <PostCard key={post.id} post={post} />;
      })
      }
    </ul>
  );
}

export default PostCardList;
