function Menu() {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <ul className="navbar-nav">
                <li className="nav-item active">
                <a className="nav-link" href="http://localhost:3000/student">Student</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="http://localhost:3000/teacher">Teacher</a>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;