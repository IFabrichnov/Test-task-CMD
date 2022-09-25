import React from 'react'
import 'rsuite/dist/styles/rsuite-default.css'
import { Container } from 'rsuite'
import { Form } from './features'
import AllData from './components/AllData'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Container>
      <Routes>
          <Route path={process.env.PUBLIC_URL + '/'} element={<Form />} />
          <Route path="all-data" element={<AllData />} />
      </Routes>
    </Container>
  )
}

export default App
