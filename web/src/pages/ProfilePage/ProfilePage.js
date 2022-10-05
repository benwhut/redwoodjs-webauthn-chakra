import { Heading } from '@chakra-ui/react'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

const ProfilePage = () => {
  const { isAuthenticated, currentUser, logIn, logOut } = useAuth()

  return (
    <>
      <MetaTags title="Profile" description="Profile page" />

      <Heading>ProfilePage</Heading>
      <p>
        Find me in <code>./web/src/pages/ProfilePage/ProfilePage.js</code>
      </p>
      <p>
        My default route is named <code>profile</code>, link to me with `
        <Link to={routes.profile()}>Profile</Link>`<br />
        <span>Is user logged in? {isAuthenticated.toString()}</span><br />
      </p>
      {isAuthenticated && (
        <>
          <p>Email: {currentUser.email}</p>
          <p>Role: {currentUser.roles}</p>
        </>
      )}
    </>
  )
}

export default ProfilePage
