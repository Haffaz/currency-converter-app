type ConvertedArray<Str, T> = Array<{ key: Str; value: T }>;

/**
 * Takes a record of given type, converts and returns an array of type {key, value}
 * @param data  Record to be converted
 * @returns Array of type {key, value}.
 * */
const mapRecordToArray = <MyString extends string, T>(
  data: Record<MyString, T>,
): ConvertedArray<MyString, T> => {
  const myReturn = new Array<{ key: MyString; value: T }>();
  Object.entries<any>(data).forEach(([key, value]) => {
    myReturn.push({ key: key as MyString, value });
  });

  return myReturn;
};

export default mapRecordToArray;
