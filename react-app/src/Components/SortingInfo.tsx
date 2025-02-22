import React from 'react'
import '../Static/SortingInfo.css'
const SortingInfo: React.FC  = () => {

    const toggleSortingInfo = () => {
        document.getElementById("SortingInfo-ul")
    } 

    return(
        <div id="SortingInfo-container">
            <ul id="SortingInfo-ul">
                <li><button className="text"> Selection Sort </button></li>
                <li><button className="text"> Quick Sort </button></li>
                <li><button className="text"> Merge Sort </button></li>
                <li><button className="text"> Tim Sort </button></li>
            </ul>
            <button id="reveal-buttons">
                →
            </button>
        </div>
    )
}

export default SortingInfo;