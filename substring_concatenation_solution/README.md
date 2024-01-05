# Intuition
The idea is to use a sliding window approach to iterate through all possible substrings of length totalLength in the input string s. For each substring, we check whether it is a valid concatenated substring by comparing the counts of words in the substring with the expected counts from the words array.

# Approach
1- Check for edge cases: If the input string s or the array words is empty, return an empty array.

2- Determine the length of each word (wordLength) and the total length of the concatenated substring (totalLength).

3- Create a wordCount object to store the counts of each word in the words array.

4- Iterate through the words array and populate the wordCount object.
Initialize an empty array result to store the starting indices of valid concatenated substrings.

5- Use two nested loops to iterate through all possible substrings of length totalLength in the input string s.

6- For each substring, maintain a currentWordCount object to store the counts of words in the substring.

7- Check whether the current substring is a valid concatenated substring by comparing the counts in currentWordCount with the expected counts from wordCount.

8- If the substring is valid, add the starting index to the result array.
Return the final result array containing the starting indices of all valid concatenated substrings.

# Complexity
- Time complexity:
Time complexity: O(n * m), where n is the length of the input string s and m is the average length of words in the words array. The nested loops iterate through all possible substrings, and the inner loop has a constant time complexity.

- Space complexity:
Space complexity: O(m), where m is the average length of words in the words array. The space is used to store the wordCount and currentWordCount objects.

# Code
```
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

```