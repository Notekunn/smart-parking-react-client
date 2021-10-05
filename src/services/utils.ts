export const areEqualShallow = <T extends Object>(a: T, b: T): boolean => {
	for (let key in a) {
		if (!(key in b)) {
			if (typeof a[key] === 'object' && typeof b[key] === 'object') {
				return areEqualShallow(a[key], b[key])
			}
			return a[key] === b[key]
		}
	}
	for (let key in b) {
		if (!(key in a) || a[key] !== b[key]) {
			if (typeof a[key] === 'object' && typeof b[key] === 'object') {
				return areEqualShallow(a[key], b[key])
			}
			return a[key] === b[key]
		}
	}
	return true
}
