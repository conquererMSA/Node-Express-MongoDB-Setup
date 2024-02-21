//ekahne object e req.query={ page: 1, limit: 2, sortBy: undefined, sortOrder: undefined } asbe.
// keys hobe ekta array zekhane query key 'limit','page', 'sortorder','sortBy', ksys=['limit','page', 'sortorder','sortBy']

export const pickQueryParam = <
  T extends Record<string, unknown>,
  K extends keyof T,
  //ekhane T and K er kkhetre constatints type bebohar kora hoyeche
>(
  obj: T, //req.query
  keys: K[], //['limit','page', 'sortorder','sortBy']
): Partial<T> => {
  const queryOptionObj: Partial<T> = {}
  // queryOptionObj= {page:'1',limit:2, sortBy:'year',sortOrder:'asc'}
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      queryOptionObj[key] = obj[key]
    }
  }
  return queryOptionObj
}
