interface Application {
  _id: string;
  candidateId: string;
  resume: string;
  motivation: string;
  challenge: string;
  expectedSalary: string;
  status: string;
  jobId: string;
  interview?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default Application;
