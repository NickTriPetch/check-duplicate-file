import './App.css';
import { useRef } from 'react';

function App() {
  const file1 = useRef(null);
  const file2 = useRef(null);

  const onFileValueChange = (fileName, fileRef) => () => {
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
    }).then(textBuffer => console.log(`textBuffer[${fileName}] - `, textBuffer))
      .finally(() => reader = null);
  };

  return (
    <div className="App">
      <section>
        <h2>File 1</h2>
        <div>
          <input type="file" ref={file1} onChange={onFileValueChange('file1', file1)} />
        </div>
      </section>
      <section>
        <h2>File 2</h2>
        <div>
          <input type="file" ref={file2} onChange={onFileValueChange('file2', file2)} />
        </div>
      </section>
    </div>
  );
}

export default App;
