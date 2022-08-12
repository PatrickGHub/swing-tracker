import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './routes/Home'

const Routes = () => (
  <BrowserRouter>
    <header>
      <Navigation />
    </header>
    <main>
      <Switch>
        <Route path='/' element={ <Home /> } />
      </Switch>
    </main>
  </BrowserRouter>
)

export default Routes
