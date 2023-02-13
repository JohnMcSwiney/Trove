import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">

            <h2>sorry</h2>
            <p>That page cannot be found</p>
            <Link to="/">go back home</Link>
            
        </div>
      );
}
 
export default NotFound;