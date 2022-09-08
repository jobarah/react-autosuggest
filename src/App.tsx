import { useState } from 'react';
import './App.css';
import { AutoComplete } from './components/Autocomplete';
import { fetchSuggestions } from './services/suggestions'
import { Suggestion } from './types/types';

function App() {
  const [suggestions, setSuggestions] = useState<Array<Suggestion>>([])
  const [, setValue] = useState<string>('')

  const getSuggestions = async (filter: string) => {
    const sug = await fetchSuggestions(filter)

    setSuggestions(sug)
  }

  return (
    <div className="App">
      <div className='header'>
        <div className='headLine'>
          Search.IO
        </div>
        <img className="search" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg" alt="search" />
      </div>
      <AutoComplete
        onSuggestionSelected={setValue}
        onInputChange={getSuggestions}
        suggestions={suggestions}
      />
    </div>
  );
}

export default App;
