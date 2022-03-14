export function separate<T>(obj: T) {
  let columns: string = "";
  let values: string = "";

  Object.keys(obj).forEach((item) => {
    columns += item + ",";
  });

  Object.values(obj).forEach((item) => {
    const value = typeof item === "string" ? `'${item}'` : item;
    values += value + ",";
  });

  return {
    columns: columns.slice(0, -1),
    values: values.slice(0, -1),
  };
}
