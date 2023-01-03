import { Blocks } from 'react-loader-spinner';
import './Loader.css';
const Loader = () => {
  return (
    <Blocks
      visible={true}
      height="80"
      width="80"
      wrapperClass="blocks-wrapper"
    />
  );
};

export default Loader;
