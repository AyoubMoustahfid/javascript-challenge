# Memoize Function

## Overview
The memoize function is a higher-order function designed to enhance the performance of a given function by caching its results. It prevents redundant calculations for the same set of input arguments, significantly improving efficiency in scenarios where a function is called repeatedly with identical inputs.

## Usage

### Input:
```js
    /**
     * @param {Function} fn - The original function to be memoized.
     * @return {Function} - The memoized function.
     */
    const memoize = (fn) => {
    // Implementation details here...
    };
```

### Output:

The memoize function returns a new function that wraps the original function, providing caching capabilities.

Implementation
The memoization is achieved by utilizing a Trie data structure to store and organize cached results based on the input arguments.

```js
const createTrieNode = () => {
  return {
    value: null,
    children: new Map(),
    getValue(args) {
      return this.children.get(args)?.value;
    },
    setValue(args, value) {
      const childNode = this.children.get(args) ?? createTrieNode();
      childNode.value = value;
      this.children.set(args, childNode);
    },
  };
};

const cache = createTrieNode();

const memoized = (...args) => {
  // Memoization logic here...
};
```

## Memoization Logic
The memoized function checks the cache for previously computed results based on the provided arguments. If the result is found, it is returned directly. Otherwise, the original function is invoked, and its result is stored in the cache for future use.

```js
if (args.length === 0) {
  // Handling the case where no arguments are provided.
  // Checking and returning cached value if available.
} else {
  // Traverse the TrieNode based on the arguments.
  // If the value is not cached, invoke the original function and cache the result.
}
```

## Example Usage
```js
// Define the original function to be memoized.
const myFunction = (a, b) => {
  // Function logic here...
};

// Apply memoization to the original function.
const myMemoizedFunction = memoize(myFunction);

// Use the memoized function.
const result = myMemoizedFunction(2, 3);
```
## Benefits
Performance Improvement: Reduces redundant calculations by caching results.
Efficient Memory Usage: Trie structure allows for organized and efficient storage of cached values.
Easy Integration: Simply apply the memoize function to the target function.

## Considerations
Stateless Functions: Best suited for stateless functions where the output is solely determined by the input arguments.
Immutable Arguments: Input arguments should be immutable to ensure accurate caching.

# Excercice:

## Example 1:

* Input: 
getInputs = () => [[2,2],[2,2],[1,2]]
fn = function (a, b) { return a + b; }
* Output: [{"val":4,"calls":1},{"val":4,"calls":1},{"val":3,"calls":2}]
* Explanation:
const inputs = getInputs();
const memoized = memoize(fn);
for (const arr of inputs) {
  memoized(...arr);
}

For the inputs of (2, 2): 2 + 2 = 4, and it required a call to fn().
For the inputs of (2, 2): 2 + 2 = 4, but those inputs were seen before so no call to fn() was required.
For the inputs of (1, 2): 1 + 2 = 3, and it required another call to fn() for a total of 2.

## Example 2:

* Input: 
getInputs = () => [[{},{}],[{},{}],[{},{}]] 
fn = function (a, b) { return ({...a, ...b}); }
* Output: [{"val":{},"calls":1},{"val":{},"calls":2},{"val":{},"calls":3}]
* Explanation:
Merging two empty objects will always result in an empty object. It may seem like there should only be 1 call to fn() because of cache-hits, however none of those objects are === to each other.

## Example 3:

* Input: 
getInputs = () => { const o = {}; return [[o,o],[o,o],[o,o]]; }
fn = function (a, b) { return ({...a, ...b}); }
* Output: [{"val":{},"calls":1},{"val":{},"calls":1},{"val":{},"calls":1}]
* Explanation:
Merging two empty objects will always result in an empty object. The 2nd and 3rd third function calls result in a cache-hit. This is because every object passed in is identical.

