#!/usr/bin/env node

const {program} = require("commander")
const create = require("./apis/create");

program.command("create <name>")
.action(create)

program.parse()
