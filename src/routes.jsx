import React from 'react'
import App from './App'
import Home from './pages/Home'
import Services from './pages/Services'
import Products from './pages/Products'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLogin from './admin/AdminLogin'
import DashboardLayout from './admin/DashboardLayout'

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'products', element: <Products /> },
      { path: 'projects', element: <Projects /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'admin', element: <AdminLogin /> },
      { path: 'admin/dashboard/*', element: <DashboardLayout /> },
    ],
  },
]
