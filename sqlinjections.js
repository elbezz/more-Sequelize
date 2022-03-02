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
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [4, 200],
      },
    },
    desc: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
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

User.sync({ alter: true })
  .then(() => {
    // return sequelize.query(
    //   `update user set age = 60 where username = 'kamarad' `
    // );
    // return sequelize.query(`select * from user`, {
    //   //in order for us to not get any metadata we use the below line
    //   type: Sequelize.QueryTypes.SELECT,
    //   //we could also used UPDATE when needed
    //   //type: Sequelize.QueryTypes.UPDATE,
    // // use replacement to avoid sql injections
    // //note: watch a video n9 of Sequelize tutorial to see how to deal with login and avoiding sql injections
    // });
    return sequelize.query("select * from user where username in (:username)", {
      replacements: { username: ["kamarad", "layla"] },
    });
  })

  .then((data) => {
    //using those three bellow lines with update statement
    // [result, metadata] = data;
    // console.log(result);
    // console.log(metadata);
    //using the below line for select statement
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
