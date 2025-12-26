// FilePath: src/main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ChatInterface from './View/chat_interface.tsx'
import {AuthPage} from "./View/SignupPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthPage/>
  </StrictMode>
)
