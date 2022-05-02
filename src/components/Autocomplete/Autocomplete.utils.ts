export const separateMatchingTextPart = (fullText: string, matchingText: string) => {
	const textPartMatchingIndexStart = fullText.toLowerCase().indexOf(matchingText.toLowerCase());
	const textBeforeMatch = fullText.slice(0, textPartMatchingIndexStart);
	const textPartMatchingIndexEnd = textPartMatchingIndexStart + matchingText.length;
	const textPartMatching = fullText.slice(textPartMatchingIndexStart, textPartMatchingIndexEnd);
	const textAfterMatch = fullText.slice(textPartMatchingIndexEnd);

	return {
		textBeforeMatch,
		textPartMatching,
		textAfterMatch,
	}
};
