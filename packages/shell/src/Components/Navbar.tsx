import * as React from 'react'
import { Container, Navbar as NavbarRB } from 'react-bootstrap'
import styles from './Navbar.module.sass'

interface Props { }

const Navbar: React.FC<Props> = () => {
  return (
    <NavbarRB className={styles.custom_nav_bar} bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <NavbarRB.Brand>Epic App</NavbarRB.Brand>
      </Container>
    </NavbarRB>
  )
}

export default Navbar