
export const getCount = (card:any, orderArray:any) => {
  let count = 0
    for (let item of orderArray) {
      if (card._id === item._id) count++
    }
    return count
  }
