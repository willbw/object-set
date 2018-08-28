const _ = require('lodash');

exports.ObjectSet = class ObjectSet {
  // Can be initialised as an empty set
  // mySet = new ObjectSet()
  // or with an array as a parameter
  // mySet = newObjectSet([{a: 2}, {a: 3}])
  constructor(arr) {
    this.members = [];
    if (arr) {
      arr.map(item => this.add(item));
    }
  }

  // Returns a copy of an item if it is found in the set.
  has(item) {
    return this.members.find(member => _.isEqual(member, item));
  }

  // Returns the index of an item in the set, if it exists.
  indexOf(item) {
    for (let i = 0; i < this.members.length; i++) {
      if (_.isEqual(item, this.members[i]))
        return i;
    }
    return -1;
  }

  // Attempts to add an item to a set, returns true if successful and false if not
  add(item) {
    // Only add regular objects
    if (!_.isPlainObject(item))
      return false;
    for (let i = 0; i < this.members.length; i++) {
      if (_.isEqual(item, this.members[i]))
        return false;
    }
    this.members.push(item);
    return true;
  }
  
  // Adds all the items in the array to the set
  addAll(arr) {
    return arr.map(item => this.add(item));
  }

  // Returns true if all of the items in arr are members in the set, false if not
  hasAll(arr) {
    for (let item of arr) {
      if (this.has(item) === undefined)
        return false;
    }
    return true;
  }

  // Returns the cardinality of the set
  size() {
    return this.members.length;
  }

  // Clears the set
  clear() {
    this.members = [];
  }

  // Removes an item from the set, returns true if successful, and false if not
  delete(item) {
    let index = this.indexOf(item);
    if (index > -1) {
      this.members.splice(index, 1);
      return true;
    }
    return false;
  }

  // Returns a list of all of the members of the set
  getMembers() {
    return this.members;
  }
};

