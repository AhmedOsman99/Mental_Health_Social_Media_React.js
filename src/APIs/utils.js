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