const { readFileSync, writeFileSync } = require('fs');
const { send } = require('process');

const express = require('express');
const fs = require('fs');

const app = express()
app.use(express.json())

//  *---------------/ for geting Data /----------------*  //


app.get('/',(req,res)=>{
    var file = JSON.parse(readFileSync('availableCourses.json'))
    var listOfCourses=[]
    for (Course of file){
       var dictOfCourse={}
       dictOfCourse['id']=Course.id
       dictOfCourse['name']=Course.name
       dictOfCourse['description']=Course.description
       listOfCourses.push(dictOfCourse)

    }
    res.send(listOfCourses)
})

app.get('/complete',(req,res)=>{
    var file = JSON.parse(readFileSync('availableCourses.json'))
    res.send(file)

});

app.get('/courses',(req,res)=>{
    file =JSON.parse(readFileSync('availableCourses.json'))
    listOfCourses=[]
    for (Course of file){
        listOfSubCourses=[]
        for (SubCourse of Course.submission){
            dictOfSubCourse={}
            dictOfSubCourse['id']=SubCourse.id
            dictOfSubCourse['name']=SubCourse.name
            dictOfSubCourse['description']=SubCourse.description
            dictOfSubCourse['courseid']=SubCourse.courseid
            listOfSubCourses.push(dictOfSubCourse)
        }
        listOfCourses.push(listOfSubCourses)
    }
    res.send(listOfCourses)
});

app.get('/comments',(req,res)=>{
    file = JSON.parse(readFileSync('availableCourses.json'))
    listOfComments=[]
    for (Course of file){
        for (SubCourse of Course.submission){           
            for (UserSummision of SubCourse.usersummision){                    
                listOfComments.push(
                    UserSummision
                )
            }
        }
    }
    res.send(listOfComments)
})


app.get('/:id',(req,res)=>{
    file = JSON.parse(readFileSync('availableCourses.json'))
    listOfCourses=[]
    for (Course of file){
        if (Course.id == req.params.id){
            dictOfCourse={}
            dictOfCourse['id']=Course.id
            dictOfCourse['name']=Course.name
            dictOfCourse['description']=Course.description
            listOfCourses.push(dictOfCourse)
        }
    }
    res.send(listOfCourses)
})

app.get('/courses/:id',(req,res)=>{
    file =JSON.parse(readFileSync('availableCourses.json'))
    listOfCourses=[]
    for (Course of file){
        if(Course.id == req.params.id){
            listOfSubCourses=[]
            for (SubCourse of Course.submission){
                dictOfSubCourse={}
                dictOfSubCourse['id']=SubCourse.id
                dictOfSubCourse['name']=SubCourse.name
                dictOfSubCourse['description']=SubCourse.description
                dictOfSubCourse['courseid']=SubCourse.courseid
                listOfSubCourses.push(dictOfSubCourse)
            }
            listOfCourses.push(listOfSubCourses)
        }  
    }
    res.send(listOfCourses)
})

app.get('/comments/:id',(req,res)=>{
    file = JSON.parse(readFileSync('availableCourses.json'))
    listOfComments=[]
    for (Course of file){
        if (Course.id == req.params.id){
            for (SubCourse of Course.submission){           
                for (UserSummision of SubCourse.usersummision){                    
                    listOfComments.push(UserSummision)
                }
            }       
        }
    }
    res.send(listOfComments)
})

app.get('/courses/:id/:courseid',(req,res)=>{
    file =JSON.parse(readFileSync('availableCourses.json'))
    listOfCourses=[]
    for (Course of file){
        if(Course.id == req.params.id){
            listOfSubCourses=[]
            for (SubCourse of Course.submission){
                if (SubCourse.courseid == req.params.courseid){
                    dictOfSubCourse={}
                    dictOfSubCourse['id']=SubCourse.id
                    dictOfSubCourse['name']=SubCourse.name
                    dictOfSubCourse['description']=SubCourse.description
                    dictOfSubCourse['courseid']=SubCourse.courseid
                    listOfSubCourses.push(dictOfSubCourse)
                }
            }
            listOfCourses.push(listOfSubCourses)
        }  
    }
    res.send(listOfCourses)
})


app.get('/comments/:id/:courseid',(req,res)=>{
    file = JSON.parse(readFileSync('availableCourses.json'))
    listOfComments=[]
    for (Course of file){
        if (Course.id == req.params.id){
            for (SubCourse of Course.submission){  
                if (SubCourse.courseid == req.params.courseid){
                    for (UserSummision of SubCourse.usersummision){                    
                        listOfComments.push(UserSummision)
                    }
                }              
            }       
        }
    }
    res.send(listOfComments)
})

app.get('/comments/:id/:courseid/:email',(req,res)=>{
    file = JSON.parse(readFileSync('availableCourses.json'))
    listOfComments=[]
    for (Course of file){
        if (Course.id == req.params.id){
            for (SubCourse of Course.submission){  
                if (SubCourse.courseid == req.params.courseid){
                    for (UserSummision of SubCourse.usersummision){  
                        if (UserSummision.username == req.params.email){
                            listOfComments.push(UserSummision)
                        }
                    }
                }              
            }       
        }
    }
    res.send(listOfComments)
})



//  *---------------/ for inserting Data /----------------*  //


app.post('/courses/post',(req,res)=>{
    file =JSON.parse(readFileSync('availableCourses.json'))
    req.body.id = file.length + 1
    file.push(req.body)
    writeFileSync('availableCourses.json',JSON.stringify(file,null,4))
    res.send("Your course succesfully written ")
});


app.post('/:id/post',(req,res)=>{
    file = JSON.parse(readFileSync('availableCourses.json'))
    for (Course of file){
        if (Course.id == req.params.id){
            if (!("submission" in Course)){
                Course.submission = []
            }
            req.body.id = Number(req.params.id)
            req.body.courseid = Course.submission.length + 1
            Course.submission.push(req.body)
            console.log('Done');
            
        }
    }
    writeFileSync('availableCourses.json',JSON.stringify(file,null,4))
    res.send("Your subcourse succesfully written ")
})

app.post('/courses/:id/:courseid/post',(req,res)=>{
    file =JSON.parse(readFileSync('availableCourses.json'))
    for (Course of file){
        if(Course.id == req.params.id){
            for (SubCourse of Course.submission){
                if (SubCourse.courseid == req.params.courseid){
                   req.body.id = Number(req.params.id)
                   req.body.courseid = Number(req.params.courseid)
                   if (!("usersummision" in SubCourse)){
                       SubCourse.usersummision = []
                   }
                   SubCourse.usersummision.push(req.body)
                }
            }
            
        }  
    }
    writeFileSync('availableCourses.json',JSON.stringify(file,null,4))
    res.send("User summission succesfully written")
})

app.post('/comments/:id/:courseid/post',(req,res)=>{
    
    
    file = JSON.parse(readFileSync('availableCourses.json'))
    for (Course of file){
        if (Course.id == req.params.id){
            for (SubCourse of Course.submission){  
                 if (SubCourse.courseid == req.params.courseid){
                     User={}     
                        User.id = Number(req.params.id)
                        User.courseid=Number(req.params.courseid)
                        User.username=req.body.username
                        if (!("usersubmissions" in User)){
                            User.usersubmissions = []
                        }
                        User.usersubmissions.push(req.body.comment)
                        SubCourse.usersummision.push(User)
                 }        
                    
            }       
        }
    }
    writeFileSync('availableCourses.json',JSON.stringify(file,null,4))
    res.send("Comment succesfully written")
})



//  *---------------/ for Editin Data /----------------*  //

app.put('/:id/put',(req,res)=>{
    file = JSON.parse(readFileSync('availableCourses.json'))
    listOfCourses=[]
    for (Course of file){
        if (Course.id == req.params.id){
            if ("name" in req.body){
                Course.name = req.body.name
            }if ("description" in req.body){
                Course.description = req.body.description
            }
            
        }
    }
    writeFileSync('availableCourses.json',JSON.stringify(file,null,4))
    res.send("done")
    
    
})

app.put('/courses/:id/:courseid/put',(req,res)=>{
    file =JSON.parse(readFileSync('availableCourses.json'))
    for (Course of file){
        if(Course.id == req.params.id){
            for (SubCourse of Course.submission){
                if (SubCourse.courseid == req.params.courseid){
                    if ("name" in req.body){
                        SubCourse.name = req.body.name
                    }if ("description" in req.body){
                        SubCourse.description = req.body.description
                    }  
                }
            } 
        }  
    }
    writeFileSync('availableCourses.json',JSON.stringify(file,null,4))
    res.send("Done")
})

app.put('/comments/:id/:courseid/:email/:comment/put',(req,res)=>{
    file = JSON.parse(readFileSync('availableCourses.json'))
    listOfComments=[]
    for (Course of file){
        if (Course.id == req.params.id){
            for (SubCourse of Course.submission){  
                if (SubCourse.courseid == req.params.courseid){
                    for (UserSummision of SubCourse.usersummision){  
                        if (UserSummision.username == req.params.email){
                            UserSummision.usersubmissions[Number(req.params.comment)-1] = req.body.comment
                        }
                    }
                }              
            }       
        }
    }
    writeFileSync('availableCourses.json',JSON.stringify(file,null,4))
    res.send("Done")
})


//  *---------------/ for Delete Data /----------------*  //


app.delete('/:id/delete',(req,res)=>{
    file = JSON.parse(readFileSync('availableCourses.json'))
    file1=[]
    for (Course of file){
        if (Course.id != req.params.id){
           file1.push(Course) 
        }
    }
    writeFileSync('availableCourses.json',JSON.stringify(file1,null,4))
    res.send("done")
    
    
})



app.delete('/courses/:id/:courseid/delete',(req,res)=>{
    file =JSON.parse(readFileSync('availableCourses.json'))
    file_1=[]
    for (Course of file){
        Course_1=[]
        dictOfCourse={}
        dictOfCourse['id']=Course.id
        dictOfCourse['name']=Course.name
        dictOfCourse['description']=Course.description
        for (SubCourse of Course.submission){
            if (!(SubCourse.courseid == req.params.courseid && Course.id == req.params.id)){
                Course_1.push(SubCourse)
            }
        }
        dictOfCourse.submission= Course_1
        file_1.push(dictOfCourse)
        
    }
    writeFileSync('availableCourses.json',JSON.stringify(file_1,null,4))
    res.send("Done")
})


app.delete('/comments/:id/:courseid/:email/:comment/delete',(req,res)=>{
    file = JSON.parse(readFileSync('availableCourses.json'))
    listOfComments=[]
    for (Course of file){
        if (Course.id == req.params.id){
            for (SubCourse of Course.submission){  
                if (SubCourse.courseid == req.params.courseid){
                    for (UserSummision of SubCourse.usersummision){  
                        if (UserSummision.username == req.params.email){
                            UserSummision.usersubmissions.splice(Number(req.params.comment)-1,1) 
                        }
                    }
                }              
            }       
        }
    }
    writeFileSync('availableCourses.json',JSON.stringify(file,null,4))
    res.send("Done")
})

app.listen(3000,()=>{
    console.log("Working...");
    
})
