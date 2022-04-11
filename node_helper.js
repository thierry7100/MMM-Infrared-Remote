/* Magic Mirror
 * Module: Infrared-Remote
 *
 * By Thierry Houdoin
 * MIT Licensed.
 */
const NodeHelper = require('node_helper')
const spawn = require('child_process').spawn
module.exports = NodeHelper.create({

  start: function () {
    this.started = false
    this.irw_process = null         //  Nothing yet, will be created with CONFIG
    console.log("Start MMM-Infrared-Remote node_helper")
  },

  stop: function ()
  {
    const self = this
    if ( self.irw_process )
    {
        console.log("Killing old irw process")
        self.irw_process.kill()
        self.irw_process = null
    }
    self.started = false
  },


  socketNotificationReceived: function (notification, payload) {
    const self = this
    console.log(self.name + ': Received notification '+notification)
    if (notification === 'CONFIG' && self.started === false) {
        self.config = payload
        self.irw_process =  spawn(self.config.irwPath, options = {shell: false, windowsHide: true} )
        self.irw_process.stdout.on("data", (data) =>{
            console.log("IRW Output : " + data)
            var pieces = (''+data).split(' ')
            //  IRW Output : CODE  REPEAT KEY  REMOTE_NAME
            var repeat =  pieces[1].trim()
            var key =  pieces[2].trim()
            console.log("RecKey : " + key + ", Repeat = " + repeat)
            if ( parseInt(repeat, 10) == 0 )
            {
            //  Do it only the first time ! No repeat yet
                self.sendSocketNotification("REC_KEY", {reckey: key})
            }
        })
      self.started = true
    } 
  }
})
