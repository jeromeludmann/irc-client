import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

jest.spyOn(Date, 'now').mockImplementation(() => 1536211245164)
jest.spyOn(console, 'log').mockImplementation(() => undefined)

expect.addSnapshotSerializer({
  test: val => typeof val === 'function' && val.name,
  print: val => `"${val.name}"`,
})
