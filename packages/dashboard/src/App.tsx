import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './variable.sass'
import styles from './App.module.sass'
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardRoutes from './DashboardRoutes'


interface Props { }

const App: React.FC<Props> = () => {
  return (
    <main className={styles.main}>
      <div className={`d-flex flex-shrink-0 ${styles.content}`}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DashboardRoutes />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  )
}

export default App