import { useState, useEffect, useRef} from 'react'
import React from 'react'
import { sleep } from 'sleep-ts'

const SortingUI = () => {
    const [arraySize, setArraySize] = useState<number>(25);
    const [sortingSpeed, setSortingSpeed] = useState<number>(500);
    //Isn't actually represented on screen, worth replacing with useRef
    const [list, setList] = useState<number[]>([1,2,3,4,5]);
    //Graph represented as an encoded string 
    const [graph, setGraph] = useState<string | undefined>(undefined);
    const isSortingRef = useRef<boolean>(false);
  
     //creates random list
     const randomizeList = () => {
      const newList: number[] = [];
      for(let i = 0; i < arraySize; i++){
        //random distribution is [0,101), floor makes it [0,100] 
        newList[i] = Math.floor(Math.random() * 101);
      }
      setList(newList);
      // console.log(`Randomly generated array: ${newList}`);
    }
  
    //forces program to wait for backend
    const communicateWithBackend = async () => {
      await sendArrayToBackend(list);
      console.log("Fetching data visual from backend...");
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
      console.log("sending array to backend...")
      try {
        const response = await fetch("http://127.0.0.1:5000/api/data", {
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
      isSortingRef.current = true;
  
      console.log("SORTING");
      const sortedList: number[] = [...list];
      for(let i = 0; i < arraySize; i++){  
        if(isSortingRef.current != true){
          console.log("Sort terminated early");
          return
        };
        let currentMinimum: number = sortedList[i];
        for(let j = i+1; j < arraySize; j++){
          if(currentMinimum > sortedList[j]){
            currentMinimum = sortedList[j];
            sortedList[j] = sortedList[i];
            sortedList[i] = currentMinimum;
            console.log("updating list...");
            setList([...sortedList]);
            const speed: number = Math.abs(1000 - sortingSpeed);
            await sleep(speed);
          }
        }
      }
      console.log("Done sorting");
      console.log(sortedList);
      setList(sortedList);
      isSortingRef.current = false;
    }
    
    //Randomizes list on initial render
    useEffect(() => {
      randomizeList();
    }, []);
  
    //hides or reveals UI when algorithm is sorting
    useEffect(() => {
      const uiElements: HTMLCollectionOf<Element> = document.getElementsByClassName("hide-while-sorting");
      const elStop: HTMLElement | null = document.getElementById("stop-sort");
  
      if(isSortingRef.current === true){
        for(const item of uiElements){
          (item as HTMLElement).style.display = "none";
        }
        elStop.style.display = "inline";
      }else{
        for(const item of uiElements){
          (item as HTMLElement).style.display = "inline";
        } 
        elStop.style.display = "none";
      }
    }, [isSortingRef.current]);
  
    useEffect(() => {
      console.log("Detected list change");
      communicateWithBackend();
    }, [list]);
  
    return (
      <>
        <div>
          <title> Algorithm Visualizer</title>
          <div>
            <label htmlFor="array-size"> Array Size: </label>
            <input className="hide-while-sorting" type="range" name="array-size" min="5" max="50" step="1" defaultValue={arraySize} onChange={handleArraySize}/>
            <label htmlFor="array-size"> {arraySize} </label>
            <label htmlFor="sorting-speed"> Sorting Speed</label> 
            <input className="hide-while-sorting" type="range" name="sorting-speed" min="250" max="1000" step="250" defaultValue={sortingSpeed} onChange={handleSortingSpeed}/> 
            <label htmlFor="sorting-speed"> {sortingSpeed/1000}</label> 
          </div>
          <img src={graph} alt="Graph Visualization"/>
          <div>
            <button className="hide-while-sorting" onClick={randomizeList}> Generate List </button>
            <button className="hide-while-sorting" onClick={selectionSort}> Selection Sort </button>
            <button id="stop-sort" onClick={() => isSortingRef.current = false}> Stop Sort</button>
          </div>
        </div>
      </>
    )
}
 
export default SortingUI;