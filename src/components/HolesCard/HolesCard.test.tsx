/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

import { render, screen } from '@testing-library/react'
import HolesCard from './index'

describe('<HolesCard />', () => {
  it('should render hole data when viewing course data', () => {
    const { container } = render(
      <HolesCard
        holes='[{"hole":1,"yards":106,"par":3},{"hole":2,"yards":165,"par":3},{"hole":3,"yards":79,"par":3},{"hole":4,"yards":118,"par":3},{"hole":5,"yards":86,"par":3},{"hole":6,"yards":121,"par":3},{"hole":7,"yards":100,"par":3},{"hole":8,"yards":106,"par":3},{"hole":9,"yards":248,"par":4}]'
        existingRound={false}
      />
    )

    expect(screen.getByText('Hole 1')).toBeTruthy()
    expect(screen.getByText('Yards: 165')).toBeTruthy()
    expect(screen.getByText('Hole 9')).toBeTruthy()
    expect(screen.getByText('Yards: 248')).toBeTruthy()
    expect(screen.getByText('Par: 4')).toBeTruthy()

    expect(container.getElementsByClassName('hole').length).toBe(9)
  })

  it('should render round data when viewing round data', () => {
    const { container } = render(
      <HolesCard
        holes='[{"hole":"1","par":3,"shots":1},{"hole":"2","par":3,"shots":2},{"hole":"3","par":3,"shots":3},{"hole":"4","par":3,"shots":4},{"hole":"5","par":3,"shots":5},{"hole":"6","par":3,"shots":6},{"hole":"7","par":3,"shots":7},{"hole":"8","par":3,"shots":8},{"hole":"9","par":4,"shots":9}]'
        existingRound={true}
      />
    )

    expect(screen.getByText('Hole 1')).toBeTruthy()
    expect(screen.getByText('Shots: 1')).toBeTruthy()
    expect(screen.getByText('Hole 9')).toBeTruthy()
    expect(screen.getByText('Shots: 9')).toBeTruthy()

    expect(container.getElementsByClassName('hole').length).toBe(9)
  })
})