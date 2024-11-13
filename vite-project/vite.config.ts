import { loadEnv,defineConfig,UserConfigExport,ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import {viteMockServe} from "vite-plugin-mock"
// https://vitejs.dev/config/
export default ({command,mode}:ConfigEnv):UserConfigExport=>{
  let env=loadEnv(mode,process.cwd())
  return{
    plugins:[
      vue(),
      viteMockServe({
        localEnabled:command==="serve",
      })
    ],
    resolve:{
      alias:{
        "@":path.resolve("./src")
      }
    },
    server:{
      proxy:{
        [env.VITE_APP_BASE_API]:{
          target:env.VITE_APP_SERVIEC_URL,
          changeOrigin:true,
          rewrite:(path)=>path.replace(/^\/dev-api/,'')
        }
      }
    }
  }
}

