const _ = require('lodash');
const objectHash = require('object-hash');
const assert = require('assert');

exports.ObjectSet = class ObjectSet extends Map {
  // Can be initialised as an empty set
  // mySet = new ObjectSet()
  // or with an array as a parameter
  // mySet = newObjectSet([{a: 2}, {a: 3}])
  //
  constructor(arr) {
    assert(arr == null || Array.isArray(arr));
    if (Array.isArray(arr)) {
      super();
      this.addAll(arr);
    } else {
      super();
    }
  }

  has(obj) {
    assert(_.isObject(obj));
    const hash = objectHash(obj);
    return super.has(hash) && _.isEqual(obj, super.get(hash));
  }

  add(obj) {
    assert(_.isObject(obj));
    const hash = objectHash(obj);
    if (!super.has(hash)) {
      super.set(hash, _.cloneDeep(obj));
      return true;
    } else {
      return false;
    }
  }
  
  addAll(arr) {
    return arr.map(obj => this.add(obj));
  }

  // Returns true if all of the items in arr are members in the set, false if not
  hasAll(arr) {
    for (let obj of arr) {
      if (!this.has(obj))
        return false;
    }
    return true;
  }

  // Removes an obj from the set
  delete(obj) {
    const hash = objectHash(obj);
    return super.delete(hash);
  }

  // Returns a list of all of the members of the set
  getMembers() {
    let arr = [];
    for (let [hash, obj] of this) {
      arr.push(_.cloneDeep(obj));
    }
    return arr;
  }

  // forEach functionality
  forEach(callback) {
    this.getMembers().map(callback);
  }

  toString() {
    return '[object Set]';
  }

  // returns a new object set which is the union of this set and the set passed in as argument
  union(otherSet) {
    let unionSet = new ObjectSet();
    otherSet.forEach(obj => {
      unionSet.add(obj);
    });
    this.forEach(obj => {
      if (!unionSet.has(obj))
        unionSet.add(obj);
    });
    return unionSet;
  }

  // Overwriting these so as to make them inaccessible 
  entries() { return undefined; }
  get() { return undefined; }
  keys() { return undefined; }
  set() { return undefined; }
};
