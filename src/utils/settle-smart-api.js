import axios from "axios";

class SettleSmartApi {
    constructor(){
        this.baseUrl = process.env.REACT_APP_BASE_URL;
    }

    //Get All Posts
    async getPosts(){
        try {
            const response = await axios.get(`${this.baseUrl}/posts`);
            return response.data;
        } catch (error) {
            console.log(`GET posts request failed, ${error}`);
        }
    }

    //Get a single post
    async getPostDetails(id){
        try {
            const response = await axios.get(`${this.baseUrl}/posts/${id}`);
            return response.data;
        } catch (error) {
            console.log(`GET post details request failed, ${error}`);
        }
    }

    async addPost(post){
        try {
            await axios.post(`${this.baseUrl}/posts`, post, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            });
        } catch (error) {
            console.log(`POST a single post request failed, ${error}`);
        }
    }

    //CRUD for comments
    async getComments(id){
        try {
            const commentsResponse = await axios.get(`${this.baseUrl}/posts/${id}/comments`)
            return commentsResponse.data;
        } catch (error) {
            console.log(`GET comments request failed, ${error}`);
        }
    }

    async postComment(id, comment){
        try {
          await axios.post(`${this.baseUrl}/posts/${id}/comments`,comment);
        } catch (error) {
          console.log(`POST comment request failed, ${error}`);
        }
      }

    async deleteComment(postId, commentId){
        try {
            await axios.delete(`${this.baseUrl}/posts/${postId}/comments/${commentId}`);
        } catch (error) {
            console.log(`DELETE comment request failed, ${error}`);
        }
    }

}

//Instantiate SettleSmartApi
const apiClient = new SettleSmartApi();

export {apiClient};