import { useParams } from 'react-router';
import './PostDetails.scss';
import { useEffect, useState } from 'react';
import { apiClient } from '../../utils/settle-smart-api';
import CommentList from '../../components/CommentList/CommentList';
import AddCommentForm from '../../components/AddCommentForm/AddCommentForm';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import locationIcon from '../../assets/icons/location.svg'

function PostDetails(){
    const params = useParams();
    const [postDetails, setPostDetails] = useState(null);
    const [comments, setComments] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [commentAdded, setCommentAdded] = useState(false);
    const [commentDeleted, setCommentDeleted] = useState(null);
    const [showMap, setShowMap] = useState(false);

    //Fetch post and comments data
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

    //Fetch updated comments when new comment is posted
    useEffect(()=>{
        const fetchUpdatedComments = async ()=>{
            try {
                if(!commentAdded) return;
                const updatedData = await apiClient.getComments(params.postId);
                setComments(updatedData);
            } catch (error) {
                console.log(`fetchComments failed, ${error}`);
            }
        }
        fetchUpdatedComments();
    }, [params.postId, commentAdded]);

    const showUpdatedComments = ()=>{
        setCommentAdded(true);
    }


    //Fetch updated comments after a comment is deleted
    useEffect(()=>{
        const fetchComments = async ()=>{
            try {
                if(!commentDeleted) return;
                await apiClient.deleteComment(params.postId, commentDeleted);
                const updatedData = await apiClient.getComments(params.postId);
                setComments(updatedData);
            } catch (error) {
                console.log(`fetchComments failed, ${error}`);
            }
        }
        fetchComments();
    }, [params.postId, commentDeleted]);

    const showCommentsAfterDelete = (commentId)=>{
        setCommentDeleted(commentId);
    }

    const handleShowMapClick = ()=>{
        if(!showMap){
            setShowMap(true);
        }else{
            setShowMap(false);
        }
    }

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
                <p className='post-details__location' onClick={handleShowMapClick}>
                    <img className='post-details__location-icon' src={locationIcon} alt='location-icon'/>
                    {postDetails.post_location}
                </p>
            </section>
            {/* GoogleMap Section */}
            {showMap && <GoogleMap />}
            {/* Comments Section */}
            <section className='comments-section'>
                <h3 className='comment-number'>{comments.length} Comments</h3>
                {/* AddCommentForm component for adding and posting new comment*/}
                <AddCommentForm showUpdatedComments={showUpdatedComments}/>
                <CommentList comments={comments} showCommentsAfterDelete={showCommentsAfterDelete}/>
            </section>
            
        </section>
    );
}

export default PostDetails;