import "./CommentItem.scss";
import whiteHeart from "../../assets/icons/heart-white.svg";
import redHeart from "../../assets/icons/heart-red.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { useState } from "react";

function CommentItem({ comment, showCommentsAfterDelete }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.comment_likes);

  const handleLikeClick = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
    }
  };

  const handleDeleteClick = () => {
    showCommentsAfterDelete(comment.id);
  };

  return (
    <li className="comment">
      <img className="user-icon" src={comment.user_icon} alt="user-icon" />
      <section className="username-comment-like-wrap">
        <div className="username-date-wrap">
          <h4 className="user-name">{comment.user_name}</h4>
          <p className="date">
            {new Date(comment.created_at).toLocaleDateString()}
          </p>
        </div>
        <section className="comment-like-wrap">
          <p className="comment__details">{comment.comment}</p>
          {/* like icon and delete icon */}
          <section className="delete-like-icons-wrap">
            {comment.user_id === 20 && (
              <img
                className="delete-icon"
                src={deleteIcon}
                alt="delete-icon"
                onClick={handleDeleteClick}
              />
            )}
            <div className="likes">
              <img
                className="likes__icon"
                src={liked ? redHeart : whiteHeart}
                alt="heart-icon"
                onClick={handleLikeClick}
              />
              <p className="likes__number">{likesCount}</p>
            </div>
          </section>
        </section>
      </section>
    </li>
  );
}

export default CommentItem;
