/*
   main.ts
   Entry point of the API gateway

   Copyright 2018 Thomas Bonk, Open School Management Team

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import * as fs from 'fs'
import { startServer } from './Server'

const port: number = Number(process.env.PORT) || 3000
const routes: string = process.env.SERVICE_API_GATEWAY_CONFIG 
                        || loadRoutesConfigurationFromFile()

startServer(port, routes)

function loadRoutesConfigurationFromFile(): string {
    if (process.argv.length > 2) {
        let filename = process.argv[2]
        let routes = fs.readFileSync(filename, 'utf8')

        return routes
    }

    return '{"routes":[]}'
}