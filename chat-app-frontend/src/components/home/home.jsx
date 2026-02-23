import Sidebar from "../sidebar/Sidebar";
import './home.css';
import Nav from '../navbar/Nav'
import Chat from "../chatwindow/Chat";
import GroupChat from "../groupMessage/GroupMessage";
import { useSelector, useDispatch } from 'react-redux';

function Home() {

    
    const currentStatus = useSelector((state)=> state.navStatus.status);

    

    return (


        <>
        <div className="home">
        <Nav></Nav>
        <Sidebar></Sidebar>
        <div>
            {currentStatus==0 && <Chat></Chat> }
            {currentStatus==1 && <GroupChat></GroupChat>}
        </div>

        </div>
    
        </>
    )
}

export default Home;