/**
 * Name
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  adapter: 'mysql',
  tableName: 'tags',
  migrate: 'safe',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
  	id: {
        type:"integer",
        unique: true
    },
    name: 'STRING',
    icon: 'STRING',
    create: 'timestamp',
    user_id: {
        type:"integer",
        required:true
    },
    parent: "integer",
    color: "STRING"
  },

};
