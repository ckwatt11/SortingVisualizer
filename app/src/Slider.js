import ReactSlider from "react-slider";
import {useState} from 'react';
import {getSortSpeed, setSortSpeed} from './sortVisualizer/SortVisualizer.jsx';




export function getSliderValue(){
  return Slider.value;
}

const Slider = () => {

  const [currentValue, setCurrentValue] = useState(1); // hook to track slider's value; initialize to atleast 1 ms sort speed.
  setSortSpeed(currentValue); 

  return (
    <ReactSlider
    className="customSlider"
    trackClassName="customSlider-track"
    thumbClassName="customSlider-thumb"
    markClassName="customSlider-mark"
    marks={5}
    min={1}
    max={50}
    defaultValue={1}
    value={currentValue}
    onChange={(value) => setCurrentValue(value)}
    
    renderMark={(props) => {
    if (props.key < currentValue) {
      props.className = "customSlider-mark customSlider-mark-before";
    } else if (props.key === currentValue) {
      props.className = "customSlider-mark customSlider-mark-active";
    }
    return <span {...props} />;
   }}
    
    
   />
   
  );

};

export default Slider;
