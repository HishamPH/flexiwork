import Agenda, { Job } from "agenda";
import IAgendaScheduler from "../../usecases/interfaces/IAgendaScheduler";
import ISocketIo from "../../usecases/interfaces/ISocketIo";

const mongoURI = process.env.MONGO_URL as string;

export class AgendaScheduler implements IAgendaScheduler {
  private socket: ISocketIo;
  private agenda: Agenda;
  constructor(socket: ISocketIo) {
    this.agenda = new Agenda({ db: { address: mongoURI } });
    this.agenda.on("ready", async () => {
      console.log("Agenda is ready");
      this.defineJobs();
    });
    this.agenda.start();
    this.socket = socket;
  }
  private defineJobs(): void {
    this.agenda.define("meet alert", async (job: Job) => {
      const interview = job.attrs.data;
      const { candidate, recruiter } = interview;
      await this.socket.meetAlert(candidate, recruiter, interview);
      console.log("meet alerted");
    });
  }

  async scheduleJob(
    jobName: string,
    time: string | Date,
    data: any
  ): Promise<void> {
    try {
      await this.agenda.cancel({ "data._id": data._id });
      const job = await this.agenda.schedule(time, jobName, data);
      console.log(`a new agenda with id ${data._id} is created`);
    } catch (error) {}
  }

  async updateScheduleJob(
    jobName: string,
    time: string | Date,
    data: any
  ): Promise<void> {
    try {
    } catch (error) {}
  }

  async cancelJob(jobName: string, data: any): Promise<void> {
    try {
      await this.agenda.cancel({ name: jobName, "data._id": data._id });
    } catch (error) {}
  }
}
