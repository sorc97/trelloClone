export const insert = (arr: any, index: number, ...newElements: any): Array<any> => [
  ...arr.slice(0, index),
  ...newElements,
  ...arr.slice(index)
]