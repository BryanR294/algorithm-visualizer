import './App.css'
import { useState} from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  const [arraySize, setArraySize] = useState<number>(10);
  const [sortingSpeed, setSortingSpeed] = useState<number>(1);
  const [list, setList] = useState<number[]>([1,2,3,4,5]); 

  const handleArraySize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArraySize(Number(event.target.value));
    randomizeList();
  } 
  const handleSortingSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortingSpeed(Number(event.target.value));
  }
  
  const randomizeList = () => {
    const newList: number[] = [];
    for(let i = 0; i < arraySize; i++){
      //random distribution is [0,101), floor makes it [0,100] 
      newList[i] = Math.floor(Math.random() * 101);
    }
    setList(newList);
    console.log(newList);
  }

  //most basic and intuitive sorting, O(n^2)
  const selectionSort = () => {
    const sortedList: number[] = [...list];
    for(let i = 0; i < arraySize; i++){
      let currentMinimum: number = sortedList[i];
      for(let j = i+1; j < arraySize; j++){
        if(currentMinimum > sortedList[j]){
          currentMinimum = sortedList[j];
          sortedList[j] = sortedList[i];
          sortedList[i] = currentMinimum;
        }
      }
    }

    console.log(sortedList);
    setList(sortedList);
  }
  return (
    <>
      <div>
        <title> Algorithm Visualizer</title>
        <div className="UI">
          <label htmlFor="array-size"> Array Size: </label>
          <input type="range" name="array-size" min="5" max="20" step="1" defaultValue={arraySize} onChange={handleArraySize}/>
          <label htmlFor="sorting-speed"> Sorting Speed</label> 
          <input type="range" name="sorting-speed" min=".25" max="2" step=".25" defaultValue={sortingSpeed}/> 
          <button onClick={randomizeList}> Generate List </button>
          <button onClick={selectionSort}> Sort List </button>
          <select/>
        </div>
      </div>

    </>
  )
}


export default App
