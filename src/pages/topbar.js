// import React from 'react';
import LOGO from "../images copy/LOGO.png";
import '../App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import EducationMenu from './EducationMenu';
import { useTranslation } from 'react-i18next';
import { useContext } from "react";
import { AuthContext } from "./Providers/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
const Topbar = () => {
  const { t } = useTranslation();
  const { user, logOut } = useContext(AuthContext)
  const [isAdmin, setIsAdmin] = useAdmin();
  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error));
  }

  return (
    <div className='topbar'>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect> {/* Added expand="lg" prop */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Brand href="/">
            <div><img src={LOGO} className="Logo" alt="logo" /></div>
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> Added toggle button */}
          <Nav className="me-auto">
            <EducationMenu />
            <Nav.Link href="/telehealth">{t('Find Practioner')}
            </Nav.Link>
            <Nav.Link href="/cancer">{t('Cancer')}
            </Nav.Link>
            <Nav.Link href='/blog'> {t('Blogs')}
            </Nav.Link>
            <Nav.Link href="/apoth">{t('Apothecary')}
            </Nav.Link>
            <Nav.Link href='/about'> {t('About Us')}
            </Nav.Link>

            {isAdmin &&
              <Nav.Link href='/dashboard'>  <button style={{
                backgroundColor: 'blue', color: 'white',
                padding: '8px 16px', fontWeight: "bold", border: 'none',
                borderRadius: '5px', marginBottom: window.innerWidth <= 768 ? '10px' : '7px',
              }}>
                {t('Dashboard')}
              </button>
              </Nav.Link>
            }
          </Nav>

          {
            user ? <>
              <button
                style={{
                  backgroundColor: 'blue', gap: '10px', color: 'white', padding: '8px 18px',
                  fontWeight: "bold", border: 'none', borderRadius: '5px'
                }}
                onClick={handleLogOut} className="l"> LogOut </button> </> : <> <Nav.Link
                  style={{
                    backgroundColor: 'blue', color: 'white',
                    padding: '8px 18px', fontWeight: "bold", border: 'none', borderRadius: '5px',
                  }}
                  href='/login'> {t('Login')}  </Nav.Link> </>
          }
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Topbar;
