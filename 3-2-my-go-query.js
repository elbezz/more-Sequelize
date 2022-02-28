const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
const sequelize = new Sequelize("employees", "root", "5e_M)9D.WN3)/9(5", {
  dialect: "mysql",
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});
const Student = sequelize.define("student", {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 20],
    },
  },
  favorite_class: {
    type: DataTypes.STRING,
    defaultValue: "Computer Science",
  },
  school_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subscribed_to_wittcode: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Querying the table
Student.sync()
  .then(() => {
    console.log("table and model synced successfully");
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //retrieve the name of every student whose there favorite class is computer science or they are subscribed to wittcode
    // return (
    //   Student.findAll({
    //     where: {
    //       [Op.or]: {
    //         favorite_class: "Computer Science",
    //         subscribed_to_wittcode: true,
    //       },
    //     },
    //   })
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //count the amount of students in each year and give the return column the alias num_student
    return Student.findAll({
      attributes: [
        "school_year",
        [sequelize.fn("COUNT", sequelize.col("school_year")), "num_students"],
      ],
      group: "school_year",
    }).then((data) => {
      data.forEach((element) => {
        console.log(element.toJSON());
      });
    });
  })

  .catch((err) => {
    console.log(err);
  });
