import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import Navigation from './index'

describe('<Navigation />', () => {
  it('should render a link to the home route', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    )

    expect(screen.getByText('Home').getAttribute('href')).toEqual('/')
  })

  it('should render a link to the courses route', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    )

    expect(screen.getByText('Courses').getAttribute('href')).toEqual('/courses')
  })

  it('should render a link to the rounds route', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    )

    expect(screen.getByText('Rounds').getAttribute('href')).toEqual('/rounds')
  })
})