import Greeting from "./components/Greeting"
import NavBar from "./components/NavBar"
import ItemListContainer from './components/ItemListContainer'

function App() {
  return (
    <>
      <Greeting/>
      <NavBar/>
      <div>
      <ItemListContainer greeting="¡Bienvenido a nuestra tienda!" />
      </div>
    </>
  )
}

export default App
