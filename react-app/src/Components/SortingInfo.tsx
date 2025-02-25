import React from 'react'
import { useRef } from 'react'
import '../Static/SortingInfo.css'
const SortingInfo: React.FC  = () => {

    const isToggled = useRef<boolean>(true);

    const toggleSortingInfo = () => {
        const elSortingInfo: HTMLElement = document.getElementById("SortingInfo-ul") as HTMLElement;
        const elContainer: HTMLElement = document.getElementById("SortingInfo-container") as HTMLElement;
        const elButton: HTMLElement = document.getElementById("reveal-button") as HTMLElement;
        
        if(isToggled.current){
            elSortingInfo.style.opacity = "0";
            elSortingInfo.style.width = "0";
            elContainer.style.width = "7%";
            elButton.style.width = "100%";

            isToggled.current = false;
        } else if(isToggled.current == false){
            elSortingInfo.style.opacity = "100%";
            elSortingInfo.style.width = "67%";
            elContainer.style.width = "20%";
            elButton.style.width = "33%";

            isToggled.current = true;
        }
      
    } 

    return(
        <div id="SortingInfo-container">
            <ul id="SortingInfo-ul">
                <li><button className="text"> Selection Sort </button></li>
                <li><button className="text"> Quick Sort </button></li>
                <li><button className="text"> Merge Sort </button></li>
                <li><button className="text"> Tim Sort </button></li>
            </ul>
            <button onClick={() => {toggleSortingInfo()}} id="reveal-button">
                ←
            </button>
        </div>
    )
}

export default SortingInfo;