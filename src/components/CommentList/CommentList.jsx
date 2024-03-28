import CommentItem from '../CommentItem/CommentItem';
import './CommentList.scss';

function CommentList({comments, showCommentsAfterDelete}){

    return(
        <ul>
            {comments.map((comment)=>{
                return <CommentItem key={comment.id} comment={comment} showCommentsAfterDelete={showCommentsAfterDelete}/>;
            })}
        </ul>
    );
}

export default CommentList;