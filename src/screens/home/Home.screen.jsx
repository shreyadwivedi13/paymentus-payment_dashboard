import React from 'react';
import { loginContext } from "../../App";
import  { useContext} from 'react';
import { Footer, Sidebar,Topbar } from '../../components';
import "./home.styles.css";

const Home = () =>{
    const {loginState} = useContext(loginContext);

    return(
        <>
        {loginState.isLoggedIn ? (
        <section>
             <Topbar />
                 <div className='container'>
          <Sidebar />
          <div className="homepage">
              <h2>Home Page</h2>
            </div>
            </div>
            <Footer/>
        </section>
        ) : (<div><div id="warning"><h2 id="warningHeader" color="red"><strong>The requested URL was not found on this server.</strong></h2>
        <div id="warningDescription"><ul><li><p>you might have been logged out, please try logging in again.</p></li>
          <li><p>if you entered the URL manually please check your spellings.</p></li>
           <li><p>if you think this is a server error, please contact the Administrator.</p></li></ul></div></div><Footer/></div>
        )
}
        </>
    )
};

export default Home;