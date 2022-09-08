import { MouseEvent, useState } from 'react';
import { Suggestion } from '../types/types'
import './Autocomplete.css';

interface AutoCompleteProps {
  onSuggestionSelected: (suggestion: string) => void,
  suggestions: Array<Suggestion>
}

export function AutoComplete(props: AutoCompleteProps): JSX.Element {
  const { suggestions, onSuggestionSelected } = props;
  const [userInput, setUserInput] = useState<string>('')
  const [suggestionMatches, setSuggestionMatches] = useState<Array<string>>([])
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const text = event.currentTarget.value

    if (!text.length) {
      setUserInput('')
      setSuggestionMatches([])
      setActiveSuggestion(0)
      onSuggestionSelected(suggestionMatches[activeSuggestion])
      return
    }

    const filteredSuggestions = suggestions.filter(suggestion => suggestion.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
    
    setUserInput(text)
    setSuggestionMatches(filteredSuggestions.map(sug => sug.name))
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setUserInput(suggestionMatches[activeSuggestion])
      setSuggestionMatches([])
      setActiveSuggestion(0)
      onSuggestionSelected(suggestionMatches[activeSuggestion])
    }
    else if (event.key === 'ArrowUp') {
      if (activeSuggestion === 0) {
        return
      }

      setActiveSuggestion(activeSuggestion - 1);
    }
    else if (event.key === 'ArrowDown') {
      if (activeSuggestion - 1 === suggestionMatches.length) {
        return
      }

      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const onClick = (event: React.MouseEvent<HTMLLIElement>, index: number) => {
    setUserInput(suggestionMatches[index])
    setSuggestionMatches([])
    onSuggestionSelected(suggestionMatches[index])
  }

  const onMouseIn = (event: MouseEvent<HTMLLIElement>, index: number) => {
    setActiveSuggestion(index);
  }

  return (
    <div className='input-wrapper'>
      <input
        type="text"
        onChange={onChange}
        value={userInput}
        onKeyDown={onKeyDown}
      />
      {
        <ul className='suggestions-wrapper'>
          {suggestionMatches.map((suggestionMatch, index) => (
            <li
              key={`suggestionMatch-${index}`}
              onClick={(event) => onClick(event, index)}
              onMouseEnter={(event) => onMouseIn(event, index)}
              className={index === activeSuggestion ? 'suggestion active' : 'suggestion'}>
                { paintMatch(suggestionMatch, userInput) }
            </li>
          ))}
        </ul>     
      }
      
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