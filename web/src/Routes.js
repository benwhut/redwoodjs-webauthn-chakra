// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import UsersLayout from 'src/layouts/Admin/UsersLayout'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import SpinnerLoader from './components/SpinnerLoader/SpinnerLoader'

const Routes = () => {
  return (
    <Router>
      <Set wrap={MainLayout} 
        // whileLoadingPage={SpinnerLoader}
      >
        <Set prerender>
          <Route path="/" page={HomePage} name="home" />
          <Route path="/contact" page={ContactPage} name="contact" />
          <Route path="/about" page={AboutPage} name="about" />
          <Route path="/login" page={LoginPage} name="login" />
          <Route path="/signup" page={SignupPage} name="signup" />
          <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
          <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
          <Route notfound page={NotFoundPage} />
        </Set>

        <Private 
          unauthenticated='login' 
          roles={['admin', 'user']}
          // whileLoadingAuth={SpinnerLoader} //<-- auth loader
          // whileLoadingPage={SpinnerLoader} // <-- page chunk loader
        >
          <Route path="/profile" page={ProfilePage} name="profile" />
        </Private>

        <Private 
          unauthenticated='login' 
          roles='admin'
          // whileLoadingAuth={SpinnerLoader} //<-- auth loader
          // whileLoadingPage={SpinnerLoader} // <-- page chunk loader
        >
          <Set wrap={UsersLayout}>
            <Route path="/admin/users/new" page={AdminUserNewUserPage} name="adminNewUser" />
            <Route path="/admin/users/{id:Int}/edit" page={AdminUserEditUserPage} name="adminEditUser" />
            <Route path="/admin/users/{id:Int}" page={AdminUserUserPage} name="adminUser" />
            <Route path="/admin/users" page={AdminUserUsersPage} name="adminUsers" />
          </Set>
        </Private>
      </Set>
    </Router>
  )
}

export default Routes
