import 'normalize.css'
import './Global.css'

import { Router } from 'react-router'
import { history } from './routes/history'
import { Provider } from 'react-redux'
import { configStore } from './store'

import Main from './Main'

function App() {
  return (
    <Provider store={configStore}>
      <Router history={history}>
        <Main />
      </Router>
    </Provider>
  )
}

export default App;
