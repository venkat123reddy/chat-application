import api from "./Axios"

export const getAllMessages =  (send,receiver)=>{

     return api.get(`/messages/all?senderID=${send}&receiverID=${receiver}`);
    
} 