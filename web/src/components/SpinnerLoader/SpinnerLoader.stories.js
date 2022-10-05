// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <SpinnerLoader {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import SpinnerLoader from './SpinnerLoader'

export const generated = () => {
  return <SpinnerLoader />
}

export default {
  title: 'Components/SpinnerLoader',
  component: SpinnerLoader,
}
