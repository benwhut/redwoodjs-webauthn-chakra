import { NavLink, Link, routes } from "@redwoodjs/router"
import { Container, Center, Flex, Text, Button, IconButton, Spacer, Box, useColorMode, useColorModeValue, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import DarkModeSwitch from "src/components/DarkModeSwitch"
import { useAuth } from '@redwoodjs/auth'
import { useState } from "react"


const MainLayout = ({ children }) => {
  const { isAuthenticated, currentUser, hasRole, logIn, logOut } = useAuth()
  const [display, changeDisplay] = useState('none')
  const { colorMode, toggleColorMode } = useColorMode()

  const logoutMobileMenu = () => {
    logOut()
    changeDisplay('none')
  }

  // constants for easy maintanence
  const brandLogo = "TakedownScout"
  const aboutPage = "About"
  const contactPage = "Contact"
  const adminPage = "Admin"
  const loginPage = "Login"
  const signupPage = "Get Started"
  const signupButtonBackground = useColorModeValue("orange.400", "orange.300")

  return (
    <Container maxW='container.xl' maxHeight="100vh" px="10" background={useColorModeValue('gray.50', 'gray.700')}>
      <header>
        <Flex
          direction="column" 
          height="100%" 
          display={['none', 'none', 'flex', 'flex']}
        >
          <Flex
            py="6"
            align="center"
            minWidth='max-content' 
            alignItems='center' 
            gap='3'
          >
            <Center h="10" mr="10" fontSize="xl" fontWeight="bold"> 
              <Link to={routes.home()}>{brandLogo}</Link>
            </Center>
            
            <Flex mr="4" fontWeight="medium">
              <NavLink activeClassName="activeLink" to={routes.about()}>
                {aboutPage}
              </NavLink>
            </Flex>

            <Flex mr="4" fontWeight="medium">
              <NavLink activeClassName="activeLink" to={routes.contact()} >
                {contactPage}
              </NavLink>
            </Flex>

            {hasRole('admin') && (
              <Flex mr="4" fontWeight="medium">
                <NavLink
                  activeClassName="activeLink" to={routes.adminUsers()}
                >
                  {adminPage}
                </NavLink>
              </Flex>
            )}

            <Spacer />

            <Center>
              {!isAuthenticated ? (
                <>
                  <Link to={routes.login()}>
                    <Button
                    variant="ghost"
                    aria-label={loginPage}
                    w="100%"
                    >
                      {loginPage}
                    </Button>
                  </Link>
                  <Link to={routes.signup()}>
                    <Button
                      ml="4"
                      variant="solid"
                      aria-label={signupPage}
                      w="100%"
                      background={signupButtonBackground}
                    >
                      {signupPage}
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label='Profile'
                      variant='solid'
                      ml="4"
                      p="4"
                      w="100%"
                    >
                      {currentUser.email}
                    </MenuButton>
                    <MenuList>
                      <MenuItem>
                        <Link to={routes.profile()}>
                          Profile
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={logOut}>
                        Sign out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              )}
            </Center>
          </Flex>
        </Flex>

        {/* Mobile Hamburger */}
        <Flex justifyContent="space-between">
            <Center 
              justify="left" 
              mt={2}
              display={['flex', 'flex', 'none', 'none']}
            >
              <Flex fontSize="xl" fontWeight="bold">
                <Link to={routes.home()}>
                  {brandLogo}
                </Link>
              </Flex>
            </Center>

            <Center justify="flex-end">
              <IconButton
                aria-label="Open Menu"
                size="lg"
                mt={2}
                icon={<HamburgerIcon />}
                onClick={() => changeDisplay('flex')}
                display={['flex', 'flex', 'none', 'none']}
              />
            </Center>
        </Flex>

        {/* Mobile Content */}
        <Flex
          w='100vw'
          display={display}
          zIndex={20}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
          bgColor={colorMode === 'dark' ? "rgba(0,0,0,0.95)" : "rgba(255,255,255,0.95)"}
        >
            
          <Flex justifyContent="space-between">
            <Center 
              justify="left" 
              mt={2}
              ml={10}
            >
              <Flex fontSize="xl" fontWeight="bold">
                <Link onClick={() => changeDisplay('none')} to={routes.home()}>
                  {brandLogo}
                </Link>
              </Flex>
            </Center>

            <IconButton
              mt={2}
              mr={10}
              aria-label="Open Menu"
              size="lg"
              icon={<CloseIcon />}
              onClick={() => changeDisplay('none')}
            />
          </Flex>

          <Flex
            flexDir="column"
            align="center"
          >
            <NavLink to={routes.home()}>
              <Button
                variant="ghost"
                aria-label="Home"
                my={1}
                w="100%"
                onClick={() => changeDisplay('none')}
              >
                Home
              </Button>
            </NavLink>
            <NavLink to={routes.about()}>
              <Button
                variant="ghost"
                aria-label={aboutPage}
                my={1}
                w="100%"
                onClick={() => changeDisplay('none')}
              >
                {aboutPage}
              </Button>
            </NavLink>
            <NavLink to={routes.contact()}>
              <Button
                variant="ghost"
                aria-label={contactPage}
                my={1}
                w="100%"
                onClick={() => changeDisplay('none')}
              >
                {contactPage}
              </Button>
            </NavLink>
            {hasRole('admin') && (
              <NavLink to={routes.adminUsers()}>
                <Button
                  variant="ghost"
                  aria-label={adminPage}
                  my={1}
                  w="100%"
                  onClick={() => changeDisplay('none')}
                >
                  {adminPage}
                </Button>
              </NavLink>
            )}
            

            {isAuthenticated ? (
              <>
                <Button mt={1} aria-label="Logout" onClick={logoutMobileMenu}>Logout</Button>
              </>
            ) : (
              <>
                <Link to={routes.login()}>
                  <Button
                    variant="ghost"
                    aria-label={loginPage}
                    my={1}
                    w="100%"
                    onClick={() => changeDisplay('none')}
                  >
                    {loginPage}
                  </Button>
                </Link>
                <Link to={routes.signup()}>
                  <Button
                    variant="solid"
                    aria-label={signupPage}
                    my={1}
                    w="100%"
                    background={signupButtonBackground}
                    onClick={() => changeDisplay('none')}
                  >
                    {signupPage}
                  </Button>
                </Link>
              </>
            )}
          </Flex>
        </Flex>
      </header>
      <main>{children}</main>
      <footer>
        <Flex 
          pb="6"
          justify="right"
        >
          <DarkModeSwitch />
        </Flex>
      </footer>
    </Container>
  )
}

export default MainLayout
