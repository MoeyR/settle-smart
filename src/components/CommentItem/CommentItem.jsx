import './CommentItem.scss';
import whiteHeart from '../../assets/icons/heart-white.svg';
import redHeart from '../../assets/icons/heart-red.svg';
import { useState } from 'react';

function CommentItem({comment}){
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

    return(
        <li className='comment'>
            <section className='user-icons-comment-wrap'>
                <div className='user-icon'></div>
                <section className='username-comment-wrap'>
                    <h4 className='user-name'>{comment.user_name}</h4>
                    <p className='comment__details'>{comment.comment}</p>
                </section>
            </section>
            <section className='delete-like-icons-wrap'>
                <div className='likes'>
                    <img className='likes__icon' src={liked ? redHeart : whiteHeart} alt="heart-icon" onClick={handleLikeClick}/>
                    <p className='likes__number'>{likesCount}</p>
                </div>
            </section>
            
        </li>
    );
}

export default CommentItem;