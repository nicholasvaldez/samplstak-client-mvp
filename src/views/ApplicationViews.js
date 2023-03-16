import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { CollectionList } from "../components/collection/CollectionList"
import { EditSample, SampleForm } from "../components/mysounds/EditMySounds"
import { MySoundsList } from "../components/mysounds/MySoundsList"
import { NewSample } from "../components/mysounds/SampleForm"
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
          <Route path="collection" element={<CollectionList />} />
          <Route path="mysounds" element={<MySoundsList />} />
          <Route path="mysounds/new" element={<SampleForm />} />
          <Route path="mysounds/edit/:sampleId" element={<SampleForm />} />
        </Route>
      </Routes>
    </>
  )
}
