/**
 * @param {Object} object
 * @param {Function} classFunction
 * @return {boolean}
 */
var checkIfInstanceOf = function (obj, classFunction) {
  if (obj === null || obj === undefined || typeof classFunction !== "function")
    return false;
  return Object(obj) instanceof classFunction;
};

console.log(checkIfInstanceOf(new Date(), Date)); // true

class Animal {}
class Dog extends Animal {}
console.log(checkIfInstanceOf(new Dog(), Animal)); // true

console.log(checkIfInstanceOf(Date, Date)); // false
console.log(checkIfInstanceOf(5, Number)); // true
