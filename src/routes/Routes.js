import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Auth from '../views/Auth'
import Task from '../views/Task'
import PrivateRoutes from './PrivateRoutes'

const Router = () => {
  return (
    <React.Fragment>
        <Routes>
            <Route exact path='/' element={<Auth />} />
            <Route path='/task' element={
            <PrivateRoutes>
              <Task />
            </PrivateRoutes>
            } 
            />
        </Routes>
    </React.Fragment>
  )
}

export default Router