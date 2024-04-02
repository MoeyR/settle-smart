import { Link, useNavigate } from "react-router-dom";
import "./PostAdd.scss";
import { useEffect, useRef, useState } from "react";
import { apiClient } from "../../utils/settle-smart-api";
import imgPlaceholder from "../../assets/images/thumbnail-placeholder.png";
import { StandaloneSearchBox } from "@react-google-maps/api";
// eslint-disable-next-line
import { Loader } from "@googlemaps/js-api-loader";

function PostAdd() {
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [locationEntered, setlocationEntered] = useState("");
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const inputLocationRef = useRef();

  const [invalidInput, setInvalidInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleChangeTitle = (event) => {
    setPostTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setPostContent(event.target.value);
  };

  const handleChangeImage = (event) => {
    setPostImage(event.target.files[0]);
  };

  //To check location input is empty or not
  const handleChangeLocation = (event) => {
    setlocationEntered(event.target.value);
  };

  //Load Google Maps API and set Google Maps loaded state
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      setGoogleMapsLoaded(true);
    });

    return () => {
      setGoogleMapsLoaded(false);
    };
  }, []);

  let place;
  const handlePlaceChanged = () => {
    [place] = inputLocationRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };

  const publishPost = async (event) => {
    event.preventDefault();

    //Form validation
    if (postTitle.trim() === "") {
      setInvalidInput(true);
      setErrorMessage("Title");
    } else if (postContent.trim() === "") {
      setInvalidInput(true);
      setErrorMessage("Description");
    } else if (!postImage) {
      setInvalidInput(true);
      setErrorMessage("Thumbnail");
    } else if (locationEntered.trim() === "" && !place) {
      setInvalidInput(true);
      setErrorMessage("Location");
    } else {
      try {
        const newPost = {
          user_id: 20,
          post_title: postTitle,
          post_content: postContent,
          post_collects: 0,
          post_image: postImage,
          post_location: place.formatted_address,
          post_latitude: place.geometry.location.lat(),
          post_longitude: place.geometry.location.lng(),
        };
        await apiClient.addPost(newPost);
        setSubmitSuccess(true);
        setInvalidInput(false);
        setTimeout(() => {
          navigate("/");
        }, 2500);
      } catch (error) {
        setHasError(true);
      }
    }
  };

  const clearForm = () => {
    setPostTitle("");
    setPostContent("");
  };

  return (
    <form className="form" method="POST" encType="multipart/form-data">
      <section className="form-thumbnail-section">
        <label className="form__item-label">
          <h4 className="form__label-text">POST THUMBNAIL</h4>
          <img
            className="form__thumbnail-image"
            src={postImage ? URL.createObjectURL(postImage) : imgPlaceholder}
            alt="post-thumbnail"
          />
          <input
            className="form__thumbnail-upload"
            type="file"
            name="post_image"
            accept=".jpg, .jpeg, .png"
            onChange={handleChangeImage}
          />
        </label>
      </section>
      <label className="form__item-label" htmlFor="post_title">
        <h4 className="form__label-text">ADD A TITLE </h4>
        <input
          className="default-input form__item-input"
          type="text"
          name="post_title"
          placeholder="Add a title"
          onChange={handleChangeTitle}
        />
      </label>
      <label className="form__item-label" htmlFor="post_content">
        <h4 className="form__label-text">ADD A DESCRIPTION </h4>
        <textarea
          className="form__item-textarea"
          name="post_content"
          placeholder="Add a description to your post"
          onChange={handleChangeDescription}
        ></textarea>
      </label>
      <label className="form__item-label" htmlFor="post_location">
        <h4 className="form__label-text"> LOCATION </h4>
        {googleMapsLoaded && (
          <StandaloneSearchBox
            onLoad={(ref) => (inputLocationRef.current = ref)}
            onPlacesChanged={handlePlaceChanged}
          >
            <input
              className="default-input form__item-input"
              type="text"
              name="post_location"
              placeholder="Add your location"
              onChange={handleChangeLocation}
            />
          </StandaloneSearchBox>
        )}
      </label>
      {invalidInput && (
        <div className="error-message">{errorMessage} is required</div>
      )}
      {/* Form Buttons */}
      <section className="form__buttons-wrap">
        <button
          type="submit"
          onClick={publishPost}
          className="form__post-button"
        >
          POST
        </button>
        <Link to="/">
          <button onClick={clearForm} className="form__cancel-button">
            CANCEL
          </button>
        </Link>
        {/* Messages */}
        {submitSuccess && (
          <div className="success-message">
            Successfully posted! Taking you to HOME page.
          </div>
        )}
        {hasError && (
          <div className="error-message">
            Form has errors, please come back later
          </div>
        )}
      </section>
    </form>
  );
}

export default PostAdd;
