# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




{
        
            "text": "this is you fileTree structure of the express server",
            "fileTree": {
                "app.js": {
                    file: {
                        contents: "
                        const express = require('express');
        
                        const app = express();
        
        
                        app.get('/', (req, res) => {
                            res.send('Hello World!');
                        });
        
        
                        app.listen(3000, () => {
                            console.log('Server is running on port 3000');
                        });
                        "
                    
                },
            },
            
            "usercontroller.js": {
                file:{
                
                contents: ""
                }
            },
        
            "package.json": {
                    file: {
                        contents: "
        
                        {
                            "name": "temp-server",
                            "version": "1.0.0",
                            "main": "index.js",
                            "scripts": {
                                "test": "echo \"Error: no test specified\" && exit 1"
                            },
                            "keywords": [],
                            "author": "",
                            "license": "ISC",
                            "description": "",
                            "dependencies": {
                                "express": "^4.21.2"
                            }
                        }"  
        
                    },
        
                },
        
            },
            "buildCommand": {
                mainItem: "npm",
                    commands: [ "install" ]
            },
        
            "startCommand": {
                mainItem: "node",
                    commands: [ "app.js" ]
            }
        }