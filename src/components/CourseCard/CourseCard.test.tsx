/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CourseCard from './index'

describe('<CourseCard />', () => {
  it('should render corse data', () => {
    render(
      <MemoryRouter>
        <CourseCard
          course={{
            name: 'Test course',
            holes: 9,
            par: 28,
            yards: 1000,
            holesData: '[{"hole":1,"yards":106,"par":3},{"hole":2,"yards":165,"par":3},{"hole":3,"yards":79,"par":3},{"hole":4,"yards":118,"par":3},{"hole":5,"yards":86,"par":3},{"hole":6,"yards":121,"par":3},{"hole":7,"yards":100,"par":3},{"hole":8,"yards":106,"par":3},{"hole":9,"yards":248,"par":4}]',
          }}
          selected={false}
          handleCourseSelect={() => {}}
        />
      </MemoryRouter>
    )

    expect(screen.getByText('Test course')).toBeTruthy()
    expect(screen.getByText('9 holes')).toBeTruthy()
    expect(screen.getByText('Par: 28')).toBeTruthy()
  })

  it('appends a class when it is the selected course', () => {
    const { container } = render(
      <MemoryRouter>
        <CourseCard
          course={{
            name: 'Test course',
            holes: 9,
            par: 28,
            yards: 1000,
            holesData: '[{"hole":1,"yards":106,"par":3},{"hole":2,"yards":165,"par":3},{"hole":3,"yards":79,"par":3},{"hole":4,"yards":118,"par":3},{"hole":5,"yards":86,"par":3},{"hole":6,"yards":121,"par":3},{"hole":7,"yards":100,"par":3},{"hole":8,"yards":106,"par":3},{"hole":9,"yards":248,"par":4}]',
          }}
          selected={true}
          handleCourseSelect={() => {}}
        />
      </MemoryRouter>
    )

    expect(container.getElementsByClassName('selected').length).toBe(1)
  })
})