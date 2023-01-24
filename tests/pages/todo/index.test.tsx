import { render } from '@testing-library/react'
import ToDoPage from 'pages/todo'
import { Provider } from 'react-redux'
import { store } from 'store'

describe('Todo', () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });

  it('renders without crashing', () => {
    const page = render(<Provider store={store}> <ToDoPage /></Provider>)
    expect(page).toBeTruthy()
  })
})