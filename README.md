# Algorithm Visualizer Project
This project was created as both a self-guided learning experience and an educational teaching opportunity. 

I initially thought this README would be short and brief, but as I retell my learning experiences I realize that detailing my work will help others better understand my code and the decisions I've made.
This was because the UI is really intuitive and purposely kept minimal. However, the project itself can be pretty technical for those unfamiliar to React, such as I once was.

I'll go over:
1. The website and its UI along with any quirks.
2. The tools I used to create this website for those looking to learn or replicate something similar for their own learning.
3. Challenges I faced while working on this project.

## How to Use
When you open the website a random array will already be generated and visualized on screen. 

<img width="1548" height="621" alt="image" src="https://github.com/user-attachments/assets/1a70ae16-c4a4-4e3b-ad5a-349066f8075d" />


Using the website should be pretty self-explanatory: 
- You can randomly generate a new array using "generate list" button.
- You can change array size via slider
- You can change sorting speed via slider
- You can sort the array using the "selection sort" button.

<img width="555" height="404" alt="Animation" src="https://github.com/user-attachments/assets/517e0911-91da-4b01-a1e2-0f5ac12e2f0f" />

*animation of graph sorting*

## Features
- Anytime a change is made to the array (whether it's updating its size, creating a new array, or sorting the array) the program will automatically update its visual to reflect your changes. In other words, the array
will always try to be in sync with the visual.
- Selection sort is a nested loop sorting algorithm. Because of this, I added some color to the visual to help users distinguish the outer and inner for-loops. The current index of the outer loop is represented in
**orange** while the current index of the inner loop is represented in **purple**.
- Sorting the array hides other UI elements to prevent any issues, such as changing array size while current array is sorting.
- There is a stopwatch feature to help you understand the speed of selection sort. The stopwatch feature resets every time you restart the sort, meaning hitting "stop sort" will reset stopwatch time to zero,
- Stopwatch is also affected by sorting speed.
- Array speed slider uses steps of .25 because the assumption is users want to see an algorithm sort "fast vs slow" rather than ".1s delay vs .2s", this feature was added for user convenience. 

## Architecture
This project uses a React + TypeScript front-end with a Python backend. In terms of data flow the project follows this process:

1. Frontend handles user input that may affect array 
2. Array update is detected 
3. Array is sent to backend, along with any pivots 
4. Backend receives array 
5. Backend creates a visual based on array and its pivots
6. Visual is encoded as JSON data 
7. JSON is sent to frontend to be decoded 
8. Frontend displays visual based on decoded backend JSON. 

It feels simple to look at the data flow now, but when I first started the project I had zero idea how to implement _any_ of these steps. Besides knowing the basics of Javascript and Python, everything utilized in this 
project was learned on-the-go. I wanted to share my experiences and takeaways as I learned how each library worked. 

### Frontend
The project was made using a React + TypeScript front-end. As stated earlier, this was my first time using React.
There were two reasons I chose to use React:
- React is a popular, in-demand skill in the current industry. 
- Its single-page architecture was really useful for my project specifically because I wanted my program to update dynamically instead of re-directing users to different pages.

If I were to be honest, my initial drive to learn React was because it was popular and seemed like a necessary step to my career. At the time, React seemed like an overly complicated ecosystem with convoluted files 
as I was used to creating simple webpages using vanilla HTML, CSS and JavaScript. Now I understand _why_ React is so useful. Understanding the advantages of a dynamic one page application and discovering components 
can re-render only affected elements was a game changer. Now I _want_ to use React for all my future projects because it helped me create a project that I find more efficient and professional with added ease of coding. 

I was already familiar with HTML, CSS, JavaScript, and more uniquely, Java. I decided to learn TypeScript because it felt like a natural transition from Java whilst also allowing for a more structured code with higher type safety, all of which helped me catch errors during development. The Typescript front-end handles everything to do with the array apart from visualizing it. One unique thing I learned is that you can assign multiple types to a variable using the "|" operator. This was a big takeaway for me because I thought Typescript was more rigid in how it handled typing. For example, I had to assign my "useGraph" two types: string and undefined. I initially had faced bugs because I was trying to initially define my JSON data as just a string when the backend could possibly return undefined. 

### CSS
Stylization was intentionally kept minimal in my project because my focus point was functionality. In other personal projects I spent a great deal of time learning stylization which delayed development time. Just like in
the same way I learned React to improve my skillset, I do hope to eventually learn Tailwind CSS to see if it can help improve my CSS efficiency so that I may some UX design in future projects. Despite its minimalism I
did learn some new things in this project:
- CSS custom properties (:root variables) for colors
- how React components interact with CSS 
- Though not utilized in this project, I learned about other CSS options like CSS modules and Tailwind. These options felt overkill for my project but they were researched and considered.

### Components
Because I was learning React from scratch, I had to learn how React handles re-rendering components. This was actually really frustrating at first because it felt like React wasn't updating its components
the way I wanted it too. That's when I learned the caveats of different React hooks. For example, some React hooks like __useState__ aren't updated in the current rendering cycle, which would cause problems by displaying old information because the hook hadn't finished executing. I also learned that re-rendering caused from hooks was a separate, asynch, action. Understanding small things like this really gave me an intimate understanding
of how React works and it allowed me to write code that avoided bugs.

### Backend
I was already familiar with the basics of Python. What I instead learned was backend development as a practice: sure, I could understand Python syntax, but does that mean I know how to set up a server that communicates with a frontend through endpoints? This includes learning to set up a server using CORS, handling POST requests and JSON whilst gaining exposure to libraries like Flask, Seaborn and Matplotlib.

The reason I chose Python specifically is because I knew it was the go-to for data. All of the visuals in this project are generated using __Matplotlib__. This exposed me to the world of data visualization using Python libraries like Matplotlib and Seaborn. 

I also learned about API endpoints and how I could use that to my advantage to send data. One challenge I faced is that APIs use JSON to communicate. Since the purpose of the project was to send images to the front-end, I had to learn to serialize image data into a JSON transferrable format, which would later be displayed as an image again. I also had to learn to make two different endpoints to distinguish between the initial colorless graph made for every fresh array versus the colored graph you get when you begin to sort data.

I learned a lot about full stack development as a whole from Python. 

## Takeaway
This project was initially a "learn React" project but it became so much more. I learned full-stack communication with a working CORS Python backend server built to communicate wtih a React + Typescript front-end. I learned the basics of APIs, endpoints, JSON and how to encode images for data transfer. I learned how to create meaningful visualizations from real-user input. I learned fundamental React skills such as hooks and components, along with its syntax. Before this project, I would only need 3 files: index.html, styles.css, index.js. 
Now I've learned to not become underwhelm by Visual Studios when looking at my file hierarchy.
<img width="172" height="665" alt="image" src="https://github.com/user-attachments/assets/7df6e0d2-1e10-4214-bf47-13d80dd616d1" />

This project took me a long time to complete as I would have to find free-time to work on it between school and work, though I cannot undersell what I've gained from this experience. For now, this project will be kept as a proof of concept rather than a complete, all-encompassing educational tool as there are now other projects and endeavors I wish to pursue instead. I hope to one day return to this project and expand on the vision I once had.

Thank you for reading and enjoy my website.
