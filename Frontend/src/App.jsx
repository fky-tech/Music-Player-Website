import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Tracks from "./components/Tracks"
import Albums from "./components/Albums"
import store from "./store"
import { Provider } from "react-redux"
import Artists from "./components/Artists"


function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/tracks' element={<Tracks />}></Route>
        <Route path='/albums' element={<Albums />}></Route>
        <Route path='/artists' element={<Artists />}></Route>
      </Routes>
    </Provider>
  )
}

export default App
