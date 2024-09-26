import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Protect from './routes/Protect';

function App() {

  return (
    <>
      <Protect>
        <Outlet />
      </Protect>
    </>
  )
}

export default App
