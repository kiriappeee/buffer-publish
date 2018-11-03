import 'babel-polyfill';
import { configure } from '@storybook/react'

const req = require.context(__PACKAGES__, true, /components\/.*\/*story\.jsx$/)
const loadStories = () => req.keys().forEach(req)
configure(loadStories, module)
