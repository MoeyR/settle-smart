import CommentItem from '../CommentItem/CommentItem';

function CommentList({comments, showCommentsAfterDelete}){
    //sort comments by created time
    const sortedComments = comments.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    return(
        <ul>
            {sortedComments.map((comment)=>{
                return <CommentItem key={comment.id} comment={comment} showCommentsAfterDelete={showCommentsAfterDelete}/>;
            })}
        </ul>
    );
}

export default CommentList;