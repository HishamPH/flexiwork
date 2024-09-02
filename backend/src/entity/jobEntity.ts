interface Job{
  _id:string
  recruiterId:string
  jobName:string,
  description:string,
  responsibilities:string
  niceToHaves:string
  postDate:Date,
  dueDate:Date
  jobType:string
  minSalary:number
  maxSalary:number
  skills:string
  location:string,
  applicants:string[]
  remote:boolean
}

export default Job