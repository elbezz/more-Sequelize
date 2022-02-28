const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
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

const User = sequelize.define(
  "user",
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
      get(){
          const rawValue = this.getDataValue('username')
          return rawValue.toUpperCase()
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [4, 8],
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
  },

  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.sync({ alter: true })
  .then(() => {
   return User.findOne()
  })
  .then((data) => {
console.log(data.username);
  })
  .catch((err) => {
    console.log(err);
  });
