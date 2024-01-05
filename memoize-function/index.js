/**
 * @param {Function} fn
 * @return {Function}
 */

const memoize = (fn) => {
  // Define a TrieNode function to store the cache
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

  // Create a cache using the TrieNode function
  const cache = createTrieNode();

  // Define the memoized function
  const memoized = (...args) => {
    // If no arguments are passed, return the cached value
    if (args.length === 0) {
        if (cache.value !== null) {
            return cache.value;
        }
        const result = fn.apply(this, args);
        cache.value = result;
        return result;
    }

    // Traverse the TrieNode based on the arguments
    let currentNode = cache;
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        const childNode = currentNode.children.get(arg) ?? createTrieNode();
        currentNode.children.set(arg, childNode);
        currentNode = childNode;
    }

    // If the value is not cached or is null, cache it and return it
    if (currentNode.value === null) {
        const result = fn.apply(this, args);
        currentNode.value = result;
        return result; // Added return statement here
    }

        return currentNode.value;
    };

    return memoized;
};