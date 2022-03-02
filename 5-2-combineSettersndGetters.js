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

const User2 = sequelize.define(
  "user2",
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
      get() {
        //this is only for display and it's not going to affect how our data is saved
        const rawValue = this.getDataValue("username");
        return rawValue.toUpperCase();
      },
    },
    password: {
      //encrypting the password before saving in db
      type: DataTypes.STRING,
      set(value) {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hash);
      },
      validate: {
        len: [4, 200],
      },
    },
    desc: {
      type: DataTypes.STRING,
      //compress the data
      set(value) {
        const compressed = zlib.deflateSync(value).toString("base64");
        this.setDataValue("desc", compressed);
      },
      //uncompress the data
      get() {
        const value = this.getDataValue("desc");
        const uncompressed = zlib.inflateSync(Buffer.from(value, "base64"));
        return uncompressed.toString();
      },
    },
    // let's create a virtual field, and let's say we want to display our user name and desc combined, we can make a virtual field called aboutUser.
    aboutUser: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.username} ${this.desc}`;
      },
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 21,
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
  }
);

User2.sync({ alter: true })
  .then(() => {
    // return User.findOne();
    ////////////////////////////////////////////////////////////////////////////////////////////
    //this is how we create a user with compressed desc and hashed password
    // return User2.create({
    //   username: "setterGetterCombined",
    //   desc:'this is my description it could be very long that's why we are using zlib to compress it',
    //   password: "b0by",
    // });
    ////////////////////////////////////////////////////////////////////////////////////////////
    //this is how we use virtual field
    return User2.findOne({ where: { username: "setterGetterCombined" } });
  })
  .then((data) => {
    console.log(data.username);
    console.log(data.password);
    console.log(data.desc);
    console.log(data.aboutUser);
  })
  .catch((err) => {
    console.log(err);
  });
