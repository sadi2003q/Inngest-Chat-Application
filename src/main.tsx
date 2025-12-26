// FilePath: src/main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ChatInterface from './View/ChatInterfacePage.tsx'
import AuthPage from "./View/SignupPage.tsx";
import SignupPage from "./View/LoginPage.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SignupPage/>
  </StrictMode>
)
