console.log("Hello World");
let list: number[] = [];
let listSize: number = 0;

console.log(list);

listSize = 10;

createRandomIntegerList(list, listSize);

console.log(list);
list = mergeSort(list);
console.log(list);

function createRandomIntegerList (list, maxSize){
    for(let i = 0; i < maxSize; i++){
        //random distribution is [0,101), floor makes it [0,100] 
        list[i] = Math.floor(Math.random() * 101);
    }
}

function quickSort(){
    
}

function bubbleSort(){

}

function insertionSort(){

}

//recursive sorting algorithm
//Worst Case: O(nlogn)
function mergeSort(list){
    if(list.length == 1){
        return list
    }

    let firstHalf: number[] = list.slice(0,list.length/2);
    let secondHalf: number[] = list.slice(list.length);
    
    firstHalf = mergeSort(firstHalf);
    secondHalf = mergeSort(secondHalf);

    return merge(firstHalf, secondHalf);
}

//helper merge function
function merge(firstHalf, secondHalf){
    let sortedArray: number[] = [];

    while((firstHalf.length > 0) && (secondHalf.length > 0)){
        if(firstHalf[0] > secondHalf[0]){
            sortedArray.push(secondHalf[0]);
            secondHalf.pop(0);
        }
        else{
            sortedArray.push(firstHalf[0]);
            firstHalf[0].pop(0);
        }
    }

    //By this point, one of the arrays are empty
    while(firstHalf.length > 0){
        firstHalf.pop(0);
        sortedArray.push(0);
    }

    while(secondHalf.length > 0){
        secondHalf.pop(0);
        sortedArray.push(0);
    }
    
    return sortedArray;
}