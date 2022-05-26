import React from 'react';
import { loginContext } from "../../App";
import  { useContext} from 'react';
import { Footer, Sidebar,Topbar,ErrorPage } from '../../components';
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
        ) : ( <div><ErrorPage/><Footer/></div>

        )
}
        </>
    )
};

export default Home;