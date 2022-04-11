/* Magic Mirror
 * Module: Infrared-Remote
 *
 * By Thierry Houdoin
 * Many thanks to Thomas Hirschberger, this was developped to control his great module MMM-MplayerRadio
 * Also many thanks to Trekky12, I used code from his module MMM-ModuleToggle 
 * MIT Licensed.
 */
Module.register("MMM-Infrared-Remote", {
  defaults: {
    irwPath: "/usr/bin/irw",

  },
  
  
start: function () {
      //    Init module : send config Notification to helper which does the real work
    const self = this
    Log.info("Starting module: " + self.name)
    Log.info("Keys table length = " + self.config.keys_actions.length)
    self.sendSocketNotification('CONFIG', self.config)
},
    //  Nothing here, the module doesn't display anything
getDom: function() {},

  //    Should not receive notification
notificationReceived: function() {},

changeModuleState: function(module, type = "hide"){
  var modulesToHide = MM.getModules().withClass(module);
      
  modulesToHide.enumerate(function(_module) {

      var callback = function(){};
      var options = {lockString: self.identifier};
      
      switch(type){
          case "hide":
              Log.log("Hide "+ _module.name);
              _module.hide(self.config.speed, callback, options);
              break;
          case "show":
              Log.log("Show "+ _module.name);
              _module.show(self.config.speed, callback, options);
              break;
          case "toggle":
              Log.log("Toggle "+ _module.name);
              if(_module.hidden){
                  _module.show(self.config.speed, callback, options);
              }else{
                  _module.hide(self.config.speed, callback, options);
              }
              break;
      }
  });
},

  //    Process notifications received from helper.
  //    For each key, send the corresponding notification
socketNotificationReceived: function (notification, payload) {
    const self = this

    if ( notification ===  "REC_KEY" ) {
        self.reckey = payload.reckey  
        console.log("Receiving notification "+notification+ " with payload.reckey :" + payload.reckey)
        for (let i = 0; i < self.config.keys_actions.length; i++) {
            console.log("id="+i+" self.config.keys_actions["+i+"].key = " + self.config.keys_actions[i].key)
            if(payload.reckey === self.config.keys_actions[i].key) {
                if ( self.config.keys_actions[i].action == "NOTIFICATION") {
                  console.log("Found key "+self.config.keys_actions[i].key+ " launch Notification " + self.config.keys_actions[i].param)
                  self.sendNotification(self.config.keys_actions[i].param)
                }
                else if ( self.config.keys_actions[i].action == "TOGGLE") {
                  self.changeModuleState(self.config.keys_actions[i].param, "toggle")
                }
                else if ( self.config.keys_actions[i].action == "HIDE") {
                  self.changeModuleState(self.config.keys_actions[i].param, "hide")
                }
                else if ( self.config.keys_actions[i].action == "SHOW") {
                  self.changeModuleState(self.config.keys_actions[i].param, "show")
                }
                else {
                  console.log("Unknown action :" + self.config.keys_actions[i].action + " encountered for key " + self.config.keys_actions[i].key + "skip")
                }
            }
        }
    }
},

})
