import './App.css'
import { useState, useEffect} from 'react'
import React from 'react'
import { sleep } from 'sleep-ts'
import NavBar from './NavBar'
import SortingUI from './SortingUI'
function App() {
  return(
    <>
      <NavBar/>
      <SortingUI/>
    </>
  )
}


export default App
