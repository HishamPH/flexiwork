import Application from "../../entity/applicationEntity";

interface IApplicationRepository{
  applyJob(application:Application):Promise<{}|null>
}

export default IApplicationRepository;