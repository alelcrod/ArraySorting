/**
 * Alexandra Rodriguez
 */

/**
 * create the variable theArray which will be the array that is generated
 * create & set variables compNs & swapNs to zero. these will be used to keep track of the # of comparisions & swaps made
 */
var theArray;
var compNs = 0;
var swapNs = 0;


/**
 * formatArray FUNCTION
 *
 * purpose: array must be formatted in order to be printed properly
 *
 * Preconditions: array is not empty
 * 
 *
 * Postconditions: a formatted string version of the array is generated
 *
 * NOTE: this code is similar to the in class exercise...however it is slightly different
 *
 * this function is needed for all arrays that are going to be implemented into the html
 *
 */
function formatArray(someArray) {
    var formatted = "";
    
    for (var i=0; i<someArray.length; i++) {
        
        formatted += someArray[i];
        
        // if there is another number after current, then add ", " to the end
        if (i<someArray.length-1) {
            formatted += ", ";
        }
    }
    return formatted;
}



/**
 * genArray FUNCTION
 *
 * Preconditions: n is a non-zero, positve integer (greater than zero)
 *
 * Postconditions: an array of size, with n randomly generated elements
 * 
 **/
function genArray( n ) {
    // create an empty array that will be filled with randomly generated integers
    var generatedArray = [];
    
    // use Math.random() to generate a random integer, multiplied by n then added by 1 so values range from 1 to n
    // use Math.floor() to round the number down
    // fill empty array 
    for (var i=0; i<n; i++) {
      generatedArray[i]= Math.floor(Math.random()*n)+1;
   }
   return generatedArray;
}



/**
 * copyArray FUNCTION
 *
 * purpose: when sorting an array, it is desired to maintain the original array
 * because of this it is imperative to make a copy of the orginial array
 * this copy is the array that will be sorted later on.
 * by making a copy, this allows other sort methods to be used on the same array
 *
 * Preconditions: the original array is of size
 *
 * Postconditions: returns a new array that is a copy of an array
 * any alterations done to new array will not effect the original array
 *
 * NOTE: this function was taken from the in class assignment
 *
 * this function will be used later on for both sort methods
 * 
 **/
function copyArray(originalArray) {
    /* create an empty array with the same size as the original array */
    copiedArray = Array(originalArray.length);
    
    /* fill the empty array with the same values as the original array */
    for (var i=0; i<originalArray.length; i++) {
        copiedArray[i] = originalArray[i];
    }
    return copiedArray;
}








/**
 * finMin FUNCTION
 *
 * Preconditions: array is not empty, i is an index that is in the array
 *
 * Postconditions: find index of the location at contains the min value in array given the starting index
 *
 **/
function findMin(i, anArray) {
    var currentI = i;
    var compI = currentI +1;

    do {
        if (anArray[compI]<anArray[currentI]) {
            currentI = compI;
        }
        compI++;
        compNs = compNs + 1;
    }
    while (compI<anArray.length);
    
    return currentI;
}



/**
 * swap FUNCTION
 * 
 * Precondtions: both indexes to and from are in the array, array is not empty
 *
 * Postconditions: value in location "to" of array switched with value in location "from" of array
 *
 **/
function swap(to, from, anArray) {
    // temp variable that holds initial element in "to" position
    var toElement = anArray[to];
  
    // reassign values
    anArray[to]= anArray[from];
    anArray[from]= toElement;
  
    return anArray;
}



// genArrayDO FUNCTION

/**
 * Preconditions:
 * user has chosen an integer between 5 and 1000
 *
 * Postcondtions:
 * data boxes are now visible
 * an array with the size of N (provided by user) is generated
 *
 */
function genArrayDO() {
    var N = parseInt(document.getElementById("size").value);
    
    var visElements = document.getElementsByClassName("visChange");
    for (var i=0; i<visElements.length; i++) {
        visElements[i].style.visibility = "visible";
    }
    
    theArray = genArray(N);
    
    
    
    document.getElementById("original").innerHTML= formatArray(theArray);
}




// selectSort FUNCTION

/**
 * Preconditions:
 * array has already been generated
 *
 * Postconditions:
 * array is sorted using selection sort method & displayed
 * stats about number of comparisions and number of swaps computed & displayed
 *
 */

function selectSort() {
    // first, make copy of the generated array so array is not overwritten
    var sortedArray = copyArray(theArray);
    
    document.getElementById("new").innerHTML = sortedArray;
    document.getElementById("method").innerHTML = "Selection Sort";
    
    // set # of comparisions and swaps to zero
    compNs = 0;
    swapNs = 0;
    
    for (var i=0; i<sortedArray.length-1; i++) {
        index= findMin(i, sortedArray);
        if (index != i) {
            sortedArray = swap(i, index, sortedArray);
            swapNs = swapNs+1;
        }
    }
    
    document.getElementById("new").innerHTML = formatArray(sortedArray);

    document.getElementById("comps").innerHTML = "Number of Comparisons: " + compNs;
    document.getElementById("swaps").innerHTML = "Number of Swaps: " + swapNs;
    document.getElementById("method").innerHTML = "using the selection sort method";
    
    
    
}

// insertSort FUNCTION

/**
 * Preconditions: an array has been generated
 *
 * Postconditions:
 * array sorted using insertion sort method & array is displayed
 * number of comparisions and swaps computed & displayed
 *
 */
function insertSort() {
    // first, make copy of the generated array so array is not overwritten
    var sortedArray = copyArray(theArray);
    
    // set # of comparisions and swaps to zero
    compNs = 0;
    swapNs = 0;
    
    
    for (var i=1; i<sortedArray.length; i++) {
        // value that is being examined
        vInsert = sortedArray[i];
        // index of examined value
        pInsert = i;
        
        while (pInsert>0 && sortedArray[pInsert-1]>vInsert) {
            // note: this is not considered a swap (theyre puedo insertions...copies)
            sortedArray[pInsert] = sortedArray[pInsert-1];
            pInsert--;
            compNs = compNs+1;
        }
        
        // perform final swap if nesessary & add to swap count
        if (i != pInsert) {
            sortedArray[pInsert] = vInsert;
            swapNs = swapNs+1;
        }
       
    }
    
    document.getElementById("new").innerHTML = formatArray(sortedArray);

    document.getElementById("comps").innerHTML = "Number of Comparisons: " + compNs;
    document.getElementById("swaps").innerHTML = "Number of Swaps: " + swapNs;
    document.getElementById("method").innerHTML = "using the insertion sort method";
    
}


// bubbleSort FUNCTION

/**
 * Preconditions:
 * array has already been generated
 *
 * Postconditions:
 * array is sorted using bubble sort method & displayed
 * stats about number of comparisions and number of swaps computed & displayed
 *
 */

function bubbleSort() {
    // first, make copy of the generated array so array is not overwritten
    var sortedArray = copyArray(theArray);
    
    // set # of comparisions and swaps to zero
    compNs = 0;
    swapNs = 0;
    
    lastI = sortedArray.length-1;
    
    while(lastI > 0) {
        for (var i=0; i<lastI; i++) {
            if (sortedArray[i] > sortedArray[i+1]) {
                sortedArray = swap(i, i+1, sortedArray);
                swapNs = swapNs+1;
            }
            compNs = compNs+1;
        }
        lastI = lastI-1;
    }
    
    document.getElementById("new").innerHTML = formatArray(sortedArray);

    document.getElementById("comps").innerHTML = "Number of Comparisons: " + compNs;
    document.getElementById("swaps").innerHTML = "Number of Swaps: " + swapNs;
    document.getElementById("method").innerHTML = "using the bubble sort method";
    
    
    
}
