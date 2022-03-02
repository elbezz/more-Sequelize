const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
const bcrypt = require("bcrypt");
const zlib = require("zlib");
const sequelize = new Sequelize("employees", "root", "5e_M)9D.WN3)/9(5", {
  dialect: "mysql",
});
sequelize
  .authenticate()
  .then(() => {
    console.log("connection successful!!");
  })
  .catch((err) => {
    console.log("error connecting to db !!");
  });

const User3 = sequelize.define(
  "user3",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      /////OUR getter method:
      //   get() {
      //     //this is only for display and it's not going to affect how our data is saved
      //     const rawValue = this.getDataValue("username");
      //     return rawValue.toUpperCase();
      //   },
    },
    password: {
      //encrypting the password before saving in db
      type: DataTypes.STRING,
      //   set(value) {
      //     const salt = bcrypt.genSaltSync(12);
      //     const hash = bcrypt.hashSync(value, salt);
      //     this.setDataValue("password", hash);
      //   },
      validate: {
        len: [4, 200],
      },
    },
    desc: {
      type: DataTypes.STRING,
      //   //compress the data
      //   set(value) {
      //     const compressed = zlib.deflateSync(value).toString("base64");
      //     this.setDataValue("desc", compressed);
      //   },
      //   //uncompress the data
      //   get() {
      //     const value = this.getDataValue("desc");
      //     const uncompressed = zlib.inflateSync(Buffer.from(value, "base64"));
      //     return uncompressed.toString();
      //   },
    },
    // let's create a virtual field, and let's say we want to display our user name and desc combined, we can make a virtual field called aboutUser.
    aboutUser: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.username} ${this.desc}`;
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        //isEmail: true,
        // isIn:[['me@gmail.com','her@gmail.com']]
        //more complex validators:
        isIn: {
          args: [["me@gmail.com", "her@gmail.com", "them@gmail.com"]],
          msg: "wrong email used",
        },
        myEmailValidatorForNull(value) {
          if (value === null) {
            throw new Error("please enter an email");
          }
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 21,
      //custom validator
      validate: {
        isOldEnough(value) {
          if (value < 21) {
            throw new Error("Too young to sign up");
          }
        },
        isNumeric: {
          msg: "You must enter a number for age",
        },
      },
    },
    withCodeRocks: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    withCodeRocks: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },

  {
    freezeTableName: true,
    timestamps: false,
    //Model validation, this will run after the above field validators
    // let's make sure the password is different than the username
    validate: {
      usernamePassMatch() {
        if (this.username === this.password) {
          throw new Error("The password must be different than username");
        }
      },
    },
  }
);

User3.sync({ alter: true })
  .then(() => {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // return User3.create({
    //   //remember we have an email constraint to enforce the uniqueness of emails
    //   //if we run this code twice, we'll get an error Error: Duplicate entry 'bobby@gmail.com' for key 'email'
    //   //also it validate the email: try and put a wrong format of email
    //   username: "emailConstraint",
    //   password: "bobby",
    //   email: "bobby@gmail.com",
    // });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //alright let's validate the email before trying to insert a new row
    // const user = User3.build({
    //   username: "emailConstraintB4Insertion",
    //   password: "11234",
    //   email: "gmail.com",
    // });
    // return user.validate();
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //let's use our custom validator
    ///'isOldEnough' for the age///////
    // return User3.create({
    //   username: "customizedValidatorForAge",
    //   password: "124",
    //   email: "sofiane@gmail.com",
    //   age: 12,
    // });
    //////////////////////////////////
    ////'isIn' for the emails
    // return User3.create({
    //   username: "customizedValidatorForEmailIsIn",
    //   password: "124",
    //   email: "her@gmail.com",
    //   age: 54,
    // });
    ///////////////////////////////////////////
    ///check if the age is numeric and send a personalised message stated above in the age validator
    // return User3.create({
    //   username: "customizedValidatorForEmailIsIn",
    //   password: "124",
    //   email: "her@gmail.com",
    //   age: 'Zonh',
    // });
    ///use personalised message for email validator
    // return User3.create({
    //   username: "customizedValidatorForEmailIsIn",
    //   password: "124",
    //   email: "jari@gmail.com",
    //   age: 54,
    // });
    ////////////////////////////////////////////////
    //use custom validator to check if the email is null and deal with the error message
    // return User3.create({
    //   username: "customizedValidatorForEmailIsIn",
    //   password: "124",
    //   email: null,
    //   age: 54,
    // });
    ///////////////////////////////////////////////
    ////Use model validation to make sure the password is different than the username
    return User3.create({
      username: "pass",
      password: "password",
      email: "her@gmail.com",
      age: 54,
    });
  })

  .then((data) => {
    console.log(data.toJSON());
  })
  .catch((err) => {
    console.log(err);
  });
