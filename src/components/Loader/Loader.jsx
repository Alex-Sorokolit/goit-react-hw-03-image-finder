import { Blocks } from 'react-loader-spinner';
import './Loader.css';
const Loader = () => {
  return (
    <Blocks
      visible={true}
      height="80"
      width="80"
      // ariaLabel="blocks-loading"
      wrapperClass="blocks-wrapper"
    />
  );
};

export default Loader;
