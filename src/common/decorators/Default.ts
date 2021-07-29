import { Transform } from 'class-transformer'

const Default = (defaultValue: any) =>
  Transform((target: any) => target ?? defaultValue)

export default Default
