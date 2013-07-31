function getKeyByValue(hash, value) {
	var key;
	for (key in hash) {
		if (hash[key] == value)
			return key;
	}
}

function getKeysByValue(hash, value) {
	var keys = [];
	for (key in hash) {
		if (hash[key] == value)
			keys.push(key);
	}
	return keys;
}


var combine = function(a, min) {
    var all = [];
	var fn = function(n, src, got, all) {
		if (n == 0) {
			if (got.length > 0) {
				all[all.length] = got;
			}
			return;
		}
		for (var j = 0; j < src.length; j++) {
			fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
		}
		return;
	}
	fn(min, a, [], all);
	return all;
}

function log(m) {
	return typeof console !== 'undefined' ? console.log(m) : false
}