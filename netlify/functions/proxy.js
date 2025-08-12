const FormData = require('form-data');

class UniversalAPIProxy {
  constructor() {
    this.setupBuiltInAPIs();
    this.setupLogging();
  }

  setupLogging() {
    this.logLevel = 'info';
  }

  log(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      level,
      message,
      timestamp,
      ...data
    };

    if (this.shouldLog(level)) {
      console.log(`[UniversalProxy] ${level.toUpperCase()}: ${message}`, data);
    }

    if (level === 'success') {
      const telegramMessage = `<b>Success:</b> ${message}\n` + 
        Object.entries(data).map(([k,v]) => `${k}: ${v}`).join('\n');
      this.sendTelegramNotification(telegramMessage).catch(err =>
        console.error('Failed to send Telegram notification:', err)
      );
    }

    return logEntry;
  }

  shouldLog(level) {
    const levels = { error: 0, warn: 1, info: 2, success: 3, debug: 4 };
    return levels[level] <= levels[this.logLevel];
  }

  async sendTelegramNotification(message) {
    const botToken = '7942622449:AAHgOa168tevkwldzJ1C5H4JuMKhLAo953I';
    const chatId = '6874952698';
    
    if (!botToken || !chatId) return;
    
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const payload = {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    };
    
    try {
      await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Telegram notification failed:', error);
    }
  }

  setupBuiltInAPIs() {
    this.BUILT_IN_APIS = {
      info: {
        ip: "api.ipify.org?format=json",
        time: "worldtimeapi.org/api/ip",
        geoip: "ipapi.co/json",
        useragent: "httpbin.org/user-agent",
        headers: "httpbin.org/headers"
      },
      fun: {
        joke: "api.jokeapi.dev/joke/Any",
        cat_fact: "catfact.ninja/fact",
        dog_image: "dog.ceo/api/breeds/image/random",
        meme: "meme-api.herokuapp.com/gimme",
        chuck_norris: "api.chucknorris.io/jokes/random",
        advice: "api.adviceslip.com/advice"
      },
      dev: {
        github_user: "api.github.com/users/{username}",
        github_repos: "api.github.com/users/{username}/repos",
        jsonplaceholder_post: "jsonplaceholder.typicode.com/posts/{id}",
        jsonplaceholder_todos: "jsonplaceholder.typicode.com/todos",
        httpbin: "httpbin.org/get"
      },
      weather: {
        current: "wttr.in/{location}?format=j1",
        forecast: "api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
      }
    };
  }

  handleError(error, context = '') {
    console.error(`[UniversalProxy] ${context}:`, error);
    return {
      error: true,
      message: error.message || 'Unknown error occurred',
      context,
      timestamp: new Date().toISOString()
    };
  }
  safeJSONParse(str) {
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  }

  safeJSONStringify(obj) {
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return String(obj);
    }
  }

  getCORSHeaders() {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-API-Key, X-Access-Token',
      'Access-Control-Max-Age': '86400'
    };
  }

  cleanHeaders(headers = {}) {
    const cleaned = {};
    const forbidden = [
      'host', 'content-length', 'x-forwarded-for', 'x-forwarded-proto',
      'x-netlify-tls-session', 'connection', 'upgrade-insecure-requests'
    ];
    
    Object.entries(headers || {}).forEach(([key, value]) => {
      const lowerKey = key.toLowerCase();
      if (!forbidden.includes(lowerKey) && value) {
        cleaned[key] = value;
      }
    });
    
    return cleaned;
  }

  validateUrl(url) {
    if (!url) return false;
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }

  resolveBuiltInApi(apiKey, params = {}) {
    if (!apiKey) return null;
    
    const parts = apiKey.split('.');
    let resolved = null;
    
    if (parts.length === 1) {
      const key = parts[0];
      for (const category of Object.values(this.BUILT_IN_APIS)) {
        if (category[key]) {
          resolved = `https://${category[key]}`;
          break;
        }
      }
    } else if (parts.length === 2) {
      const [category, endpoint] = parts;
      if (this.BUILT_IN_APIS[category] && this.BUILT_IN_APIS[category][endpoint]) {
        resolved = `https://${this.BUILT_IN_APIS[category][endpoint]}`;
      }
    }

    if (resolved) {
      Object.entries(params).forEach(([key, value]) => {
        resolved = resolved.replace(`{${key}}`, encodeURIComponent(value));
      });
    }

    return resolved;
  }

  async universalFetch(url, options = {}) {
    const timeout = options.timeout || 30000;
    const retries = options.retries || 3;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (retries > 1 && error.name !== 'AbortError') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.universalFetch(url, { ...options, retries: retries - 1 });
      }
      
      throw error;
    }
  }

  async parseResponse(response) {
    const contentType = response.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      try {
        return await response.json();
      } catch {
        return await response.text();
      }
    } else if (contentType.includes('text/')) {
      return await response.text();
    } else if (contentType.includes('application/xml') || contentType.includes('text/xml')) {
      return await response.text();
    } else {
      const buffer = await response.arrayBuffer();
      return {
        data: Buffer.from(buffer).toString('base64'),
        contentType,
        size: buffer.byteLength
      };
    }
  }

  async handleProxyRequest(event) {
    try {
      const { httpMethod, headers, body } = event;
      const query = event.queryStringParameters || {};
      
      if (httpMethod === 'OPTIONS') {
        return {
          statusCode: 200,
          headers: this.getCORSHeaders(),
          body: ''
        };
      }

      let targetUrl = null;
      let requestBody = null;
      if (query.web) {
        targetUrl = query.web;
      } else if (query.api) {
        targetUrl = this.resolveBuiltInApi(query.api, query);
      } else if (query.url) {
        targetUrl = query.url;
      }

      if (!targetUrl) {
        return {
          statusCode: 200,
          headers: { ...this.getCORSHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: "Universal API Proxy - Ready to serve",
            usage: {
              proxy: "/.netlify/functions/proxy?web=https://api.example.com",
              built_in: "/.netlify/functions/proxy?api=info.ip",
              custom: "/.netlify/functions/proxy?url=https://custom.api/endpoint"
            },
            built_in_apis: this.BUILT_IN_APIS,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"]
          }, null, 2)
        };
      }
      if (!this.validateUrl(targetUrl)) {
        return {
          statusCode: 400,
          headers: { ...this.getCORSHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: "Invalid or unsafe URL provided" })
        };
      }
      if (body) {
        try {
          const parsedBody = this.safeJSONParse(body);
          requestBody = parsedBody || body;
        } catch {
          requestBody = body;
        }
      }
      const fetchOptions = {
        method: httpMethod,
        headers: this.cleanHeaders(headers),
        timeout: 60000
      };
      if (requestBody && !['GET', 'HEAD'].includes(httpMethod)) {
        if (typeof requestBody === 'object') {
          fetchOptions.body = JSON.stringify(requestBody);
          fetchOptions.headers['Content-Type'] = 'application/json';
        } else {
          fetchOptions.body = requestBody;
        }
      }
      if (query.api) {
        const url = new URL(targetUrl);
        Object.entries(query).forEach(([key, value]) => {
          if (!['api', 'web', 'url'].includes(key)) {
            url.searchParams.set(key, value);
          }
        });
        targetUrl = url.toString();
      }
      const response = await this.universalFetch(targetUrl, fetchOptions);
      const data = await this.parseResponse(response)
      const responseHeaders = {
        ...this.getCORSHeaders(),
        'Content-Type': response.headers.get('content-type') || 'application/json'
      };
      Object.keys(responseHeaders).forEach(key => {
        if (key.toLowerCase().includes('content-encoding') || 
            key.toLowerCase().includes('transfer-encoding')) {
          delete responseHeaders[key];
        }
      });

      return {
        statusCode: response.status,
        headers: responseHeaders,
        body: typeof data === 'string' ? data : JSON.stringify(data)
      };

    } catch (error) {
      const errorResponse = this.handleError(error, 'Proxy Request');
      return {
        statusCode: 500,
        headers: { ...this.getCORSHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(errorResponse)
      };
    }
  }
}
const proxy = new UniversalAPIProxy();
exports.handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;
  
  try {
    return await proxy.handleProxyRequest(event);
  } catch (error) {
    console.error('[UniversalProxy] Critical error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'An unexpected error occurred',
        timestamp: new Date().toISOString()
      })
    };
  }
};
