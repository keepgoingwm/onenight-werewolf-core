var Game = require('../../dist/game/index').default
var StatusMachine = require('../../dist/game/status-manager/status-machine').default
var visualize = require('javascript-state-machine/dist/state-machine-visualize')
var fs = require('fs')
var path = require('path')

var sm = new StatusMachine(new Game())

fs.writeFileSync(path.join(__dirname, './status-visualize.dot'), visualize(sm._fsm), 'UTF-8')