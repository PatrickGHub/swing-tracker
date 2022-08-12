import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './routes/Home'
import Courses from './routes/Courses'

const Routes = () => (
  <BrowserRouter>
    <header>
      <Navigation />
    </header>
    <main>
      <Switch>
        <Route path='/' element={ <Home /> } />
        <Route path='/courses' element={ <Courses /> } />
      </Switch>
    </main>
  </BrowserRouter>
)

export default Routes
