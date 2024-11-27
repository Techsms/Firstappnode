import http from "http"//to create own server
import url, { fileURLToPath }  from  "url"// for parse url
import fs from "fs"//file manipulation
import path from "path"// for accessing path method
const server=http.createServer((request,response)=>{
    const parseUrl= url.parse(request.url,true)//for dividing into parts like path and query
     let __filename= fileURLToPath(import.meta.url)// global variable available
    //  console.log(__filename);
     let __dirname= path.dirname(__filename)
    //  console.log(__dirname);
     if((parseUrl.pathname=="/"|| parseUrl.pathname=="/home")&& request.method=="GET"){
        try{
             let homePagepath =path.join(__dirname,"Views/home.html")
             //console.log(homePagepath)
             let data= fs.readFileSync(homePagepath)//for reading in sycronous way
              response.write(data)
              response.end()
            }
        catch(err){
            console.log(err)
            response.end("Oops! something went wrong")
        }}
        else if(parseUrl.pathname.match("\.css$")) { 
            let cssFilepath =path.join(__dirname,parseUrl.pathname)
            console.log(cssFilepath);
            let readStream= fs.createReadStream(cssFilepath)
                readStream.pipe(response)
         }
         else if(parseUrl.pathname.match("/.jpeg")){
            let imgFilepath=path.join(__dirname,parseUrl.pathname)
             let readStream=fs.createReadStream(imgFilepath)
             readStream.pipe(response)
         }
        }
)
server.listen(3000,()=>{console.log("server started")})
