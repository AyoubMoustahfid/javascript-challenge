/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
    if (s.length === 0 || words.length === 0) {
        return [];
    }

    const wordLength = words[0].length;
    const totalLength = wordLength * words.length;
    const wordCount = {};

    for (const word of words) {
        if (!wordCount[word]) {
            wordCount[word] = 0;
        }
        wordCount[word]++;
    }

    const result = [];

    for (let i = 0; i <= s.length - totalLength; i++) {
        const substring = s.substring(i, i + totalLength);
        const currentWordCount = {};

        for (let j = 0; j < totalLength; j += wordLength) {
            const currentWord = substring.substring(j, j + wordLength);

            if (!wordCount[currentWord]) {
                break;
            }

            if (!currentWordCount[currentWord]) {
                currentWordCount[currentWord] = 0;
            }
            currentWordCount[currentWord]++;

            if (currentWordCount[currentWord] > wordCount[currentWord]) {
                break;
            }

            if (j + wordLength === totalLength) {
                result.push(i);
            }
        }
    }

    return result;
};