import React, { useContext, useEffect, useState } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { UserContext } from '../../../App';


const AdminNav = ({admin}) => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    const [isAdmin, setIsAdmin] = useState(false)

    if (!loggedInUser.email) {
        const newUser = {
            email: sessionStorage.getItem("email")
        }
        setLoggedInUser(newUser)
    }
    
    useEffect(()=>{
        fetch("http://localhost:5500/checkIsAdmin",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({ email: loggedInUser.email})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setIsAdmin(data)
            admin=data
        })
    },[loggedInUser])
    
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand style={{ width: "50px" }} className="mx-5" href="#home">Express-Clean</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="mx-5" id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/"><h5>Home</h5></Nav.Link>
                    {
                        !isAdmin && <Nav.Link href="/orders"><h5>Orders</h5></Nav.Link>
                    }
                    {
                        isAdmin && <div className="d-flex"><Nav.Link href="/admin/addAdmin"><h5>Add Admin</h5></Nav.Link>
                            <Nav.Link href="/admin/addBlog"><h5>Add Blog</h5></Nav.Link>
                            <Nav.Link href="/admin/orderMaintain"><h5> Admin Orders</h5></Nav.Link>
                            <Nav.Link href="/admin/addService"><h5> Add Service</h5></Nav.Link>
                            
                            </div>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AdminNav;