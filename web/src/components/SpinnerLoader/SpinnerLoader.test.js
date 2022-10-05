import { render } from '@redwoodjs/testing/web'

import SpinnerLoader from './SpinnerLoader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SpinnerLoader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SpinnerLoader />)
    }).not.toThrow()
  })
})
