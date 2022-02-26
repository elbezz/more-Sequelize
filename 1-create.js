const Sequelize = require("sequelize");
//we are declaring this: const { DataTypes } = Sequelize; so when we create a model we don't have to put
//type: Sequelize.DataTypes.INTEGER, everytime so it will be just type:DataTypes.INTEGER
const { DataTypes } = Sequelize;
//we don't have to require mysql as it's done internally
const sequelize = new Sequelize("employees", "root", "5e_M)9D.WN3)/9(5", {
  // host:'localhost',
  // port:3306,
  dialect: "mysql",
  //we can add this bit down here if we want the setting will be applicable for all our tables, or we do it individually like in line 63
  // define: {
  //   freezeTableName: true,
  //   timestamps: false,
  // },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("connection successful!!");
  })
  .catch((err) => {
    console.log("error connecting to db !!");
  });

// we could also have used an async function like so
//async function myFunction(){
//       await sequelize.authenticate()
//       console.log("connection successful!!");
//   }

// if we want to sync all the tables we add this here instead we are doing it one by one like now in line 70: User.sync({ force: true })
//sequelize.sync({ force: true }) to replace all existing tables and
//sequelize.sync({ alter: true }) to alter the tables
//drop all tables that end with _test:
//sequelize.drop({ match: /_test$/ })
const User = sequelize.define(
  "user",
  {
    user_id: {
      // type: Sequelize.DataTypes.INTEGER,
      // after declaring the const { DataTypes } = Sequelize; on the top we can do this instead
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [4, 8],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      default: 21,
    },
    withCodeRocks: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
  },
  //Important: above we specified the name of the table will be 'user' but by default it's gonna be pluralized and saved as 'users' table in mysql, so how can we more specific about the name?, also removing the two time columns createdAt and updatedAt that come by default, so we add this:
  {
    freezeTableName: true,
    timestamps: false,
  }
);
//this is how we create a table
// if the table exist, it'll do nothing, if we want our table to be replaced we add {force:true} inside the sync, if we wanna alter the existing table we add {alter:true} function
User.sync({ force: false })
  .then((data) => {
    console.log("table and model synced successfully");
  })
  .catch((err) => {
    console.log("error syncing table and model");
  });
// console.log(sequelize.models.user);

//this is how we gonna work with updated table
User.sync({ alter: true })
  .then(() => {
    // //down here the build method is not actually inserting the date into our table but preparing it, to save we need to use the save method.
    // const user = User.build({
    //   username: "elbezz",
    //   password: "123",
    //   age: 43,
    //   withCodeRocks: true,
    // });
    // //to save the changes
    // return user.save();
    // //we could also did user.save(); without return, but here we have to return it to be able to use it in .then close
    // better way of doing it user create method
    return User.create({
      username: "hamid",
      password: "2154",
      age: 58,
      withCodeRocks: false,
    });
  })
  //bulk creation to insert multiple values at once
  // return User.bulkCreate([
  //   {
  //     username: "amine",
  //     password: "1405",
  //     age: 44,
  //     withCodeRocks: true,
  //   },
  //   {
  //     username: "lotfi",
  //     password: "302",
  //     age: 26,
  //     withCodeRocks: true,
  //   },
  //   {
  //     username: "kamel",
  //     password: "111",
  //     age: 35,
  //     withCodeRocks: false,
  //   },
  // ],{validate:true})
  .then((data) => {
    console.log(data.toJSON());

    //in bulckcreate we use this instead:
    // data.forEach((element) => {
    //   console.log(element.toJSON());
    // });

    //back to single insert:
    //if we want to change the username and the age:
    // data.username = "mouni";
    // data.age = 23;

    //if we want to increment or decrement the age we use:
    //data.decrement({age:2});

    //in case we have more than one field we want to increment we do:
    //data.increment({age:2, height:1});
    // console.log(data.username + " user added to table");
    return data.save();
    //if we want only the age to be saved we do this
    // return data.save({fields:['age']});

    //in order to remove a user use destroy method (not recommended)
    // return data.destroy()
    //in order to put the data to original state without changing the username to mouni we use
    // return data.reload()
  })
  .then((data) => {
    console.log("user updated to " + data.username);
  })
  .catch((err) => {
    console.log(err);
  });
