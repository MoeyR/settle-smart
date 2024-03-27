import axios from "axios";

class SettleSmartApi {
    constructor(){
        this.baseUrl = "http://localhost:8080";
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

    async getPostDetails(id){
        try {
            const response = await axios.get(`${this.baseUrl}/posts/${id}`);
            return response.data;
        } catch (error) {
            console.log(`GET post details request failed, ${error}`);
        }
    }

    async getComments(id){
        try {
            const commentsResponse = await axios.get(`${this.baseUrl}/posts/${id}/comments`)
            return commentsResponse.data;
        } catch (error) {
            console.log(`GET post comments request failed, ${error}`);
        }
    }
}

//Instantiate SettleSmartApi
const apiClient = new SettleSmartApi();

export {apiClient};