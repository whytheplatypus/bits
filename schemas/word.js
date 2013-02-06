
exports.initialize = function(app) {

  return new app.mongoose.Schema({
  	
    	bytes: [{
    
        bitsCompleted: [{
          duration: Number, 
          date: { 
            type: Date, 
            default: Date.now 
          }
        }],
      
        name: String,
      
        complete: Boolean,
      
        description: String
        
      }],
  	
    	name: String,
  	
    	active: Boolean,
  	
    	description: String,
  	
  });
};
