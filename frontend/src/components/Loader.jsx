import { Oval } from 'react-loader-spinner'
import './Loader.css'

const Loader = () => {
  return (
    <div className='loader'>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}

export default Loader
