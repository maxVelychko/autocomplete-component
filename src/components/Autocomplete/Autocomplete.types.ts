export type Suggestions = Array<string>;

export interface AutocompleteProps {
  title?: string;
  placeholder?: string;
  suggestions: Suggestions;
}
