import { configureStore} from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit"


const counterSlice = createSlice({
    name:"counter",
    initialState:{value:0},
    reducers:{
        add:(state)=>{state.value+=1;},
        sub:(state)=>{state.value-=1;}
    }
})

const counterUser = createSlice({
    name:"currentProfile",
    initialState:{userId:"venkata",id:"1"},
    reducers:{
        setUser: (state, action) => {
            state.userId = action.payload;
        }
    }
})

const navBar = createSlice({
    name:"NavBarStatus",
    initialState:{status:0},
    reducers:{
        setNavStatus: (state, action) => {
            state.status = action.payload;
        }
    }
})

const currentGroup = createSlice({
    name:"currentGroup",
    initialState:{groupName:"aaa"},
    reducers:{
        setGroup: (state, action) => {
            state.groupName = action.payload;
        }
    }
})

const chatUser = createSlice({
    name:"chatProfile",
    initialState:{userId:"reddy"},
    reducers:{
        setChat: (state, action) => {
            state.userId = action.payload;
        }
    }
})

export const {setUser} = counterUser.actions; 
export const {setChat} = chatUser.actions;
export const {setGroup} = currentGroup.actions;
export const {setNavStatus} = navBar.actions;



const store = configureStore({
    reducer:{
        counter : counterSlice.reducer,
        currentProfile: counterUser.reducer,
        chatUser: chatUser.reducer,
        currentGroup:currentGroup.reducer,
        navStatus:navBar.reducer
    }
})
export default store;