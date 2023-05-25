import { useState } from 'react'
import './App.css'
import MainNotes from './components/MainNotes'

function App() {
  
  const [count,setCount] = useState(0)

  return (
    <>
      <MainNotes />
    </>
  )
}

export default App
