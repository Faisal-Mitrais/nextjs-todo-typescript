import { render } from '@testing-library/react'
import HomePage from 'pages/home'

describe('Home', () => {
  it('renders without crashing', () => {
    const page = render(<HomePage />)
    expect(page).toBeTruthy()
  })
})