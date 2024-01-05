import React from 'react'
import { useNavigate } from "react-router-dom";
import {Logo} from '../../svgs/logoSVG'
function Error() {
  const navigate =  useNavigate();
  return (
    <div className='h-screen p-4' style={{background : '#f6f3ef'}}>
        <div className='flex flex-row gap-2 absolute'>
          <Logo />
          <div>MindMate</div>
        </div>
        <div className='h-full flex flex-col items-center justify-center gap-2'>
            <h1 className='text-8xl'>404</h1>
            <p>Page Not Found</p>
            <button className='w-52 p-1 rounded' style={{background : '#fccb5e'}} onClick={()=>{
              navigate('/')
            }}>Go to Home Page</button>
        </div>
    </div>
  )
}

export default Error
