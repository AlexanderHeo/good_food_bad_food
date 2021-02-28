export const todayDisplay = (list, todayDate) => {
  todayDate.timestamp.setHours(0, 0, 0, 0)
  const today = list.filter(x => {
    const t = new Date(x.eatenAt)
    if (t > todayDate.timestamp) {
      return x
    }
  })
  return today
}
