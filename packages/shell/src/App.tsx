import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './variable.sass'
import styles from './App.module.sass'
import Dashboard from './Views/Dashboard'
import Navbar from './Components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Components/Sidebar'

const DashboardServiceLazy = React.lazy(() => import('dashboard/DashboardRoutes'))

interface Props { }

const App: React.FC<Props> = () => {
  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={`d-flex flex-shrink-0 ${styles.content}`}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <React.Suspense fallback="Loading...">
                <DashboardServiceLazy />
              </React.Suspense>
            } />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  )
}

export default App