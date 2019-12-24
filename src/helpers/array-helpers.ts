export const insert = (arr: any, index: number, ...newElements: any): Array<any> => [
  ...arr.slice(0, index),
  ...newElements,
  ...arr.slice(index)
]

export const findElementById = ( id: string, arr: Array<any> ) : any => {
  return arr.filter(item => item.id === id)[0];
}