/**
 * Global adapter config
 * 
 * The `adapters` configuration object lets you create different global "saved settings"
 * that you can mix and match in your models.  The `default` option indicates which 
 * "saved setting" should be used if a model doesn't have an adapter specified.
 *
 * Keep in mind that options you define directly in your model definitions
 * will override these settings.
 *
 * For more information on adapter configuration, check out:
 * http://sailsjs.org/#documentation
 */
process.isDev = !(process.env.OPENSHIFT_NODEJS_PORT || process.env.OPENSHIFT_GEAR_NAME); 

if (process.isDev) {

    module.exports.adapters = {

      // If you leave the adapter config unspecified 
      // in a model definition, 'default' will be used.
      'default': 'mysql',

      // Persistent adapter for DEVELOPMENT ONLY
      // (data is preserved when the server shuts down)
      // disk: {
        // module: 'sails-disk'
      // },

      // MySQL is the world's most popular relational database.
      // Learn more: http://en.wikipedia.org/wiki/MySQL
      mysql: {

        module: 'sails-mysql',
        host: '127.0.0.1',
        user: 'root',
        // Psst.. You can put your password in config/local.js instead
        // so you don't inadvertently push it up if you're using version control
        password: '', 
        database: 'bsmart'
        
      }
    };
} else {
    module.exports.adapters = {

      // If you leave the adapter config unspecified 
      // in a model definition, 'default' will be used.
      'default': 'mysql',

      // Persistent adapter for DEVELOPMENT ONLY
      // (data is preserved when the server shuts down)
      // disk: {
        // module: 'sails-disk'
      // },

      // MySQL is the world's most popular relational database.
      // Learn more: http://en.wikipedia.org/wiki/MySQL
      mysql: {

        module: 'sails-mysql',
        host: '127.9.112.130',
        user: 'adminYcAP2wV',
        // Psst.. You can put your password in config/local.js instead
        // so you don't inadvertently push it up if you're using version control
        password: 'BmFctgBgBDW3', 
        database: 'bsmart'
      }
    };

}




// Pasarle este objeto al config para agregar el queryfomat
// tambien hay que modificar el metodo marshallConfig, dentro sails-mysql
// para que tambien pase el queryformat en el config a mysql

 // queryFormat: function (query, values) {
      //     if (!values) return query;
      //     return query.replace(/\:(\w+)/g, function (txt, key) {
      //       if (values.hasOwnProperty(key)) {
      //         return this.escape(values[key]);
      //       }
      //       return txt;
      //     }.bind(this));
      //   }
