import service from './service';
import controller from './controller';

export default Application => ({
  service: new service(Application),
  controller: controller(Application),
});
