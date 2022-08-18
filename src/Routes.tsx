import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './routes/Home'
import Courses from './routes/Courses'
import Rounds from './routes/Rounds'

const Routes = () => (
  <BrowserRouter>
    <header>
      <Navigation />
    </header>
    <main>
      <Switch>
        <Route path='/' element={ <Home /> } />
        <Route path='/courses' element={ <Courses /> } />
        <Route path='/rounds' element={ <Rounds /> } />
      </Switch>
    </main>
  </BrowserRouter>
)

export default Routes
