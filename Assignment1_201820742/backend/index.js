var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var process = require('process');
var cur_path = path.resolve('../fs');


var file_name = "";
var file_content = "";
var flag_read=0;
var flag_display=0;


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    var pathname = url.parse(_url, true).pathname;

    // "/" 인 경우
    if(pathname === '/')
    {
        fs.readFile("../frontend/template.html",function(err,tmp1){
            var body='';
            var hidden_value = 1;
            request.on('data',function(data){
                body = body + data;
            });
            request.on('end',function(){
                var post = qs.parse(body);
                hidden_value=post.hidden_value;

            });
            fs.readdir(cur_path, function(err,data){
                lsinfo="";
                lsinfo +=  "<div class = 'divDir'>"
                    +"<li class = 'dir' onclick='changeDir(this);'>" + ".."+"</li>"
                    + "</div>";
                data.forEach(function(element){
                    var tempPath = path.join(cur_path,element);
                    var stats = fs.statSync(tempPath);
                    let year = stats.mtime.getFullYear();
                    let month =stats.mtime.getMonth()+1;
                    let date = stats.mtime.getDate();
                       if(stats.isDirectory()){
                           lsinfo +=  `
                                    <div class = 'divDir'>
                                    <li class = 'dir name' onclick='changeDir(this);'>${element}</li>
                                   <button class = 'dir forDelete' value=${element} onclick='delDir(this);'>delete</button>
                                   <button class = 'dir forRename' value=${element} id= 'renameBtn' onclick='rename(this);'>rename</button>
                                    <p class = 'dir fileSize'>-</p>
                                  <p class = 'dir modificationDate'>${year}-${month<10 ? `0${month}`:month}-${date<10 ? `0${date}`:date}</p>
                                    </div>`;
                       }

                       else if(stats.isFile()){
                           lsinfo +=  `<div class = 'divFile'>
                                    <li class = 'file name' onclick='readfile(this);'>${element}</li>
                                   <button class = 'file forDelete' value=${element}  onclick='delFile(this);'>delete</button>
                                   <button class = 'file forRename' value=${element} id= 'renameBtn'  onclick='rename(this);'>rename</button>
                               <p class = 'file fileSize'>${stats.size}B</p>
                                   <p class = 'file modificationDate'>${year}-${month<10 ? `0${month}`:month}-${date<10 ? `0${date}`:date}</p>
                                   </div>`;

                       }

                    });


                let html = tmp1.toString();


                // html = html.replace("^",file_name);
                // html = html.replace("$",file_content);

                if(hidden_value=="0"){
                    // console.log(file_name);
                    file_name="";
                    file_content="";
                    flag_read=0;
                }
                else if(flag_display==1){
                    html = html.replace('fileCreatebtn.onclick=displayFileCreate;',  `fileCreatebtn.onclick=displayFileCreate; displayFileCreate();`);
                    flag_read = 1;
                    flag_display=0;
                }


                html = html.replace('?', lsinfo);
                html = html.replace('<input id="fileTitle" name = "title" type = "text">',  `<input id="fileTitle" name = "title" type = "text"  value=${file_name}>`);
                html = html.replace('name="description">',  `name="description">${file_content}`);
                response.writeHead(200,{'Content-Type': 'text/html'});
                response.end(html);
            });

        });
    }

    //편집요청
    else if(pathname === '/editfile'){
        //console.log("editfile",file_name);
        var body='';
        request.on('data',function(data){
            body = body + data;
        });
        request.on('end',function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            var file_path = path.join(cur_path, title);

            //console.log(file_name);
            if(flag_read===1){
                console.log(flag_read);
                var temp_file_path = path.join(cur_path, file_name);
                fs.rename(temp_file_path ,file_path , function(err,data){
                    fs.writeFile(file_path, description, function(err,data){
                        console.log(file_path);
                        response.writeHead(302, {Location:'http://localhost:3000/'});
                        response.end('success');
                    });
                });
            }

            else{
                fs.writeFile(file_path, description, function(err,data){
                    console.log(file_path);
                    response.writeHead(302, {Location:'http://localhost:3000/'});
                    response.end('success');
                });
            }
            flag_read=0;
            file_name="";
            file_content="";
        });
    }

    // 디렉토리 이동 요청
    else if(pathname === '/cd'){
        //console.log("cd",file_name);
        var body='';
        request.on('data',function(data){
            body = body + data;
        });
        request.on('end',function(){
            var post = qs.parse(body);
            var dir_name = post.dir_name;
            cur_path = path.join(cur_path,dir_name);
            fs.readFile(cur_path, 'utf8', function(err,data){
                response.writeHead(302, {Location :'http://localhost:3000/'});
                response.end('success');
            });
        });
    }

    //파일 읽기 요청
    else if(pathname === '/readfile'){
        //console.log("readfile",file_name);
        var body='';
        request.on('data',function(data){
            body=body+data;
        });
        request.on('end',function(){
            var post = qs.parse(body);
            file_name = post.file_name;
            var file_path = path.join(cur_path,file_name);
            fs.readFile(file_path, 'utf8', function(err,data){
                flag_display=1;
                file_content=data;
                response.writeHead(302, {Location :'http://localhost:3000/'});
                response.end('success');
            });

        });
    }

    // 디렉토리 생성 요청
    else if(pathname === '/mkdir'){
        //console.log("mkdir",file_name);
        var body='';
        request.on('data',function(data){
            body = body + data ;
        });
        request.on('end',function(){
            var post = qs.parse(body);
            var dir_name = post.dir_name;
            var file_path = path.join(cur_path, dir_name);
            fs.mkdir(file_path, function(err,data){
                response.writeHead(302, {Location:'http://localhost:3000/'});
                response.end('success');
            });
        });
    }

    // 디렉토리 삭제 요청
    else if(pathname === '/rmdir'){
        //console.log("rmdir",file_name);
        var body='';
        request.on('data',function(data){
            body = body + data;
        });
        request.on('end',function(){
            var post = qs.parse(body);
            var dir_name = post.dir_name;
            var file_path = path.join(cur_path, dir_name);
            fs.rmdir(file_path, {recursive:true},function(err,data){
                response.writeHead(302, {Location:'http://localhost:3000/'});
                response.end('success');
            });
        });
    }

    // 파일 삭제 요청
    else if(pathname === '/rmFile'){
        //console.log("rmFile",file_name);
        var body='';
        request.on('data',function(data){
            body = body + data;
        });
        request.on('end',function(){
            var post = qs.parse(body);
            var file_name = post.file_name;
            var file_path = path.join(cur_path, file_name );
            fs.unlink(file_path, function(err,data){
                response.writeHead(302, {Location:'http://localhost:3000/'});
                response.end('success');
            });
        });
    }

    //이름 변경 요청
    else if(pathname === '/rename'){
        //console.log("rename",file_name);
        var body='';
        request.on('data',function(data){
            body = body + data;
        });
        request.on('end',function(){
            var post = qs.parse(body);
            var mod_name = post.mod_name;
            var origin_name = post.origin_name;
            //console.log(post);
            var origin_file_path = path.join(cur_path, origin_name);
            var new_file_path = path.join(cur_path,mod_name);
            fs.rename(origin_file_path,new_file_path , function(err,data){
                response.writeHead(302, {Location:'http://localhost:3000/'});
                response.end('success');
            });
        });
    }
});

app.listen(3000);

