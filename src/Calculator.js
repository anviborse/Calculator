import { useState } from "react";
import axios from "axios";

export default function Calculator() {
  const [result, setResult] = useState("");

  const hClick = (event) => {
    const input = event.target.name;

    if (input === "=") {
      calculate();
    } else if (input === "C") {
      clear();
    } else if (input === "+/-") {
      plusminus();
    } else if (input === "%") {
      percent();
    } else if (input === "/") {
      hoperation(input, "/");
    } else if (input === "*") {
      hoperation(input, "*");
    } else if (input === "-") {
      hoperation(input, "-");
    } else if (input === "+") {
      hoperation(input, "+");
    } else if (input === ".") {
      hoperation(input, ".");
    } else {
      setResult(result.concat(input));
    }
  };

  const clear = () => {
    setResult("");
  };

  const calculate = () => {
    if (!result) {
      alert("Input cannot be empty");
      return;
    }

    try {
      const expression = new Function("return " + result);

      const calculatedResult = expression();

      if (isNaN(calculatedResult)) {
        alert("Invalid input");
        return;
      }

      if (!isFinite(calculatedResult)) {
        alert("Zero division error");
        return;
      }

      setResult(calculatedResult.toString());

      let urladd = "http://localhost:8000/calculate";
      axios
        .post(urladd, expression)
        .then((response) => {
          setResult(response.data.result.toString());
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      alert("Invalid input");
    }
  };


  const plusminus = () => {
    if (result.charAt(0) === "-") {
      setResult(result.substring(1));
    } else {
      setResult("-" + result);
    }
  };

  const percent = () => {
    setResult(String(parseFloat(result) / 100));
  };

  const hoperation = (operation, symbol) => {
    if (!result) {
      alert("Input cannot be empty");
      return;
    }

    const prevChar = result.charAt(result.length - 1);
    if (
      prevChar === "/" ||
      prevChar === "*" ||
      prevChar === "-" ||
      prevChar === "+" ||
      prevChar === "."
    ) {
      setResult(result.slice(0, -1) + operation);
    } else {
      if (!isOperator(symbol)) {
        alert("Text and special characters are not allowed");
        return;
      }
      setResult(result.concat(symbol));
    }
  };

  const isOperator = (symbol) => {
    const operators = ["+", "-", "*", "/"];
    return operators.includes(symbol);
  };
  return (
    <>
      <center>
        <h1>CALCULATOR</h1>
        <div className="container">
          <div className="input-container">
            <input className="input" type="text" onChange={hClick} value={result} />
          </div>
          <div>
            <button onClick={clear} className="r1bc">
              C
            </button>
            <button onClick={plusminus} className="r1bc" id="pn">
              +/-
            </button>
            <button name="%" onClick={hClick} className="r1bc">
              %
            </button>
            <button name="/" onClick={hClick} className="scb">
              ÷
            </button>
          </div>
          <div>
            <button name="7" onClick={hClick}>
              7
            </button>
            <button name="8" onClick={hClick}>
              8
            </button>
            <button name="9" onClick={hClick}>
              9
            </button>
            <button name="*" onClick={hClick} className="scb">
              ×
            </button>
          </div>
          <div>
            <button name="4" onClick={hClick}>
              4
            </button>
            <button name="5" onClick={hClick}>
              5
            </button>
            <button name="6" onClick={hClick}>
              6
            </button>
            <button name="-" onClick={hClick} className="scb">
              −
            </button>
          </div>
          <div>
            <button name="1" onClick={hClick}>
              1
            </button>
            <button name="2" onClick={hClick}>
              2
            </button>
            <button name="3" onClick={hClick}>
              3
            </button>
            <button name="+" onClick={hClick} className="scb">
              +
            </button>
          </div>
          <div>
            <button name="0" onClick={hClick} className="B0">
              0
            </button>
            <button name="." onClick={hClick} id="r5">
              .
            </button>
            <button onClick={hClick} name="=" id="r5" className="scb">
              =
            </button>
          </div>
        </div>
      </center>
    </>
  );
}