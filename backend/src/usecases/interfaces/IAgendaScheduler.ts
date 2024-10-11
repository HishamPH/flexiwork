export default interface IAgendaScheduler {
  scheduleJob(jobName: string, time: string | Date, data: any): Promise<void>;

  updateScheduleJob(
    jobName: string,
    time: string | Date,
    data: any
  ): Promise<void>;

  cancelJob(jobName: string, data: any): Promise<void>;
}
