import React, { useState, useEffect, useRef } from 'react';
import './SortVisualizer.css';
import { animateQuickSort } from '../algorithms/QuickSort';
import { animateInsertionSort } from '../algorithms/InsertionSort';
import { animateMergeSort } from '../algorithms/MergeSort';
import { getSliderValue } from '../Slider.js';

const ARR_LEN = 100;
const MIN_SIZE = 5;
const MAX_SIZE = 80;
const COMPARISON_COLOR = 'turquoise';
const COLOR_AFTER_SORT = 'green';

var SORT_SPEED = getSliderValue();

export function setSortSpeed(val){
  SORT_SPEED = val; 
}
export function getSortSpeed(){
  return SORT_SPEED;
}

export function swap(array, x, y) {
  const temp = array[x];
  array[x] = array[y];
    array[y] = temp;
}

export default function SortVisualizer(props) {

  /* define hooks for stateful logic to handle conditional animations/updates */
  const [array, setArray] = useState([]);  
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const containerRef = useRef(null);

  useEffect(initializeArray, []);

  function initializeArray() {
    
  /* Array only resets after a sorting operation completes (in its entirety) */

    if (isSorting) return;
    if (isSorted) resetColor();
    setIsSorted(false);
    const array = [];
    for (let i = 0; i < ARR_LEN; i++) {
      array.push((MAX_SIZE - MIN_SIZE) * (i / ARR_LEN) + MIN_SIZE);
    }
    randomize(array);
    setArray(array);
  }

  function mergeSort() {

    const anims = animateMergeSort(array);
    animateUpdate(anims);
  }

  function insertionSort() {

    const anims = animateInsertionSort(array);
    animateUpdate(anims);
  }

  function quickSort() {
    
    const anims = animateQuickSort(array);
    animateUpdate(anims);
  }

  function animateUpdate(anims) {

    if (isSorting) return;
    setIsSorting(true);
    anims.forEach(([comparison, swapped], index) => {
      setTimeout(() => {
        if (!swapped) {

          if (comparison.length === 2) {

            const [i, j] = comparison;
            animateComparison(i);
            animateComparison(j);

          } else {

            const [i] = comparison;
            animateComparison(i);
          }

        } else {
          
          setArray((prevArray) => { // simulate changing the position of an element
            const [k, newValue] = comparison;
            const newArray = [...prevArray];
            newArray[k] = newValue;
            return newArray;

          });
        }
      }, index * SORT_SPEED);
    });
    setTimeout(() => {
      animateSorted();
    }, anims.length * SORT_SPEED);
  }

  function animateComparison(idx) {

    const arrayBars = containerRef.current.children;
    const arrayBarStyle = arrayBars[idx].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = COMPARISON_COLOR;
    }, SORT_SPEED);
    setTimeout(() => {
      arrayBarStyle.backgroundColor = '';
    }, SORT_SPEED * 2);
  }

  function animateSorted() {
    
    /* Smooth color transition animation for a completed sort operation. */

    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      setTimeout(
        () => (arrayBarStyle.backgroundColor = COLOR_AFTER_SORT),
        i * SORT_SPEED, // 
      );
    }
    setTimeout(() => {
      setIsSorted(true);
      setIsSorting(false);
    }, arrayBars.length * SORT_SPEED);
  }

  function resetColor() {

    /* If sorting operation ongoing, resets and continues to sort the newly generated array. */

    const arrayBars = containerRef.current.children;
    for (let i = 0; i < array.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      arrayBarStyle.backgroundColor = '';
    }
   
  }

  return (

    <div className="visualizer-container">
      <div className="array-container" ref={containerRef}>
        {array.map((barVal, index) => (
          <div
            className="array-bar"
            style={{
              height: `${barVal}vmin`,
              width: `${100 / ARR_LEN}vw`,
            }}
            key={index}
          ></div>
        ))}
      </div>
      <footer className="app-footer">
        
        <ul>
          <li>
            <p style={{position: 'absolute', left: 105, bottom: 20,  color:'white'}}>Select sorting speed:</p>
          </li>
          <li>
          <p style={{position: 'absolute', left: 75, bottom: 2,  color:'white'}}>(Slide and click Reset to change)</p>
            
          </li>
          <li>
            <p style={{position: 'absolute', left: 325, bottom: 1,  color:'white'}}>{SORT_SPEED}  ms</p>
          </li>
          <li>
            <button className="app-button" onClick={initializeArray}>
              Reset  
            </button>
          </li>
          <li>
            <button className="app-button" onClick={mergeSort}>
              Merge sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={quickSort}>
              Quick sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={insertionSort}>
              Insertion sort
            </button>
          </li>
        </ul>
      </footer>
    </div>
  );
}

const randomize = (array) => {

  for (let i = array.length - 1; i >= 0; i--) {
    const rndIdx = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[rndIdx];
    array[rndIdx] = temp;
  }
};
