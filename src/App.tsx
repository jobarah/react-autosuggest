
import { useEffect, useState } from 'react';
import './App.css';
import { AutoComplete } from './components/Autocomplete';
import { getStocks } from './services/suggestions'
import { Suggestion } from './types/types';

function App() {
  const [suggestions, setSuggestions] = useState<Array<Suggestion>>([])
  const [, setValue] = useState<string>('')

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
        <img className="search" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg" alt="" />
      </div>
      <AutoComplete
        onSuggestionSelected={setValue}
        suggestions={suggestions}
      />
    </div>
  );
}

export default App;