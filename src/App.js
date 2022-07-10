import './App.css';
import { useRef, useState } from 'react';
import CryptoJS from 'crypto-js'

function App() {
  const file1 = useRef(null);
  const file2 = useRef(null);

  const [hashFile1, setHashFile1] = useState(null);
  const [hashFile2, setHashFile2] = useState(null);

  const strOutPut = (() => {
    if (!hashFile1 && !hashFile2) {
      return "";
    } else if (!hashFile1 && hashFile2) {
      return "Please insert File1.";
    } else if (hashFile1 && !hashFile2) {
      return "Please insert File1.";
    } else if (hashFile1 === hashFile2) {
      return "File1 is as same as File2.";
    }

    return "File1 is as 'not' same as File2.";
  })();

  const onFileValueChange = (fileRef, callbackFn) => () => {
    const [file] = fileRef.current.files;

    if (!file) {
      return;
    }

    let reader = new FileReader();

    new Promise((resolve) => {
      const readFileContent = (event) => {
        resolve(event.target.result);
      };
  
      reader.addEventListener('load', readFileContent);
      reader.readAsText(file);
    }).then(textBuffer => {
      return CryptoJS.SHA256(textBuffer, { outputLength: 12 }).toString(CryptoJS.enc.Hex);
    })
      .then(callbackFn)
      .finally(() => reader = null);
  };

  return (
    <div className="App">
      {strOutPut && <h1>
        {strOutPut}
      </h1>}
      <section>
        <h2>File 1: {hashFile1}</h2>
        <div>
          <input type="file" ref={file1} onChange={onFileValueChange(file1, setHashFile1)} />
        </div>
      </section>
      <section>
        <h2>File 2: {hashFile2}</h2>
        <div>
          <input type="file" ref={file2} onChange={onFileValueChange(file2, setHashFile2)} />
        </div>
      </section>
    </div>
  );
}

export default App;
