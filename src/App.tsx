import Routers from '@/routers'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import './App.css'
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Routers></Routers>
      </div>
    </Provider>
  )
}

export default App
