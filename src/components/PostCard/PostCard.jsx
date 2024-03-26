import './PostCard.scss';
import collectIcon from "../../assets/icons/collect.svg";
import { Link } from 'react-router-dom';

function PostCard({post}){

  const {user_name, post_title, post_collects, post_image} = post;
    
  return(
        <li className="posts-list__item">
        <section className="post-card">
          <Link to={`/posts/${post.id}`}>
            <img className="post-card__image" src={post_image} alt={post_title} />
            <h3 className="post-card__title">{post_title}</h3>
          </Link>
          <section className="username-collects-wrap">
            <h4 className="post-card__username">{user_name}</h4>
            <div className="collect-icon-number-wrap">
              <img
                className="post-card__collect-icon"
                src={collectIcon}
                alt="collect-icon"
              />
              <span className="post-card__collect-number">{post_collects}</span>
            </div>
          </section>
        </section>
      </li>
    );
}

export default PostCard;