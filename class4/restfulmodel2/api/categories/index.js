import controller from './controller';
import service from './service';

export default (Application) => {
  const { utils } = Application;
  const { fs, path, yaml } = utils;
  const swagger = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './definitions.yaml'), 'utf8'));
  return {
    controller: controller(Application),
    service: service(Application),
    swagger,
  };
};
