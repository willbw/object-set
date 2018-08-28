# ObjectSet

A set data structure which checks for uniqueness based upon a deep value comparison, lodash's isEqual.

Creating a new set
```javascript
const ObjectSet = require('object-set').ObjectSet;

// creates a new, empty object set

let os = new ObjectSet;

// creates a new object set and add the items in the array to the set
// (duplicates will be filtered out)
os = new ObjectSet([ { a : 1 }, { a : 2 }, { a : 3 } ])
```

Adding to the set
```javascript
os.add({ a: 4 });
// returns true
// os now contains { a : 1 }, { a : 2 }, { a : 3 } and { a : 4 } 

os.add({ a: 4 });
// returns false
// os still contains { a : 1 }, { a : 2 }, { a : 3 } and { a : 4 }  as { a : 4 } was in the set
```

Adding items in an array to the set
```javascript
// functions much the same as adding a single item
// iterates through the array of objects, adding the objects to our set
os.addAll([ { a : 1 }, { a : 2 }, { a : 3 } ]);
```

Getting the index of an object in the set
```javascript
// returns -1 if not found, or the index if found
let indexInSet = os.indexOf({ a: 2 });
```

Removing an item from the set
```javascript
// returns true if in the set, false if not
os.delete({a : 1});
```

Clearing the set
```javascript
os.clear();
```

Checking whether an object is a member of the set
```javascript
// returns true if a member, false if not
os.has({a : 1});
```

Checking whether all items in an array are members
```javascript
// returns true if all are members, false if not
os.hasAll([ { a : 1 }, { a : 2 }, { a : 3 } ]);
```

Getting the size of the set
```javascript
const setSize = os.size();
```

Getting a list of all members in the set
```javascript
let members = os.getMembers();
```
