import axios from "axios"

export const getChats = async () => {
    let authTokens = JSON.parse(localStorage.getItem('authTokens'));
     let accessToken = authTokens.access;
     console.log(accessToken);
     let config = {
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
     };
    let response = await axios.get('http://127.0.0.1:8000/chat/mychats/', config)
    return response
}

export const addNewPost = async (newPost) => {
    let authTokens = JSON.parse(localStorage.getItem('authTokens'));
     let accessToken = authTokens.access;
     console.log(accessToken);
     let config = {
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
     };
    let response = await axios.post("http://localhost:8000/post/", newPost ,config); 
    return response
  }; 



export const sendRequest = async (recipient_id) => {
    let id = {
        "recipient_id" : recipient_id
    }
    let authTokens = JSON.parse(localStorage.getItem('authTokens'));
     let accessToken = authTokens.access;
     console.log(accessToken);
     let config = {
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
     };
    let response = await axios.post("http://localhost:8000/connect/send_request/", id ,config); 
    return response
  }; 


  export const fetchPosts = async() => {
    let authTokens = JSON.parse(localStorage.getItem('authTokens'));
     let accessToken = authTokens.access;
     console.log(accessToken);
     let config = {
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
     };
    let response = await axios.get("http://localhost:8000/post/", config);
    return response
  }
  
  export const getFriendRequests = async () => {
    let authTokens = JSON.parse(localStorage.getItem('authTokens'));
     let accessToken = authTokens.access;
     console.log(accessToken);
     let config = {
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
     };
    let response = await axios.get('http://127.0.0.1:8000/connect/list_requests/', config)
    return response
}


export const respondToFriendRequest = async (friendRequestId, response) => {
  let authTokens = JSON.parse(localStorage.getItem('authTokens'));
  let accessToken = authTokens.access;
  console.log(accessToken);
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let data = {
    friend_request_id: friendRequestId,
    response: response
  };
  
  try {
    let response = await axios.post('http://127.0.0.1:8000/connect/respond_request/', data, config);
    return response;
  } catch (error) {
    console.error(error);
  }
};


