function evaluationExpression(userInputstring) {
  for (let i = 0; i < userInputstring.length; i++) {
    if (userInputstring[i] == "x" || userInputstring[i] == "/") {
      if (userInputstring[i] == "x") {
        //note: small bug error i did.
        //originally I had sent traverseLeftRight(userInputstring[i], ...)
        //which would just send the specifix index, and not the whole array.
        //This broke our program and made it loop.
        i = traverseLeftRight(userInputstring, "x", i);
      } else if (userInputstring[i] == "/") {
        i = traverseLeftRight(userInputstring, "/", i);
      }
    }
  }

  for (let i = 0; i < userInputstring.length; i++) {
    if (userInputstring[i] == "+" || userInputstring[i] == "-") {
      if (userInputstring[i] == "+") {
        i = traverseLeftRight(userInputstring, "+", i);
      } else if (userInputstring[i] == "-") {
        i = traverseLeftRight(userInputstring, "-", i);
      }
    }
  }

  //now we send our solution to the calculator screen.
  //we show index zero, because that where the final solution will be
  screen.textContent = userInputstring[0];
}

function traverseLeftRight(userInputstring, operationSign, index) {
  let lefthold = "";
  let righthold = "";
  console.log("index here:" + index);

  let subIndexLeft = index;
  let subIndexRight = index;
  let subOperatorLocation = index;

  let subStringL = "";
  let subStringR = "";

  while (!isNaN(userInputstring[subIndexLeft - 1])) {
    console.log("do i even run?");
    subStringL += userInputstring[subIndexLeft - 1];
    userInputstring[subIndexLeft - 1] = null;
    lefthold = subStringL;
    subIndexLeft--;
  }
  console.log("subStringL" + subStringL);

  console.log("left hold:" + lefthold);

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
  console.log("right hold:" + righthold);

  let leftnum = Number(lefthold);
  let rightnum = Number(righthold);
  let solu = 2;

  if (operationSign == "x") {
    solu = String(leftnum * rightnum);
  } else if (operationSign == "/") {
    solu = String(leftnum / rightnum);
  } else if (operationSign == "+") {
    solu = String(leftnum + rightnum);
  } else if (operationSign == "-") {
    solu = String(leftnum - rightnum);
  }

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
  console.log("9: " + userInputstring);

  // return a zero, which will reset our iterator. Inorder for our loop.
  // to loop again from the begining of the array
  return 0;
}

let screenInput = "";

const buttInput = document.querySelectorAll("button");

const screen = document.querySelector(".nScreen");

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
