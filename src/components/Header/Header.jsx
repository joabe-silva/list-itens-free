import { Menu } from '../Menu/Menu';
import { Link } from 'react-router-dom';

export const Header = () => {
    return(
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <Menu />
                <span className="navbar-brand mb-0 h1">
                   <Link to="/lista" style={{ textDecoration: 'none', color: 'black' }}>My List</Link>
                </span>
            </div>
        </nav>
    )
}