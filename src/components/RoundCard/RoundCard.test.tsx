/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

import { render, screen } from '@testing-library/react'
import RoundCard from './index'

describe('<RoundCard />', () => {
  it('should render round data', () => {
    render(
      <RoundCard
        round={{
          id: '123',
          course: 'Test course',
          date: new Date(),
          holesData: '[{"hole":"1","par":3,"shots":2},{"hole":"2","par":3,"shots":2},{"hole":"3","par":4,"shots":2}]',
          score: 111
        }}
        handleRoundSelect={() => {}}
        selected={false}
        handleDeleteRound={() => {}}
      />
    )

    expect(screen.getByText('Course: Test course')).toBeTruthy()
    expect(screen.getByText('Score: 111')).toBeTruthy()
  })

  it('appends a class when it is the selected round', () => {
    const { container } = render(
      <RoundCard
        round={{
          id: '123',
          course: 'Test course',
          date: new Date(),
          holesData: '[{"hole":"1","par":3,"shots":2},{"hole":"2","par":3,"shots":2},{"hole":"3","par":4,"shots":2}]',
          score: 111
        }}
        handleRoundSelect={() => {}}
        selected={true}
        handleDeleteRound={() => {}}
      />
    )

    expect(container.getElementsByClassName('selected').length).toBe(1)
  })
})