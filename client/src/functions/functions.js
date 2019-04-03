export const filterUsers = users => {
  let arr = []
    users.forEach(user => {
      arr.push({id: user.user._id, text: `${user.personalInfo.rank.abreviated} ${user.personalInfo.name.full}`})
    })

    return arr
}

export const filterOutCurrentUser = (users, id) => {
  let arr = []
    users.forEach(user => {
      if(user.user._id !== id) {
        arr.push({id: user.user._id, text: `${user.personalInfo.rank.abreviated} ${user.personalInfo.name.full}`})
      }
    })

    return arr
}
