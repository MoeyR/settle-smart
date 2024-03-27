import { useParams } from 'react-router';
import './PostDetails.scss';
import { useEffect, useState } from 'react';
import { apiClient } from '../../utils/settle-smart-api';

function PostDetails(){
    const params = useParams();
    const [postDetails, setPostDetails] = useState(null);
    const [comments, setComments] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(()=>{
        const fetchPostDetails = async () => {
            try {
                const postResponse = await apiClient.getPostDetails(params.postId);
                const commentResponse = await apiClient.getComments(params.postId);
                setDataLoading(false);
                setPostDetails(postResponse);
                setComments(commentResponse);
            } catch (error) {
                setDataLoading(false);
                setHasError(true);
            }
        }

        fetchPostDetails();
    }, [params.postId])

    console.log(comments);

    if (hasError) {
        return (
          <p>Unable to access post details right now. Please try again later.</p>
        );
      }
    
      if (dataLoading) {
        return <p>Loading post details...</p>;
      }

    return(
        <section className='post-details'>
            <img className='post-details__image' src={postDetails.post_image} alt={postDetails.post_title} />
            <section className='title-content-wrap'>
                <h2 className='post-details__title'>{postDetails.post_title}</h2>
                <p className='post-details__content'>{postDetails.post_content}</p>
            </section>
            {/* Comments Section */}
            <section className='comments-section'>
                <h3 className='comment-number'>{comments.length} Comments</h3>
                <ul>
                    {comments.map((comment)=>{
                        return (<li>
                            <p>{comment.user_name}</p>
                            <p>{comment.comment}</p>
                            <p>{comment.comment_likes}</p>
                            </li>)
                    })}
                </ul>
            </section>
            
        </section>
    );
}

export default PostDetails;