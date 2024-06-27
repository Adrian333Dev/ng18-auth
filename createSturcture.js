const fs = require("fs");
const path = require("path");

/*
 Sample tree structure:
modules/
├─ auth/
│  ├─ config/
│  │  ├─ auth.initializer.ts
│  │  ├─ config.ts
│  │  ├─ index.ts
│  ├─ guards/
│  │  ├─ auth.guard.ts
│  │  ├─ guest.guard.ts
│  │  ├─ staff-only.guard.ts
│  │  ├─ index.ts
│  ├─ interceptors/
│  │  ├─ http.interceptor.ts
│  │  ├─ index.ts
│  ├─ resolvers/
│  │  ├─ user.resolver.ts
│  │  ├─ index.ts
│  ├─ services/
│  │  ├─ auth.service.ts
│  │  ├─ local-storage.service.ts
│  │  ├─ index.ts
│  ├─ store/
│  │  ├─ auth.state.ts
│  │  ├─ index.ts
│  ├─ utils/
│  │  ├─ auth-headers.util.ts
│  │  ├─ index.ts

Sample object structure:
{
  modules: {
    auth: {
      config: {
        'auth.initializer.ts': 'export const authInitializer = {};',
        'config.ts': 'export const config = {};',
        'index.ts': 'export * from "./auth.initializer";\nexport * from "./config";',
      },
      guards: {
        'auth.guard.ts': 'export class AuthGuard {}',
        'guest.guard.ts': 'export class GuestGuard {}',
        'staff-only.guard.ts': 'export class StaffOnlyGuard {}',
        'index.ts': 'export * from "./auth.guard";\nexport * from "./guest.guard";\nexport * from "./staff-only.guard";',
      },
      interceptors: {
        'http.interceptor.ts': 'export class HttpInterceptor {}',
        'index.ts': 'export * from "./http.interceptor";',
      },
      resolvers: {
        'user.resolver.ts': 'export class UserResolver {}',
        'index.ts': 'export * from "./user.resolver";',
      },
      services: {
        'auth.service.ts': 'export class AuthService {}',
        'local-storage.service.ts': 'export class LocalStorageService {}',
        'index.ts': 'export * from "./auth.service";\nexport * from "./local-storage.service";',
      },
      store: {
        'auth.state.ts': 'export const authState = {};',
        'index.ts': 'export * from "./auth.state";',
      },
      utils: {
        'auth-headers.util.ts': 'export const authHeaders = {};',
        'index.ts': 'export * from "./auth-headers.util";'
      },
    },
  },
}
*/

// Usage: node scripts/createStructure.js [targetPath]

// Default input object (can be replaced or extended as needed)
const input = {
  modules: {
    auth: {
      config: {
        "auth.initializer.ts": "export const authInitializer = {};",
        "config.ts": "export const config = {};",
        "index.ts":
          'export * from "./auth.initializer";\nexport * from "./config";',
      },
      guards: {
        "auth.guard.ts": "export class AuthGuard {}",
        "guest.guard.ts": "export class GuestGuard {}",
        "staff-only.guard.ts": "export class StaffOnlyGuard {}",
        "index.ts":
          'export * from "./auth.guard";\nexport * from "./guest.guard";\nexport * from "./staff-only.guard";',
      },
      interceptors: {
        "http.interceptor.ts": "export class HttpInterceptor {}",
        "index.ts": 'export * from "./http.interceptor";',
      },
      resolvers: {
        "user.resolver.ts": "export class UserResolver {}",
        "index.ts": 'export * from "./user.resolver";',
      },
      services: {
        "auth.service.ts": "export class AuthService {}",
        "local-storage.service.ts": "export class LocalStorageService {}",
        "index.ts":
          'export * from "./auth.service";\nexport * from "./local-storage.service";',
      },
      store: {
        "auth.state.ts": "export const authState = {};",
        "index.ts": 'export * from "./auth.state";',
      },
      utils: {
        "auth-headers.util.ts": "export const authHeaders = {};",
        "index.ts": 'export * from "./auth-headers.util";',
      },
    },
  },
};

// Get target path from command line arguments or default to './output'
const targetPath = path.join(process.cwd(), process.argv[2] || "output");

// Function to create directories and files recursively
function createStructure(basePath, obj) {
  Object.keys(obj).forEach((key) => {
    const fullPath = path.join(basePath, key);
    if (typeof obj[key] === "object") {
      // Create directory
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Directory created: ${fullPath}`);
      // Recurse into the directory
      createStructure(fullPath, obj[key]);
    } else {
      // Create file with content
      fs.writeFileSync(fullPath, obj[key]);
      console.log(`File created: ${fullPath}`);
    }
  });
}

// Create the target directory if it doesn't exist
try {
  fs.mkdirSync(targetPath, { recursive: true });
} catch (error) {
  console.error(`Failed to create target directory: ${error.message}`);
  process.exit(1);
}

// Create the structure
try {
  createStructure(targetPath, input);
  console.log("Structure created successfully.");
} catch (error) {
  console.error(`Error creating structure: ${error.message}`);
}
