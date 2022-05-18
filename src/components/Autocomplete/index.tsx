import React, { useState } from 'react';

import SuggestionsList from './SuggestionsList';
import { Suggestions, AutocompleteProps } from './Autocomplete.types';
import './Autocomplete.css';

const Autocomplete = ({
  suggestions,
  title = 'Search',
  placeholder = 'Type the text',
}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [matchingSuggestions, setMatchingSuggestions] = useState<Suggestions>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<undefined | number>(undefined);
  const suggestionsListRef = React.useRef<HTMLUListElement>(null);
  const [afterScroll, setAfterScroll]= React.useState(false);

  // prevents onMouseOver to be called as the result of scrolling.
  React.useEffect(() => {
    if (afterScroll) {
      setTimeout(() => {
        setAfterScroll(false);
      }, 0);
    }
  }, [afterScroll]);

  const scrollSuggestionList = (index: number) => {
    const listNode = suggestionsListRef.current;

    if (!listNode) {
      return;
    }

    const listNodeHeight = listNode?.offsetHeight as number;
    const listNodeScrollTop = listNode?.scrollTop as number;

    const optionNode = suggestionsListRef.current?.querySelector('li');
    const optionNodeHeight = optionNode?.offsetHeight as number;
    
    const viewport = listNodeScrollTop + listNodeHeight;	
    const selectedOptionNodeOffset = optionNodeHeight * index;

    if (selectedOptionNodeOffset < listNodeScrollTop || (selectedOptionNodeOffset + optionNodeHeight) > viewport) {
      setAfterScroll(true);
      listNode.scrollTop = selectedOptionNodeOffset;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!showSuggestions) {
      return;
    }

    if (event.keyCode === 13) {
      if (typeof selectedSuggestionIndex === 'number') {
        setInputValue(matchingSuggestions[selectedSuggestionIndex]);
      }
      setShowSuggestions(false);
      setSelectedSuggestionIndex(undefined);
    } else if (event.keyCode === 40) {
      if (selectedSuggestionIndex === undefined) {
        setSelectedSuggestionIndex(0);
        return;
      }
      if (selectedSuggestionIndex + 1 === matchingSuggestions.length) {
        const newIndex = 0;
        setSelectedSuggestionIndex(newIndex);
        scrollSuggestionList(newIndex);
        return;
      }

      const newIndex = selectedSuggestionIndex + 1;
      setSelectedSuggestionIndex(newIndex);
      scrollSuggestionList(newIndex);
    } else if (event.keyCode === 38) {
      if (selectedSuggestionIndex === undefined) {
        return;
      }
      if (selectedSuggestionIndex === 0) {
        const newIndex = matchingSuggestions.length - 1;
        setSelectedSuggestionIndex(newIndex);
        scrollSuggestionList(newIndex);
        return;
      }
      const newIndex = selectedSuggestionIndex - 1;
      setSelectedSuggestionIndex(newIndex);
      scrollSuggestionList(newIndex);
    }
  };

  const handleSuggestionClick = (event: React.MouseEvent<HTMLElement>) => {
    setInputValue(event.currentTarget.innerText);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(undefined);
    setMatchingSuggestions([]);
  };

  const handleSuggestionMouseOver = (event: React.MouseEvent<HTMLElement>) => {
    if (afterScroll) return;
    const selectedOptionIndex = Number(event.currentTarget.getAttribute('data-index'))
    setSelectedSuggestionIndex(selectedOptionIndex);
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInputValue(event.currentTarget.value);
    setMatchingSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setSelectedSuggestionIndex(undefined);
  };

  return (
    <div className="autocompleteWrapper" onKeyDown={handleKeyDown}>
      <p className="autocompleteTitle">{title}</p>
      <input
        className="autocompleteInput"
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        value={inputValue}
      />
      <SuggestionsList
        ref={suggestionsListRef}
        showList={showSuggestions && !!inputValue}
        suggestions={matchingSuggestions}
        selectedSuggestionIndex={selectedSuggestionIndex}
        handleSuggestionClick={handleSuggestionClick}
        handleMouseOver={handleSuggestionMouseOver}
        inputValue={inputValue}
      />
    </div>
    );
  };

export default Autocomplete;
