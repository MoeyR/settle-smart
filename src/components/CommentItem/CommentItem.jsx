import './CommentItem.scss';
import whiteHeart from '../../assets/icons/heart-white.svg';
import redHeart from '../../assets/icons/heart-red.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import { useState } from 'react';

function CommentItem({comment, showCommentsAfterDelete}){
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

    const handleDeleteClick = ()=>{
        showCommentsAfterDelete(comment.id);
    }

    console.log(comment.user_icon)
    return(
        <li className='comment'>
            <section className='user-icons-comment-wrap'>
                <img className='user-icon' src={comment.user_icon} alt='user-icon'/>
                <section className='username-comment-wrap'>
                    <h4 className='user-name'>{comment.user_name}</h4>
                    <p className='comment__details'>{comment.comment}</p>
                </section>
            </section>
            <section className='delete-like-icons-wrap'>
                {comment.user_id === 20 && <img className='delete-icon' src={deleteIcon} alt='delete-icon' onClick={handleDeleteClick}/>}
                <div className='likes'>
                    <img className='likes__icon' src={liked ? redHeart : whiteHeart} alt="heart-icon" onClick={handleLikeClick}/>
                    <p className='likes__number'>{likesCount}</p>
                </div>
            </section>
            
        </li>
    );
}

export default CommentItem;