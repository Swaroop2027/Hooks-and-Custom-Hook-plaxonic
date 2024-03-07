import React, { useState, useEffect, useRef, useCallback } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [numberInc, setnumberInc] = useState(false);
  const [charInc, setCharInc] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberInc) str += "0123456789";
    if (charInc) str += "~!@#$%^&*(){}_`?";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberInc, charInc, setPassword]);

  const copyPassword = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberInc, charInc]);

  return (
    <div className="w-full max-w-md mx-auto my-8 px-4 py-3 shadow-lg bg-slate-600">
      <div className="bg-slate-400 max-w-md rounded-md  mx-auto my-8 flex flex-col items-center">
        <button
          className="bg-red-600 m-3 p-2 rounded-full text-yellow-50 hover:bg-red-800"
          onClick={copyPassword}
        >
          Copy Password
        </button>
        {/* <p className="text-2xl" ref={passwordRef}>
          Password: {password}
        </p> */}

        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
      </div>

      <div className="flex items-center gap-x-1 text-gray-300">
        <input
          type="range"
          min={6}
          max={14}
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
          className="cursor-pointer"
        />
        <label>Length: {length}</label>
      </div>

      <div className="flex items-center gap-x-1 text-gray-300">
        <input
          type="checkbox"
          defaultChecked={numberInc}
          id="numberInc"
          onChange={() => {
            setnumberInc((prev) => !prev);
          }}
        />
        <label htmlFor="numberInc">Numbers</label>
      </div>

      <div className="flex items-center gap-x-1 text-gray-300">
        <input
          type="checkbox"
          defaultChecked={charInc}
          id="charInc"
          onChange={() => {
            setCharInc((prev) => !prev);
          }}
        />
        <label htmlFor="charInc">Characters</label>
      </div>
    </div>
  );
};

export default PasswordGenerator;
