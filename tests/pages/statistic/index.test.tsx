import { render } from '@testing-library/react'
import StatisticPage from 'pages/statistic'

describe('Statistic', () => {
  it('renders without crashing', () => {
    const page = render(<StatisticPage />)
    expect(page).toBeTruthy()
  })
})