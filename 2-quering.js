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
    //returning all fields
    // return User.findAll();
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    // ordering (DESC and ASC)
    // return User.findAll({ order: [["age", "DESC"]] });
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //returning all fields and limit the output
    // return User.findAll({limit:2});
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //returning specific fields
    // return User.findAll({attributes:['username','age']});
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //exclude attributes
    // return User.findAll({attributes: {exclude:['password']}});
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //use alias
    // return User.findAll({
    //   attributes: [
    //     ["username", "user"],
    //     ["password", "pwd"],
    //   ],
    // });
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //use aggregations
    //   return User.findAll({ attributes:[[sequelize.fn('AVG',sequelize.col('age')),'howOld']] });
    // })
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    // using the where clause
    //   return User.findAll({ where: { age: 25 } });
    // })
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //using the where clause and getting only the username
    // return User.findAll({ attributes: ["username"], where: { age: 25 } });
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //multiple where clauses
    // return User.findAll({ where: { age: 25, username: "lyla" } });
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //grouping
    // return User.findAll({
    //   attributes: [
    //     "username",
    //     [sequelize.fn("SUM", sequelize.col("age")), "sum_age"],
    //   ],
    //   group: "username",
    // });
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //let select all users from our table where user name is kamarad OR age is 44
    // [Op.or]: means that we're using the OR operator, [Op.or]: we're using the AND operator, it is AND by default if not specified
    // return User.findAll({
    //   where: { [Op.or]: { username: "kamarad", age: 44 } },
    // });
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //greater than '>' operator
    // return User.findAll({
    //   where: {
    //     age: {
    //       [Op.gt]: 25,
    //     },
    //   },
    // });
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //less than or equal to
    // return User.findAll({
    //   where: {
    //     age: {
    //       [Op.or]: {
    //         [Op.lt]: 45,
    //         [Op.eq]: null,
    //       },
    //     },
    //   },
    // });
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //what if we want only to select data records where the length of the usernames is 4 characters long
    // return User.findAll({where:
    //       sequelize.where(sequelize.fn('char_length',sequelize.col('username')),4)
    // });
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //UPDATE SECTION
    // Update statement
    // return User.update({ username: "layla" }, { where: { age: 25 } });
    // Update statement with where close
    // return User.update(
    //   { username: "passed" },
    //   { where: { age: { [Op.gt]: 50 } } }
    // );
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //Destroy SECTION
    //delete with a condition
    // return User.destroy({where:{username:'passed'}});
    //delete everything in the table
    // return User.destroy({ truncate: true });
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //lastly SOME useful functions
    // return User.max('age')
    // return User.sum("age");
    return User.sum("age", { where: { age: { [Op.lt]: 25 } } });
  })
  .then((data) => {
    //comment out these bellow three lines if you using any example from UPDATE SECTION downward
    // data.forEach((element) => {
    //   console.log(element.toJSON());
    // });

    //comment out the below line if you done with update statement
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
