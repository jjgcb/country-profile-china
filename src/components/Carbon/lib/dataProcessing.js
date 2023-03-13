// structuredArray add structure to conventionally formatted array properties
/*
  if the property name includes a . (e.g. `parent.child`) an object will be created for each 
*/
export function structuredArray(arr) {
	return arr.map((row) => {
		const newRow = {};
		Object.entries(row).forEach(([key, value]) => {
			if (key.indexOf('.') > 0) {
				let [objectName, propertyName] = key.split('.');
				if (newRow[objectName] === undefined) {
					newRow[objectName] = {};
				}
				newRow[objectName][propertyName] = value;
			} else {
				newRow[key] = value;
			}
		});
		return newRow;
	});
}

// returns a function that sorts an array based on the order of items in a list
// e.g. if you have an array which has "apples", "pears", "oranges" and "bananas" in 
// and you want to sort the itmes in that order this is the function for you
export function listSorter(list, accessor=(d)=>d){
	const order = {}
	
	list.forEach((item,index)=>{
		order[item] = index
	});
	return (a, b)=>{
		return (order[accessor(a)] - order[accessor(b)])
	};
}
