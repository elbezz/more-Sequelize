const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
const sequelize = new Sequelize("employees", "root", "5e_M)9D.WN3)/9(5", {
  dialect: "mysql",
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//if we're sure that our connection will be made successfully, we will not have to check it,THIS is only for development
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("connection successful!!");
//   })
//   .catch((err) => {
//     console.log("error connecting to db !!");
//   });
////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//Create the table Student
Student.sync({ force: true })
  .then(() => {
    console.log("table and model synced successfully");
    ///bulk creating some students
    return Student.bulkCreate(
      [
        {
          name: "Sisi",
          favorite_class: "Javascript",
          school_year: 2017,
          subscribed_to_wittcode: false,
        },
        {
          name: "Amel",
          school_year: 2020,
        },
        {
          name: "Amine",
          favorite_class: "React native",
          school_year: 2020,
          subscribed_to_wittcode: false,
        },
        {
          name: "Sousou",
          favorite_class: "c++",
          school_year: 2020,
        },
        {
          name: "Elyes",
          favorite_class: "nodejs",
          school_year: 2022,
          subscribed_to_wittcode: false,
        },
        {
          name: "Reda",
          favorite_class: "php",
          school_year: 2022,
        },
        {
          name: "Zakaria",
          school_year: 2017,
        },
        {
          name: "Hichem",
          school_year: 2020,
        },
        {
          name: "Sofiane",
          school_year: 2021,
          subscribed_to_wittcode: false,
        },
      ],
      { validate: true }
    );
  })
  .then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  })
  .catch((err) => {
    console.log(err);
  });
