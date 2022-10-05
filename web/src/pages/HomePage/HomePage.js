import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { useState, useEffect } from 'react'
import { Heading } from '@chakra-ui/react'
import { toast, Toaster } from '@redwoodjs/web/toast'

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const { isAuthenticated, currentUser, logIn, logOut } = useAuth()

  useEffect(() => {
    console.log("CurrentUser:", currentUser)
  }, [currentUser])
  
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Heading>HomePage/Dashboard</Heading>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.js</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`<br />
        <span>Is user logged in? {isAuthenticated.toString()}</span><br />
      </p>
      {isAuthenticated ? (
        <>
          <p>Email: {currentUser.email}</p>
          <p>Role: {currentUser.roles}</p>
        </>
      ) : (
        navigate(routes.login())
      )} 
    </>
  )
}

export default HomePage
