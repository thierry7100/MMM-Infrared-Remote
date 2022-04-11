# MMM-Infrared-Remote #
This module for the magic mirror allows you to control your mirror with an infrared remote.
Each key on the remote could launch either a notification or an action on a module (toggle, hide or show).
The infrared remote use lirc, the linux subsystem for infrared control.

## Installation ##

### lirc installation

I have used a very cheap infrared receiver from an arduino kit from Elegoo, and the remote present in the kit. But any receiver chip  should be OK. And any remote should also be OK as you can record the patterns associated with each key.
lirc install is covered by numerous posts on the web, I have used [Installing lirc](https://www.instructables.com/Setup-IR-Remote-Control-Using-LIRC-for-the-Raspber/)  to install lirc. For the second part (irconfig) I have used [Install lirc](https://www.raspberry-pi-geek.com/Archive/2014/03/Controlling-your-Pi-with-an-infrared-remote) which is quite complete but older and not up to date with current raspbian OS.

Then I used irrecord to map the actuals keys of my remote.
Then test your remote configuration with irw.  Then press some keys on your remote, and the corresponding information should be displayed.
```
irw
```
### Module installation

(1) Clone this repository in your `modules` folder
```
 cd ~/MagicMirror/modules # adapt directory if you are using a different one
git clone https://github.com/thierry7100/MMM-Infrared-Remote.git
cd MMM-Infrared-Remote
npm install 
```
## Configuration ##

This module doesn't display anything on the mirror, so position is meaningless
You have to describe some actions associated with keys on your remote.
The keys name have to be chosen from lirc list of keys.
For each key y have to describe an action which could be a notification or an action from TOGGLE, HIDE or SHOW.
Then add a parameter which is the notification name or the module name.
You can also configure the path to irw (irwPath) but this is not useful with a  default install.

```json5
    {
			config: {
				keys_actions: [
					{
						key: "KEY_PLAYPAUSE",
						action: "NOTIFICATION",
						param: "RADIO_TOGGLE",
					},
					{
						key: "KEY_CHANNELUP",
						action: "NOTIFICATION",
						param: "RADIO_NEXT",
					},
					{
						key: "KEY_CHANNELDOWN",
						action: "NOTIFICATION",
						param: "RADIO_PREVIOUS",
					},
					{
						key: "KEY_VOLUMEUP",
						action: "NOTIFICATION",
						param: "VOLUME_UP",
					},
					{
						key: "KEY_VOLUMEDOWN",
						action: "NOTIFICATION",
						param: "VOLUME_DOWN",
					},
					{
						key: "KEY_POWER",
						action: "TOGGLE",
						param: "MMM-MplayerRadio",
					}
				]
			},
		},
```

## License

### The MIT License (MIT)

Copyright © 2016 Joseph Bethge

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**

