
# class vs object

## classic class
```javascript
const getUserClass  = ({ UniversalPatter }) => {
  return class Users {
    constructor(data) {
      this.username = data.username;
      this.age = data.age;
      this.id = data.id;
    }

    getUsername() {
      return this.username;
    }

    getAge() {
      return this.age;
    }

    setUsername(username) {
      this.username = username.toString();
    }

    setAge(age) {
      this.age = parseInt(age, 10);
    }

    update(){
      db.users.update(this.id, {
        username: this.username,
        age: this.age
      });
    }
  }
}
const user = new User({});
```

100 users = instances user.

## object style
```javascript
  const userData = await UniversalPattern.service.search('/user', { _id: db.ObjectId('f0f0f0f0f0') }).pop();

  UniversalPattern.service.update('/user', id, { ... });
```



# swagger
this the standard for api definitions, using yaml meta language.

(https://swagger.io/)
(http://editor.swagger.io/)

## swagger schema (yaml)
(https://www.npmjs.com/package/js-yaml)

```javascript
const fs = require('fs');
const yaml = require('js-yaml');
try {
  const doc = yaml.safeLoad(fs.readFileSync(process.cwd() + '/swagger/index.yaml', 'utf8'));
  console.log(doc);
} catch (e) {
  console.log(e);
}
```
(https://lodash.com/docs/4.17.10#merge)

## swagger-ui
(https://www.npmjs.com/package/swagger-ui)
## swagger-tools

```bash
Error: rlOrSO is required   : check the swaggerDoc json
```

# subcontrollers

## insertBefore
## getterBefore
## afterInsert
## afterGetter
