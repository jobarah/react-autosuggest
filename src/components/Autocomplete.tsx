import React, { useState } from 'react';
import { Suggestion } from '../types/types'
import './Autocomplete.css';

interface AutoCompleteProps {
  input: string,
  suggestions: Array<Suggestion>
}

export function AutoComplete(props: AutoCompleteProps): JSX.Element {
  const { suggestions } = props;
  const [userInput, setUserInput] = useState<string>('')
  const [suggestionMatches, setSuggestionMatches] = useState<Array<string>>([])
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const text = event.currentTarget.value

    if (!text.length) {
      setUserInput('')
      setSuggestionMatches([])
      return
    }

    const filteredSuggestions = suggestions.filter(suggestion => suggestion.name.toLowerCase().indexOf(text.toLowerCase()) > -1);

    setUserInput(text)
    setSuggestionMatches(filteredSuggestions.map(sug => sug.name))
  }

  const onKeyDown = (event: KeyboardEvent) => {
    // User pressed the enter key
    if (event.keyCode === 13) {
      setActiveSuggestion(0);
    }
    // User pressed the up arrow
    else if (event.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (event.keyCode === 40) {
      if (activeSuggestion - 1 === suggestionMatches.length) {
        return;
      }

      setActiveSuggestion(activeSuggestion + 1);
    }
  };


  return (
    <div className='input-wrapper'>
      <input
        type="text"
        onChange={onChange}
        value={userInput}
      />
      <ul>
        {suggestionMatches.map(suggestionMatch => <li>{paintMatch(suggestionMatch, userInput)}</li>)}
      </ul>
    </div>
  )
}

function paintMatch(suggestion: string, userInput: string): JSX.Element {
  const startIndex = suggestion.toLowerCase().indexOf(userInput.toLowerCase())
  const endIndex = (startIndex + userInput.length) - suggestion.length

  const prefix = suggestion.slice(0, startIndex)
  const match = suggestion.slice(startIndex, startIndex + userInput.length)
  const postfix = suggestion.slice(endIndex)

  return <>{prefix}<span className='highlighted'>{match}</span>{postfix}</>
}