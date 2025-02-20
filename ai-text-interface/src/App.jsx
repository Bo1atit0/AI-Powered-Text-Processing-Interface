import { useState } from 'react'
import './App.css'
import React from 'react'
import Header from './components/header/header'
import Aside from './components/aside/aside'
import Main from './components/main/main'

function App() {
  return (
    <>
    <Header />

    <div className='body'>
      {/* <Aside /> */}
      <Main />
    </div>
    </>
  )
}

export default App
