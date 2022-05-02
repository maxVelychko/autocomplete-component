import React from 'react';

import { separateMatchingTextPart } from '../Autocomplete.utils';
import { SuggestionsListProps } from './SuggestionsList.types';
import './SuggestionsList.css';

const SuggestionsList = React.forwardRef<HTMLUListElement, SuggestionsListProps>((
	props,
	ref,
) => {
	const {
		showList,
		suggestions,
		selectedSuggestionIndex,
		handleSuggestionClick,
		handleMouseOver,
		inputValue,
	} = props;

	let content;
	if (showList) {
		if (suggestions.length) {
			content = (
				<ul className="suggestionsList" ref={ref}>
					{suggestions.map((suggestion, index) => {						
						const {
							textBeforeMatch,
							textPartMatching,
							textAfterMatch,
						} = separateMatchingTextPart(suggestion, inputValue);
						return (
							<li
								className={index === selectedSuggestionIndex ? 'suggestionSelected' : undefined}
								key={suggestion}
								data-index={index}
								onClick={handleSuggestionClick}
								onMouseOver={handleMouseOver}
							>
								{textBeforeMatch}<b>{textPartMatching}</b>{textAfterMatch}
							</li>
						)
					})}
				</ul>
			);
		} else {
			content = (
				<div className="suggestionsEmptyState">
					<p className="emptyStateText">No suggestions available.</p>
				</div>
			);
		}
	}

	return content || null;
});

export default SuggestionsList;
