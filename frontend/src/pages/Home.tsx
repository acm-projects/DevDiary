
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>

      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/new-project">Create New Project</Link> |{" "}
        <Link to="/new-log">New Log</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/sign-up">Sign Up</Link> 
      </nav>
    </div>
  )  
}

export default Home;