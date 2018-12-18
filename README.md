# service-api-gateway
[![Build Status](https://travis-ci.org/openschoolmanagement/service-api-gateway.svg?branch=master)](https://travis-ci.org/openschoolmanagement/service-api-gateway)
UI Controller Service API Gateway

## Format of the route definition

```javascript
{
    "routes": [
        {
            "source": "<source URI as regular expression>",
            "target": "<target URI as regular expression replacement pattern>",
            "host": "<host URL>"
        }
    ]
}
```

## Passing route definition

The route definition can be passed in the enironment variable `SERVICE_API_GATEWAY_CONFIG` or
as a file where the filename must be passed as a CLI parameter.
