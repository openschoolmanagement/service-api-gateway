/*
   Gateway.ts
   Gateway that creates the routes based on a configuration

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

import { Application, Request, Response } from 'express'
import GatewayConfiguration from './configuration/GatewayConfiguration'

const proxy = require('express-http-proxy')

/**
 * This class creates the routes based on teh given gateway configuration
 */
export default class Gateway {
    private _configuration: GatewayConfiguration

    /**
     * Constructor
     * @param configuration the gateway configuration
     */
    public constructor(configuration: GatewayConfiguration) {
        this._configuration = configuration
    }

    /**
     * Getter for the gateway configuration.
     */
    public get configuration(): GatewayConfiguration {
        return this._configuration
    }

    /**
     * Initializes the routes based on the configuration
     */
    public initializeRoutes(server: Application) {
        this.configuration.routes.forEach( (route) => {
            let sourceRegExp = new RegExp(route.source)
            
            server.use(sourceRegExp, (req: Request, res: Response, next: object) => {
                let targetPath = 
                    this.replaceTragetPlaceholders(sourceRegExp, req.originalUrl, route.target)
                let targetProxy = proxy(route.host, {
                    proxyReqPathResolver: function () {
                        return targetPath
                    }
                })

                targetProxy(req, res, next)
            })
        })
    }

    private replaceTragetPlaceholders(
        regExp: RegExp, requestPath: string, targetPath: string): string {

        let matches = regExp.exec(requestPath)
        var result = targetPath

        if (matches && matches.length > 1) {
            for (var i = 1; i < matches.length; i++) {
                let placeholder = '$' + i
                
                result = result.replace(placeholder, matches[i])
            }
        }

        return result
    }
}