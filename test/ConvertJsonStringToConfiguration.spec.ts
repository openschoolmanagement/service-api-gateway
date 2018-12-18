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

import { expect } from 'chai';
import GatewayConfiguration from '../source/configuration/GatewayConfiguration'

describe('Load configuration ', function() {

  it('Handle empty routes correctly', function() {
    let config: GatewayConfiguration = JSON.parse('{"routes": []}')
    
    expect(config.routes.length).equal(0)
  })

  it('Convert JSON string to configuration object', function() {
    let config: GatewayConfiguration = JSON.parse('{"routes": [{"source": "SOURCE1","target": "TARGET1","host": "HOST1"},{"source": "SOURCE2","target": "TARGET2","host": "HOST2"}]}')
    
    expect(config.routes.length).equal(2)
    expect(config.routes[0].source).equal('SOURCE1')
    expect(config.routes[0].target).equal('TARGET1')
    expect(config.routes[0].host).equal('HOST1')
    expect(config.routes[1].source).equal('SOURCE2')
    expect(config.routes[1].target).equal('TARGET2')
    expect(config.routes[1].host).equal('HOST2')
  })

  })