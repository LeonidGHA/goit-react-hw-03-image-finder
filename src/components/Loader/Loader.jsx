import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';
function Loader() {
  return (
    <div className={css.center}>
      <ThreeCircles
        height="100"
        width="100"
        color="mediumpurple"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
}

export default Loader;
