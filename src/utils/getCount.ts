
export const getCount = (card:any, state:any) => {
  let count = 0
    for (let item of state.constructor) {
     if (card._id === item._id) count++
   }
    return count
}




//
// let count = 0
// if (state.bun !== null && state.bun !== undefined && state.bun._id !== card._id) {
//   console.log('find',state.bun.name, 'now',card.name)
//   const oldCardWithCount = state.data.find((el:any) => el._id === state.bun._id)
//   const newCardNoCount = {
//     ...oldCardWithCount,
//     count:0
//   }
//   state.data.filter((el:any) => el._id === newCardNoCount._id)
//
// } else {
//   return 2
// }
