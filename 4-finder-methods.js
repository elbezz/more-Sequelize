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
    //raw:true is the same like passing data.toJSON
    // return User.findAll({ where: { age: 25 }, raw: true });
    ///////////////////////////////////////////////////////////////////////////////////
    //  return User.findByPk(6,{raw:true});
    ///////////////////////////////////////////////////////////////////////////////////
    //findOne(), if it is left like this () it'll return the first row in the table, if specified it'll return the first matched row
    // return User.findOne();
    // return User.findOne({where:{username:'mouni'},raw:true})
    //////////////////////////////////////////////////////////////////////////////
    //find first user whose age is less to 25 or equal to null
    // return User.findOne({
    //   where: {
    //     age: {
    //       [Op.or]: {
    //         [Op.lt]: 25,
    //         [Op.eq]: null,
    //       },
    //     },
    //   },raw:true
    // });
    ////////////////////////////////////////////////////////////////////////////////
    // findOrCreate(), if record exist, it'll do nothing, else it'll create it
    // return User.findOrCreate({where:{username:'loufrawress'}});
    // findOrCreate(), but we don't want the previous defaultValue of the age
    // return User.findOrCreate({
    //   where: { username: "khaliss" },
    //   defaults: {
    //     age: 70,
    //   },
    //   raw: true,
    // });
    ///////////////////////////////////////////////////////////////////////////////////////
    ///findAndCountAll(), it'll find everything that matches our query and return a count
    return User.findAndCountAll({ where: { age: 70 }, raw: true });
  })
  .then((data) => {
    /// if you're using findOrCreate() uncomment those two lines to see if the record was created or not(boolean value)
    // const [result,created]=data
    // console.log(created);
    /////////////////////////////////////////
    // playing more with findOrCreate()
    // const [dataValues]=data
    // console.log(dataValues);
    ///////////////////////////////////////////////////////////////////////
    /// if you're using findAndCountAll() uncomment those three lines
    const { count, rows } = data;
    console.log("The count is: " + count);
    console.log(rows);
  })
  .catch((err) => {
    console.log(err);
  });
