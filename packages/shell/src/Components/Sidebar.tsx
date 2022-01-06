import * as React from 'react'
import styles from './Sidebar.module.sass'

interface Props { }

const Sidebar: React.FC<Props> = () => {
  return (
    <div className={`d-sm-flex d-none flex-column flex-shrink-0 p-3 text-white bg-dark ${styles.sidebar} ${styles.sidebar_open}`}>
      <a href='#' className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'>
        <span className='fs-4'>Epic App</span>
      </a>
      <hr />
      <ul className='nav nav-pills flex-column mb-auto'>
        <li className='nav-item'>
          <a href='#' className='nav-link active'>
            Home
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar