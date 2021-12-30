import { render } from '@testing-library/react'
import AboutPage from 'pages/about'

describe('About', () => {
  it('renders without crashing', () => {
    const page = render(<AboutPage />)
    expect(page).toBeTruthy()
  })
})