interface User{
  _id:string,
  name:string,
  email:string,
  password:string
  role:string
  isBlocked:boolean
  profilePic:string
  location:string
  contact:number
  about:string
}

export default User