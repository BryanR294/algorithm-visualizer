import { useState, useEffect, useRef} from 'react'
import React from 'react'
import { sleep } from 'sleep-ts'
import SortingInfo from './SortingInfo'
import '../Static/SortingUI.css'
import { Stopwatch } from "ts-stopwatch";

const SortingUI: React.FC  = () => {
  const [arraySize, setArraySize] = useState<number>(25);
  const [sortingSpeed, setSortingSpeed] = useState<number>(500);
  //Isn't actually represented on screen, worth replacing with useRef
  // const [list, setList] = useState<number[]>([1,2,3,4,5]);
  const listRef = useRef<number[]>([1,2,3,4,5]);
  //Graph represented as an encoded string 
  const [graph, setGraph] = useState<string | undefined>(undefined);
  const isSortingRef = useRef<boolean>(false);
  const isColoredRef = useRef<boolean>(false);
  const stopwatch: Stopwatch = new Stopwatch();
  const [sortDuration, setSortDuration] = useState<number>(stopwatch.getTime());

  

    //creates random list
    const randomizeList = () => {
    const newList: number[] = [];
    for(let i = 0; i < arraySize; i++){
      //random distribution is [0,101), floor makes it [0,100] 
      newList[i] = Math.floor(Math.random() * 101);
    }
    listRef.current = newList;
    console.log(`Randomly generated array: ${listRef.current}`);
    communicateWithBackend();
  }

  //Re-renders, and logs elapsed time of sorting function
  const endSort = () => {
    isSortingRef.current = false;
    console.log(`Elapsed time: ${stopwatch.getTime()}ms`);
    setSortDuration(stopwatch.getTime());
  }

  //forces program to wait for backend
  const communicateWithBackend = async () => {
    await sendArrayToBackend(listRef.current);
    await fetchGraph();
  }

  //Updates array size, and randomizes new array for that size
  const handleArraySize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArraySize(Number(event.target.value));
    randomizeList();
  }
  
  //changes speed at which program sorts array
  const handleSortingSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortingSpeed(Number(event.target.value));
  }

  //Python backend communication
  const fetchGraph = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/array/graph");
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
  const updateBackendColors = async (currIndex: number, examinedIndex: number) => { 
    try {
      const response = await fetch("http://127.0.0.1:5000/api/array/colored-graph",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({currIndex, examinedIndex})
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("colors updated");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const fetchColoredGraph = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/array/colored-graph");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Parse JSON from the response
      setGraph(`data:image/png;base64,${data.image}`)
      console.log("Graph fetched successfully")
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const sendArrayToBackend = async (array: number[]) => {
    console.log("sending array to backend...")
    try {
      const response = await fetch("http://127.0.0.1:5000/api/array", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ array }), 
      });
      
      const result = await response.json();
      console.log("Processed Data from Backend:", result);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };
  
  //most basic and intuitive sorting, O(n^2)
  const selectionSort = async () => {
    stopwatch.start(true);
    isSortingRef.current = true;

    const sortedList: number[] = [...listRef.current];
    for(let i = 0; i < arraySize; i++){  
      if(isSortingRef.current != true){
        console.log("Sort terminated early");
        return
      }

      let currentMinimum: number = sortedList[i];
      for(let j = i+1; j < arraySize; j++){
        await sendArrayToBackend(listRef.current);
        await updateBackendColors(i,j)
        await fetchColoredGraph();
        const speed: number = Math.abs(1000 - sortingSpeed);
        await sleep(speed)
        if(currentMinimum > sortedList[j]){
          currentMinimum = sortedList[j];
          sortedList[j] = sortedList[i];
          sortedList[i] = currentMinimum;
          listRef.current = [...sortedList];
          await sendArrayToBackend(listRef.current);
          await updateBackendColors(j,i)
          await fetchColoredGraph();
          await sleep(speed*1.2);
        }
      }
    }
    
    stopwatch.stop();
    endSort();
  }
  
  //Randomizes list on initial render
  useEffect(() => {
    randomizeList();
  }, []);

  //hides or reveals UI when algorithm is sorting
  useEffect(() => {
    const uiElements: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("hide-while-sorting") as HTMLCollectionOf<HTMLElement>;
    const elStop: HTMLElement = document.getElementById("stop-sort") as HTMLElement;
    const elStopAsHTML = elStop as HTMLElement;
    if(isSortingRef.current === true){
      for(const item of uiElements){
        item.style.display = "none";
      }
      elStopAsHTML.style.display = "inline";
    }else{
      for(const item of uiElements){
        item.style.display = "inline";
      } 
      
      elStopAsHTML.style.display = "none";
    }
  }, [isSortingRef.current]);

  useEffect(() => {}, [graph]);

  return (
    <div id="app-container">
      <SortingInfo/>
      <div id="ui-wrapper">
        <title> Algorithm Visualizer</title>
        <div className="slider-ui">
          <label className="bold text" htmlFor="array-size"> Array Size: </label>
          <input className="slider hide-while-sorting" type="range" name="array-size" min="5" max="50" step="1" defaultValue={arraySize} onChange={handleArraySize}/>
          <label className="bold text" htmlFor="array-size"> {arraySize} </label>
          <label className="bold text" htmlFor="sorting-speed"> Sorting Speed</label> 
          <input className="slider hide-while-sorting" type="range" name="sorting-speed" min="250" max="1000" step="250" defaultValue={sortingSpeed} onChange={handleSortingSpeed}/> 
          <label className="bold text" htmlFor="sorting-speed"> {sortingSpeed/1000}</label>
          <p className="duration-text"> Sort Duration: {sortDuration}ms</p> 
        </div>
        <img src={graph} alt="Graph Visualization"/>
        <div className="button-ui">
          <button className="text hide-while-sorting" onClick={randomizeList}> Generate List </button>
          <button className="text hide-while-sorting" onClick={selectionSort}> Selection Sort </button>
          <button className="text stop-button" id="stop-sort" onClick={() => isSortingRef.current = false}> Stop Sort</button>
        </div>
      </div>
    </div>
  )
}

export default SortingUI;