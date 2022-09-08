import { useEffect, useState } from 'react';
import './App.css';
import { AutoComplete } from './components/Autocomplete';
import { getStocks } from './services/suggestions'
import { Suggestion } from './types/types';

function App() {
  const [suggestions, setSuggestions] = useState<Array<Suggestion>>([])

  const getSuggestions = async () => {
    const sug = await getStocks()

    setSuggestions(sug)
  }

  useEffect(() => {
    getSuggestions()
  }, [])

  return (
    <div className="App">
      <div className='header'>
        <div className='headLine'>
          Search.IO
        </div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg" alt="" />
      </div>
      <AutoComplete
        input='this is just a test'
        suggestions={suggestions}
      />
    </div>
  );
}

export default App;