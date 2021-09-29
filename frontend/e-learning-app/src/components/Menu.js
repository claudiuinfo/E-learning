import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Menu(props) {
    //const [studentIsActive, setStudentIsActive] = useState(false);
    //const [teacherIsActive, setTeacherIsActive] = useState(false);
    const [lastLocation, setLastLocation] = useState("");
    const location = useLocation();
    const [pathname, setPathname] = useState(location.pathname);
    console.log("Location menu")
    console.log(location)

    const isStudentPath = (location) => {
        return location.search("student") > 0
    };

    const isTeacherPath = (location) => {
        return location.search("teacher") > 0
    };

    const studentIsActive = isStudentPath(location.pathname);
    const teacherIsActive = isTeacherPath(location.pathname);

    console.log("My Active")
    console.log(studentIsActive)
    console.log(teacherIsActive)

    // useEffect(() => {
    //     console.log(location)
    //     if (pathname != lastLocation) {
    //         setLastLocation(location);
    //         console.log(lastLocation)
    //     }
    // })

    // useEffect(() => {
    //     if (lastLocation.search("student")) {
    //         setStudentIsActive(true);
    //         setTeacherIsActive(false);
    //         console.log("studentttt")
    //     } else if (lastLocation.search("teacher")) {
    //         setStudentIsActive(false);
    //         setTeacherIsActive(true);
    //         console.log("teacherrr")
    //     }
    // }, [lastLocation]);
    
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <ul className="navbar-nav">
                <li className="nav-item active">
                <a className="nav-link" href="http://localhost:3000/student"><span STYLE={studentIsActive && "font-size:15.0pt; color:white"}>Student</span></a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="http://localhost:3000/teacher"><span STYLE={teacherIsActive && "font-size:15.0pt; color:white"}>Teacher</span></a>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;