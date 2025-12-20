// FilePath: src/main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import First from './First'
import ChatInterface from './chat_interface'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatInterface/>
  </StrictMode>
)
