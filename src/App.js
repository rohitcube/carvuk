import React, { useEffect, useState } from 'react'
import SignUp from './SignUpPage';
import Login from './LoginPage';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CreatePost from './CreatePost';
import UpdatePost from './UpdatePost';

const App = () => {

  const [token, setToken] = useState(false)
  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data) //globally inititalise this state called token
    }
  }, [])

  //    <Route path={'/createpost'} element={<CreatePost />} />

  return (
    <div>
      <Routes>
        <Route path={'/SignUp'} element={<SignUp />}/>
        <Route path={'/'} element={<Login setToken={setToken}/>}/>
        {token ? <Route path={'/homepage'} element={<HomePage />} /> : "Session timed out. Please head back\
        to the login page"}
        {token ? <Route path={'/createpost'} element={<CreatePost />} /> : "Session timed out. Please head back\
        to the login page"}
        {token ? <Route path={'/updatepost'} element={<UpdatePost />} /> : "Session timed out. Please head back\
        to the login page"}
      </Routes>
    </div>
  )
}
export default App