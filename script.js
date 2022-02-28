function evaluationExpression(userInputstring) {
  console.log("The function is working," + userInputstring);

  //HOW THE ALGO WILL WORK:

  //we need to transfer our string into an array

  //Huge NOTE: we changed our program to instead of sending a string into the function
  // we send a array.
  //we will need to change alot of things in our program.
  //Task for next time:
  //Rewrite program to work with an array instead of string
  // Task progress : Not Done, Working progress Dec 7 6:20pm

  //Progress update dec 9 5:35pm. THE CALCUALTOR WORKS WE ARE DONE WITH THE LOGIC. FINALLY.
  //Need to clean up code, clean up documentation and keep adding
  //will need to see how other people do the calc project and see their methods/
  // for next time we will clean up code, by taking reapeating code and turn it into re-usable functions.
  //we reclycled code, that could have easily been used in a function.
  //wanted to brute force this project, thats why its all over the place and messy. I will make the code
  //more friendly to read. and accessible.

  // we will loop through array index

  //while (userInp)

  //we need our algorithm to run our array and look for division and multiplacation first.
  //we make search for mult and division
  //once the seach is exhausted, we search again for addition and substraction.

  for (let i = 0; i < userInputstring.length; i++) {
    console.log("seg 1 what our current index i is: " + i);
    //we will follow pendas
    //if index is mult x and divide /. it will take precedence over addition
    if (userInputstring[i] == "x" || userInputstring[i] == "/") {
      console.log("CheckPoint1: hello im in");

      //thse variables are in charge of holding what is left and right, to our mathematical operator
      //ex:
      //44 x 6
      //the left, lefthold will hold the string "44"
      //the right, righthold will hold the string "6"
      //later on these variables will be converted to number in order to evalute their respective matherical operator.
      let lefthold = "";
      let righthold = "";

      // we will take the index location of either "x" or "/"
      // and too its adjacent left and right indexes, are the contents of values that we will perform mult or divide.
      // Ex:
      // a + b
      // the left index of "+" is a, the right index is of "+" b
      // we will take the values of adjacent left and right index and perform its specified operation.
      // So we will store the solution to this operation in a sub variable
      // The array will now have empty indexes, which would be the left and right of the operator index.
      // We will have to "shink our array" or copy over to new array. To delete our empty array spaces.
      //The sub variable will need to be introduced into the array in its proper location.
      // we will continue this procedure until we are left with one array index. That will be our solution.
      //at each iteration, our array will shrink as we do operations.

      if (userInputstring[i] == "x") {
        console.log("CheckPoint2: hello im in");
        // we have the [i] index at x(mult). and to its left and right are the numeric values we will multiply.
        // We will travers to the left and right. However, there is an issue if we encounter the following
        // "23 x 4"
        //We must consider when a number will be more than 1 digits. so we will have to traverse left or right
        //until we hit the neighboring operater or empty space.
        //Ex:
        // "1 + 4 + 23 x 4 + 43"
        // so from "x" to its left, we traverse until we hit "+" to which we accumulate the digit 23
        // and to the right, we stop at "+" and accumulate digit the 4.
        //We will use isNaN() to check if string index is a numeric chacter, if not we will stop our traversing of left and right.

        //we take our index location, save it into another variable. This will be used to traverse our array left and right
        let subIndexLeft = i;
        let subIndexRight = i;
        let subOperatorLocation = i;

        let subStringL = "";
        let subStringR = "";

        //we traverse our array at each index we use isNaN() to see if string char is numeric, if its numeric we pop into a string

        //is this while loop, we begin traversing from our "x" index, to the left side. So from the left of "x" ,we begin
        //collecting our digits as we traverse left.

        // since in this case we traversing from left to  left we will need to reorganize the string.
        while (!isNaN(userInputstring[subIndexLeft - 1])) {
          subStringL += userInputstring[subIndexLeft - 1];
          //string will be in reversed formed. We will have to reverse to normal

          //update note: we no longer pass a string to our evaluationExpression funtion. We pass an array.
          // so when we traverse to the left, we no longer traverse by single char. We have our digits properly indexed
          // ex: in a string we would have 77x3
          //every index in a string would be, "7", "7", "x", "3"
          //Since we converted to array and properly placed our digits in their indexes
          // our indexes would be "77","x", "3"
          //This allows us to properly work with larger than 1 digits.
          //and since we no longer work with a pure string, but converted to array(with proper digit grouping)
          //we no longer need to reverse our string as we move to left.
          // before our string moving left, would collect
          //ex: 54x9
          // "4","5"
          //instead of getting 54, we would get "45"
          //hence why we would need to reverse

          // with our array organized with proper digit grouping, we dont need to reverse. since digit is properly grouped
          // and indexed.

          console.log(
            "what Im looking for now: " + userInputstring[subIndexLeft - 1]
          );
          //the index that is traversed is deleted in the array
          userInputstring[subIndexLeft - 1] = null;
          console.log(
            "After Im looking for now: " + userInputstring[subIndexLeft - 1]
          );

          console.log("before the reverse of subStringL: " + subStringL);

          //Update: No longer need to reverse our string and reorder our subStringL. see above for why.
          /*
          //we will split our string into an array
          let splitString = subStringL.split("");
          //then we reverse our array
          let reverseArray = splitString.reverse();
          //finally we join the array into a string and our initial string is now reversed.
          let joinArray = reverseArray.join("");
            */

          console.log(" 3 This is a check point. subStringL = " + subStringL);
          lefthold = subStringL;
          subIndexLeft--;
        }

        //This while loop will traverse the right side of the mathematical operator.
        //for the right we must check if next space over is a digit and not a null. Or else null will be saved in our string
        //and a bug will present itself where our digit allong with null will not be converted to numbers. and be a NaN
        while (
          !isNaN(userInputstring[subIndexRight + 1]) &&
          userInputstring[subIndexRight + 1] != null
        ) {
          subStringR += userInputstring[subIndexRight + 1];

          userInputstring[subIndexRight + 1] = null;

          console.log("4 This is a check point. subStringR = " + subStringR);
          righthold = subStringR;
          subIndexRight++;
        }

        //now we calculate our segment.
        // we will have to convert our strings into numeric and perform multiplication.

        let leftnum = Number(lefthold);
        let rightnum = Number(righthold);
        //now we mult
        let solu = String(leftnum * rightnum);

        console.log("5:  " + solu);
        console.log("6: " + subOperatorLocation);
        // now we will sub in our solution to the multiplier expression.
        // the mult expression would be at index i

        // no longer use since, we our userInputstring has been changed to an array and longer a string
        //userInputstring = userInputstring.split("");

        userInputstring[subOperatorLocation] = solu;
        console.log("7: " + userInputstring[subOperatorLocation]);

        // no longer use since, we our userInputstring has been changed to an array and longer a string
        //userInputstring = userInputstring.join("");

        console.log("8 This is where solution is put " + userInputstring);

        //now we re-copy our array to a sub

        let subarray = [];
        let j = 0;
        for (let i = 0; i < userInputstring.length; i++) {
          if (userInputstring[i] != null) {
            subarray[j] = userInputstring[i];
            j++;
          }
        }

        console.log("contents of Subarray:" + subarray);

        //now we re-copy our sub array to our main array

        console.log("before we copy Subarray:" + userInputstring);

        //we will delete array userInputstring

        for (let i = 0; i < userInputstring.length; i++) {
          userInputstring[i] = null;
        }

        //after we delete array
        console.log("after we delete array: " + userInputstring);

        for (let i = 0; i < subarray.length; i++) {
          userInputstring[i] = subarray[i];
        }

        // we will now see if it works

        console.log("9: " + userInputstring);
        console.log("what our current index i is: " + i);

        //we need to reset our iterator to zero, since we want our for loop to rescan our array and perform another pass
        //looking for an expression to evaluate.
        i = 0;
      }

      if (userInputstring[i] == "/") {
        //This will follow same procedure as in mult. We will later fix into a function.
        let subIndexLeft = i;
        let subIndexRight = i;
        let subOperatorLocation = i;

        let subStringL = "";
        let subStringR = "";

        while (!isNaN(userInputstring[subIndexLeft - 1])) {
          subStringL += userInputstring[subIndexLeft - 1];

          /*
          //we will split our string into an array
          let splitString = subStringL.split("");
          //then we reverse our array
          let reverseArray = splitString.reverse();
          //finally we join the array into a string and our initial string is now reversed.
          let joinArray = reverseArray.join("");
          */
          userInputstring[subIndexLeft - 1] = null;

          //console.log("This is a check point. subStringL = " + joinArray);
          lefthold = subStringL;
          subIndexLeft--;
        }

        while (
          !isNaN(userInputstring[subIndexRight + 1]) &&
          userInputstring[subIndexRight + 1] != null
        ) {
          subStringR += userInputstring[subIndexRight + 1];

          userInputstring[subIndexRight + 1] = null;

          console.log("This is a check point. subStringR = " + subStringR);
          righthold = subStringR;
          subIndexRight++;
        }

        let leftnum = Number(lefthold);
        let rightnum = Number(righthold);

        //now we divide

        let solu = String(leftnum / rightnum);

        userInputstring[subOperatorLocation] = solu;

        console.log(solu);

        let subarray = [];
        let j = 0;
        for (let i = 0; i < userInputstring.length; i++) {
          if (userInputstring[i] != null) {
            subarray[j] = userInputstring[i];
            j++;
          }
        }

        for (let i = 0; i < userInputstring.length; i++) {
          userInputstring[i] = null;
        }

        for (let i = 0; i < subarray.length; i++) {
          userInputstring[i] = subarray[i];
        }

        i = 0;
      }
    }
  }

  //we just separed mult and div, and add and subtract. WIth their distinct for loops
  // so we will check mult and div first
  //then we will check for add and substact second
  //This makes the program work.
  //We have fishised our logic and ready to clean up code. MISSION COMPLETE!!!!!
  //this was the last part I needed. I will clean code up and clean up documentation.
  for (let i = 0; i < userInputstring.length; i++) {
    if (userInputstring[i] == "+" || userInputstring[i] == "-") {
      let lefthold = "";
      let righthold = "";

      if (userInputstring[i] == "+") {
        let subIndexLeft = i;
        let subIndexRight = i;
        let subOperatorLocation = i;

        let subStringL = "";
        let subStringR = "";

        while (!isNaN(userInputstring[subIndexLeft - 1])) {
          subStringL += userInputstring[subIndexLeft - 1];

          /*
          //we will split our string into an array
          let splitString = subStringL.split("");
          //then we reverse our array
          let reverseArray = splitString.reverse();
          //finally we join the array into a string and our initial string is now reversed.
          let joinArray = reverseArray.join("");
          */

          userInputstring[subIndexLeft - 1] = null;

          console.log("This is a check point. subStringL = " + subStringL);
          lefthold = subStringL;
          subIndexLeft--;
        }

        while (
          !isNaN(userInputstring[subIndexRight + 1]) &&
          userInputstring[subIndexRight + 1] != null
        ) {
          subStringR += userInputstring[subIndexRight + 1];

          userInputstring[subIndexRight + 1] = null;

          console.log("This is a check point. subStringR = " + subStringR);
          righthold = subStringR;
          subIndexRight++;
        }
        let leftnum = Number(lefthold);
        let rightnum = Number(righthold);

        //now we add

        let solu = String(leftnum + rightnum);

        userInputstring[subOperatorLocation] = solu;

        console.log(solu);

        let subarray = [];
        let j = 0;
        for (let i = 0; i < userInputstring.length; i++) {
          if (userInputstring[i] != null) {
            subarray[j] = userInputstring[i];
            j++;
          }
        }

        for (let i = 0; i < userInputstring.length; i++) {
          userInputstring[i] = null;
        }

        for (let i = 0; i < subarray.length; i++) {
          userInputstring[i] = subarray[i];
        }
        i = 0;
      }

      if (userInputstring[i] == "-") {
        let subIndexLeft = i;
        let subIndexRight = i;
        let subOperatorLocation = i;

        let subStringL = "";
        let subStringR = "";

        while (!isNaN(userInputstring[subIndexLeft - 1])) {
          subStringL += userInputstring[subIndexLeft - 1];

          /*
          //we will split our string into an array
          let splitString = subStringL.split("");
          //then we reverse our array
          let reverseArray = splitString.reverse();
          //finally we join the array into a string and our initial string is now reversed.
          let joinArray = reverseArray.join("");
          */

          console.log("This is a check point. subStringL = " + subStringL);

          userInputstring[subIndexLeft - 1] = null;

          lefthold = subStringL;
          subIndexLeft--;
        }

        while (
          !isNaN(userInputstring[subIndexRight + 1]) &&
          userInputstring[subIndexRight + 1] != null
        ) {
          subStringR += userInputstring[subIndexRight + 1];

          userInputstring[subIndexRight + 1] = null;

          console.log("This is a check point. subStringR = " + subStringR);
          righthold = subStringR;
          subIndexRight++;
        }
        let leftnum = Number(lefthold);
        let rightnum = Number(righthold);

        //now we substract

        let solu = String(leftnum - rightnum);

        console.log(solu);
        userInputstring[subOperatorLocation] = solu;

        let subarray = [];
        let j = 0;
        for (let i = 0; i < userInputstring.length; i++) {
          if (userInputstring[i] != null) {
            subarray[j] = userInputstring[i];
            j++;
          }
        }

        for (let i = 0; i < userInputstring.length; i++) {
          userInputstring[i] = null;
        }

        for (let i = 0; i < subarray.length; i++) {
          userInputstring[i] = subarray[i];
        }
        i = 0;
      }
    }
  }
}

//as the user inputs digits and calculations. they will be stored  in an string
let screenInput = "";

//when the = is pressed thats when we calculate our expression

/*
const butt7 = document.querySelector(".7butt");
const butt8 = document.querySelector(".8butt");
const butt9 = document.querySelector(".9butt");
const buttDivi = document.querySelector(".Dividebutt");
const butt4 = document.querySelector(".4butt");
const butt5 = document.querySelector(".5butt");
const butt6 = document.querySelector(".6butt");
const buttMult = document.querySelector(".Multbutt");
const butt1 = document.querySelector(".1butt");
const butt2 = document.querySelector(".2butt");
const butt3 = document.querySelector(".3butt");
const buttMinus = document.querySelector(".Minusbutt");
const butt0 = document.querySelector(".0butt");
const buttDeci = document.querySelector(".Decimalbutt");
const buttAdd = document.querySelector(".Addbutt");
const buttEqual = document.querySelector(".Equalbutt");
*/

//we selecting our calculator buttons
const buttInput = document.querySelectorAll("button");

//we select our screen output
const screen = document.querySelector(".nScreen");

//we are adding an eventhandler for all the buttons in our document.
buttInput.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
    //if the user selects "=" then our string will be sent to the evaluation fuction
    if (button.textContent == "=") {
      console.log("= was selected");

      //we will convert our string into an array for better processing
      let converToArr = [];
      let substring1 = "";
      let substringOperator = "";
      let z = 0;

      //run through our lenght string
      for (let i = 0; i < screenInput.length; i++) {
        //if !Not a Number then we will pass that string index into an empty string
        //we do this inorder to collect numbers that are more than 1 digit.
        if (!isNaN(screenInput[i])) {
          substring1 += screenInput[i];

          //if the next index is a not a number then, we will push our contents that we've have been collecting
          // in our substring and push it into an array index. so ex: "45" would be in one index in our array\
          // instead "4" and "5" beloging to separate index.
          //Once we push our collection string, we empty of collection string and push the index of out converToArr
          //to the next index
          if (isNaN(screenInput[i + 1])) {
            converToArr[z] = substring1;
            substring1 = "";
            z++;
          }
        }
        // if our current index is not a digit then it will be an operator, so we will push that operator to the
        //convertoArr and push it to the next index.
        else {
          converToArr[z] = screenInput[i];
          z++;
        }
      }

      //bug in our array is that a come is showing "," idk why
      // note: not a bug, it will show in console with "," commas in order
      // to show the different indexes. This is a sucessfull string to array conversion
      //with larger digits than one
      console.log("This is our converToArr " + converToArr);

      evaluationExpression(converToArr);
    } else {
      //here we will collect our output in a singular string.
      //depending on the buttons textcontent, that text will be placed in our global string
      //and with each button pressed, the text content will accumulate in a single string
      //when the = button is pressed, the string will be taken to be evaluated.
      //I will need to use a stack data structure to handle the pendas algorithm.
      screenInput += button.textContent;
      console.log(screenInput);

      // we will continue to collect the user calculator inputs until the "=" is selected. This
      //will trigger our calculator evaluation expression

      screen.textContent = screenInput;
    }
  });
});
