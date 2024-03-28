import { useState, useRef } from "react";
import "./AddCommentForm.scss";
import userIcon from '../../assets/icons/user-icon.png';
import commentIcon from '../../assets/icons/comment-plus.svg';
import { useParams } from "react-router";
import { apiClient } from "../../utils/settle-smart-api";

function AddCommentForm({showUpdatedComments}) {
    const params = useParams();
  const [userComment, setUserComment] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const inputRef = useRef()

  const handleChangeComment =(event)=>{
    setUserComment(event.target.value);
  };

  const submitComment = async (event)=>{
    event.preventDefault();

    //post new comment
    if(userComment.trim() === ""){
        setInvalidInput(true);
    }else{
        try {
            const newComment = {
                user_id: 20,
                post_id: params.postId,
                comment: userComment,
                comment_likes: 0
            }
            
            await apiClient.postComment(params.id, newComment);
            setSubmitSuccess(true);
            showUpdatedComments();
            setInvalidInput(false);
            //Clear form and userComment state, and message after comment posted
            inputRef.current.value = "";
            setUserComment("");
            setTimeout(() => {
              setSubmitSuccess(false);
            }, 2500);
        } catch (error) {
            setHasError(true);
        }
    }
  };

  

  return (
    <form className="add-comment">
      <img className="add-comment__user-icon" src={userIcon} alt="user-icon" />
      <div className="input-message-wrap">
        <input
            className="default-input add-comment__input"
            ref={inputRef}
            type="text"
            name="comment-input"
            placeholder="Leave a comment..."
            onChange={handleChangeComment}
        />
        {hasError && (
                <div className="error-message">Comment form has errors, please come back later</div>
          )}
          {submitSuccess && (
                <div className="success-message">Successfully posted!</div>
          )}
          {invalidInput && (
                <div className="error-message">Comment is required</div>
          )}
      </div>
      
      <img className="add-comment__icon" src={commentIcon} alt="comment-icon" onClick={submitComment}/>
    </form>
  );
}

export default AddCommentForm;
