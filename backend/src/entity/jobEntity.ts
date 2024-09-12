interface Job {
  _id: string;
  recruiterId: string;
  jobName: string;
  description: string;
  responsibilities: string;
  niceToHaves: string;
  postDate: Date;
  dueDate: Date;
  jobType: string;
  minSalary: number;
  maxSalary: number;
  skills: string;
  location: string;
  remote: boolean;
  isActive: boolean;
}

export default Job;
