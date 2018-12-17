# service-api-gateway
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
