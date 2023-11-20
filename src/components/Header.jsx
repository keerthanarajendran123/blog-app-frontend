import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout'
import { useEffect,useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaHome } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";
import { FaUser } from "react-icons/fa";

function Header() {
    let userData = JSON.parse(sessionStorage.getItem('userData'))
    let [role,setRole] = useState("")
    let logout = useLogout()

    useEffect(()=>{
        if(!userData)
        {
            logout()
        }
        else
        {
            setRole(userData.role)
        }
    },[])
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand> <h3>Blog App</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto header-nav-items cursor-pointer">
            {
                role==="admin"?<AdminNavLinks/>:<UserNavLinks/>
            }
          </Nav>
          <Nav>
            <Nav.Item><h4>{` ${userData.firstName} ${userData.lastName} `}<FaUser /></h4></Nav.Item>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Item onClick={logout}><Button variant='danger'>Logout</Button></Nav.Item>
          </Nav>   
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function AdminNavLinks(){
    let navigate = useNavigate()
    let logout = useLogout()
    return <>
            <Nav.Item onClick={()=>navigate('/dashboard')}><BiSolidDashboard />&nbsp;Dashboard</Nav.Item>
    </>
}

function UserNavLinks(){
    let navigate = useNavigate()
    let logout = useLogout()
    return <>
    <div className='navbar'>
            <Nav.Item onClick={()=>navigate('/home')}><FaHome />&nbsp;Home</Nav.Item>&nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Item onClick={()=>navigate('/dashboard')}><BiSolidDashboard />&nbsp;Dashboard</Nav.Item>&nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Item onClick={()=>navigate('/create')}><IoIosCreate />&nbsp;Create</Nav.Item>&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
    </>
}

export default Header;