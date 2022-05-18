import { Suggestions } from '../Autocomplete.types';

export interface SuggestionsListProps {
  showList: boolean;
  suggestions: Suggestions;
  selectedSuggestionIndex?: number;
  handleSuggestionClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseOver: (event: React.MouseEvent<HTMLElement>) => void;
  inputValue: string;
}
