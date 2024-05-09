import { useContext } from 'react'
import { Container, Nav, Navbar, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Notification from './chat/Notification'
const NavBar = () => {
  const { user, logOutUser } = useContext(AuthContext)
  return (
    <Navbar bg='dark' className='mb-4' style={{ height: '3.75rem' }}>
      <Container>
        <h2>
          <Link to='/' className='link-light text-decoration-none'>
            ChatApp
          </Link>
        </h2>
        {user && (
          <span className='text-warning'>Logged in as {user?.name}</span>
        )}

        <Nav>
          <Stack direction='horizontal' gap={4}>
            {user && (
              <>
                <Notification />
                <Link
                  to='/login'
                  className='link-light text-decoration-none'
                  onClick={() => {
                    logOutUser()
                  }}
                >
                  logout
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to='/login' className='link-light text-decoration-none'>
                  Login
                </Link>
                <Link
                  to='/register'
                  className='link-light text-decoration-none'
                >
                  Register
                </Link>
              </>
            )}
            <Link to="/groups">
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='white'
                className='bi bi-people-fill'
                viewBox='0 0 16 16'
              >
                <path d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5' />
              </svg>
            </Link>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
