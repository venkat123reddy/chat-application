import api from "./Axios"


export const authenticate = (auth)=>{

    return api.post("/api/v1/auth/login",auth);

}

export async  function getUsers() {
 
    let data = await api.get("/api/v1/user/allUsers")
    .then(res=>{
        console.log(JSON.stringify(res))
    });
}

export const getAllUsers = ()=>{
    return api.get("/api/v1/user/allUsers");
};

export const getAllGroups = (userId)=>{
    return api.get(`/api/v1/user/user-groups/${userId}`);
};

const createUser = async (userInput)=>{

    let response = await api.post("/api/v1/user/createUser", userInput)

    console.log(response.status===200);
    return response.status===200;
    
}

export default createUser;
