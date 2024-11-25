const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

module.exports = sequelize.define('books', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'title cannot be null',
      },
      notEmpty: {
        msg: 'title cannot be empty',
      },
    },
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
      isIn: {
        args: [[true, false]],
        msg: 'isFeatured value must be true or false'
      },
    },
  },
  genre: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'genre cannot be null',
      },
      notEmpty: {
        msg: 'genre cannot be empty',
      },
    },
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coverImageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'coverImage cannot be null',
      },
      notEmpty: {
        msg: 'CoverImage cannot be empty',
      },
      isUrl: {
        msg: 'Invalid cover Image Url string'
      },
    },
  },
  shortDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'short description cannot be null',
      },
      notEmpty: {
        msg: 'short description cannot be empty',
      },
    },
  },
  isbn: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references:{
      model: 'users',
      key: 'id'
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
},{
  freezeTableName: true,
  paranoid: true,
  modelName: "books",
},
)