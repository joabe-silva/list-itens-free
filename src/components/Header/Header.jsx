import { Menu } from '../Menu/Menu';

export const Header = () => {
    return(
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <Menu />
                <span className="navbar-brand mb-0 h1">My List</span>
            </div>
        </nav>
    )
}