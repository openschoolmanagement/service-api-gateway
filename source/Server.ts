/*
   Server.ts
   This is the gateway server

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

import * as http from 'http'
import express from 'express'
import GatewayConfiguration from './configuration/GatewayConfiguration'
import Gateway from './Gateway'

/**
 * Start the server on the given port with the given routes
 * 
 * @param port Port where the gateway is listening on
 * @param routes Routes that are dispatched by the gateway
 * @returns the server object
 */
export function startServer(port: number, routes: string): http.Server {
    let app: express.Application = express()
    let configuration: GatewayConfiguration = JSON.parse(routes)
    let gateway = new Gateway(configuration)

    gateway.initializeRoutes(app)

    return app.listen(port, () => {
        console.log(`service-api-gateway is listening on port ${port}`)
    })
}
