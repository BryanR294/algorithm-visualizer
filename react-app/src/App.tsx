import './App.css'
import { useState, useEffect} from 'react'
import React from 'react'

function App() {
  const [arraySize, setArraySize] = useState<number>(10);
  const [sortingSpeed, setSortingSpeed] = useState<number>(1);
  const [list, setList] = useState<number[]>([1,2,3,4,5]);
  //Graph represented as an encoded string 
  const [graph, setGraph] = useState<string | undefined>(undefined);
  
  //Python backend communication
  const fetchGraph = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/data");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Parse JSON from the response
      setGraph(`data:image/png;base64,${data.image}`)
      console.log("Graph fetched successfully")
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sendArrayToBackend = async (array: number[]) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ array }), // Example payload
      });
      
      const result = await response.json();
      console.log("Processed Data from Backend:", result);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };
  



  
  //Updates array size, and randomizes new array for that size
  const handleArraySize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArraySize(Number(event.target.value));
    randomizeList();
  }
  
  //changes speed at which program sorts array
  const handleSortingSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortingSpeed(Number(event.target.value));
  }
  
  //creates random list
  const randomizeList = () => {
    const newList: number[] = [];
    for(let i = 0; i < arraySize; i++){
      //random distribution is [0,101), floor makes it [0,100] 
      newList[i] = Math.floor(Math.random() * 101);
    }
    setList(newList);
    console.log(`Randomly generated array: ${newList}`);
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

  useEffect(() => {
    randomizeList();
  }, []);

  useEffect(() => {
    if (list.length !== 5) {
      console.log(`Current list variable: ${list}`);
      sendArrayToBackend(list);
      fetchGraph();
    }
  }, [list]);

  return (
    <>
      <div>
        <title> Algorithm Visualizer</title>
        <div id="UI">
          <label htmlFor="array-size"> Array Size: </label>
          <input type="range" name="array-size" min="5" max="30" step="1" defaultValue={arraySize} onChange={handleArraySize}/>
          <label htmlFor="sorting-speed"> Sorting Speed</label> 
          <input type="range" name="sorting-speed" min=".25" max="2" step=".25" defaultValue={sortingSpeed} onChange={handleSortingSpeed}/> 
          <button onClick={randomizeList}> Generate List </button>
          <button onClick={selectionSort}> Sort List </button>
          <button onClick={fetchGraph}> Fetch Data</button>
          <button onClick={() => sendArrayToBackend(list)}> Send Data </button>
          <select/>
        </div>
        <img src={graph} alt="Graph Visualization"/>
      </div>

    </>
  )
}


export default App
