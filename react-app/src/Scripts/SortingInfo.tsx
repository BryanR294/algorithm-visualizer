import React from 'react'
import '../CSS/SortingInfo.modules.css'
const SortingInfo = () => {
    return(
        <div className="wrapper">
            <ul className='black-bg'>
                <li><button> Selection Sort </button></li>
                <li><button> Quick Sort </button></li>
                <li><button> Merge Sort </button></li>
                <li><button> Tim Sort </button></li>
            </ul>
            <button id="reveal-buttons">
                Reveal
            </button>
        </div>
    )
}

export default SortingInfo;