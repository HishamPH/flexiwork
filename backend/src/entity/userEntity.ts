interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isBlocked: boolean;
  profilePic: string;
  location: string;
  contact: number;
  about: string;
  education: {
    college: string;
    degree: string;
    from: Date;
    to: Date;
  }[];
  workExperience: {
    company: string;
    position: string;
    from: Date;
    to: Date;
  }[];
  isPro: boolean;
  proExpiry: Date;
  paymentDetails?: {
    paymentId: string;
    amount: number;
    date: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export default User;
