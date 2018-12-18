/*
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
import { startServer } from '../source/Server'
import request from 'supertest'

describe('Routing requests', function() {
    var server: http.Server
    
    beforeEach(() => {
        server = startServer(
            3000, 
            '{"routes": [{"source": "/duck/(.+)","target": "/?q=$1&format=json","host": "api.duckduckgo.com"}]}')
    });
    
    afterEach((done) => {
        server.close(done);
    })

    it('Responds with correct content type', (done) => {
        request(server)
            .get('/duck/typescript')
            .set('Accept', 'application/json')
            .expect('Content-Type', /x-javascript/)
            .expect(200, done)
    })
  })