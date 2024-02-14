import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import { Leva } from "leva";
// import { EcctrlJoystick } from "./EcctrlJoystick";
import './index.css'

// const EcctrlJoystickControls = () => {
//   const [isTouchScreen, setIsTouchScreen] = useState(false)
//   useEffect(() => {
//     // Check if using a touch control device, show/hide joystick
//     if (('ontouchstart' in window) ||
//       (navigator.maxTouchPoints > 0)) {
//       setIsTouchScreen(true)
//     } else {
//       setIsTouchScreen(false)
//     }
//   }, [])
//   return (
//     <>
//       {isTouchScreen && <EcctrlJoystick buttonNumber={5} />}
//     </>
//   )
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
