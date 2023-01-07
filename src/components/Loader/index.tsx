import { Oval } from 'react-loader-spinner'
import './loader.scss'

interface ILoaderProps {
  height?: number
  width?: number
}

const Loader = ({
  height = 150, 
  width = 150
}: ILoaderProps) => (
  <Oval
    height={height}
    width={width}
    wrapperClass='loader'
  />
)

export default Loader