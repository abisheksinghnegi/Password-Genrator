import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [spcharallowed, setspchar] = useState(false)
  const [numberallowed, setno] = useState(false)
  const [password, setpassword] = useState("")

  const passwordgenerator= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberallowed) str+="0123456789"
    if(spcharallowed) str+="!@#$%^&*"

    for (let i = 1; i<=length; i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)  
    }

    setpassword(pass)
    
  },[length,spcharallowed,numberallowed])

  useEffect(()=>{
    passwordgenerator()
  },[length,spcharallowed,numberallowed,passwordgenerator])

  const passwordref= useRef(null)

  const copybtn= useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
    <div id='containor'>
      <h1>PASSWORD GENERATOR</h1>
      <div>
        <input id='pass' type="text" value={password} placeholder='password' readOnly ref={passwordref}></input>
        <button onClick={copybtn()}>COPY</button>
      </div>
      <div>
        <input type="range" min={6} max={100} value={length} onChange={(e)=>{setlength(e.target.value)}} />
        <label>length:{length}</label>
      </div>
      <div><input type="checkbox" defaultChecked={numberallowed} onChange={()=>{setno((prev)=>!prev);}}/>NUMBER
            <input type="checkbox" defaultChecked={spcharallowed} onChange={()=>{setspchar((prev)=>!prev);}} />CHARACTERS
      </div>
    </div>
    </>
  )
}

export default App
