import logo from './logo.svg';
import './App.css';
import { AutoComplete } from './components/Autocomplete';
import { getStocks } from './services/suggestions'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <AutoComplete
        input='this is just a test'
        suggestions={getStocks()}
      />
    </div>
  );
}

export default App;