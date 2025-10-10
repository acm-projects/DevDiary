import '../styles/App.css'
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>

      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/new-project">Create New Project</Link> |{" "}
        <Link to="/DefaultReactApp">Default React App</Link>
      </nav>
    </div>
  )  
}

export default Home