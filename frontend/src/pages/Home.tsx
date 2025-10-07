import '/src/styles/App.css'
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>

      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/new-project">Create New Project</Link> |{" "}
        <Link to="/search-results">Search Results</Link>
      </nav>
    </div>
  )  
}

export default Home