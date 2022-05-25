import React from 'react';
import { loginContext } from "../../App";
import  { useContext} from 'react';
import { Sidebar,Topbar } from '../../components';
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
        </section>
        ) : (<h1>You are not logged in</h1>)
}
        </>
    )
};

export default Home;