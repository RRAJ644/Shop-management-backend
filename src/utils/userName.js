export const generateUserName = async (firstName) => {
  let number = ''
  for (let i = 0; i < 4; i++) {
    const randomNumber = Math.floor(Math.random() * firstName.length)
    number = number + randomNumber
  }

  const username = firstName + number
  return username
}

