import {Link} from 'react-router-dom';


const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>Trove</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
                <Link to="/DiscoveryGame">DiscoveryGame</Link>
                <Link to="/CreateAccount">Create Account</Link>
                <Link to="/login">Login</Link>
                <Link to="/Tester">Tester</Link>
                
                

                
            </div>
        </nav>


    );
    
}
 
export default Navbar;