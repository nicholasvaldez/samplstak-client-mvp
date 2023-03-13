import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { SampleList } from "../components/sample/SampleList"
import { Authorized } from "./Authorized"

export const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          {/* Add Routes here */}
          <Route path="/" element={<SampleList />} />
          <Route path="mysounds" element={<></>} />
        </Route>
      </Routes>
    </>
  )
}
