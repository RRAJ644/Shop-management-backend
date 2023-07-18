export const storeCode = async () => {
  let number = ''
  for (let i = 0; i < 4; i++) {
    const randomNumber = Math.floor(Math.random() * 4)
    number = number + randomNumber
  }
  return number
}
