// FilePath: src/main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import First from './First'
import ChatInterface from './View/chat_interface.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatInterface/>
  </StrictMode>
)
