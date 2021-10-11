# sugarbox
Node.js Assignment | Sugarbox

1. Please download the files in the local system.
2. Run 'npm install' command.
3. Install all dependencies and libraries using 'npm install <dependency_name> --save'
4. To test the APIs, run 'npm start' command.
5. To test the test cases, run 'npm test' command.
6. The following are the URL paths and payloads for 4 APIs:
   i) ADDING NEW USER: http://localhost:8080/adduser | POST
      Request body : 
              {
                  "email":"ayush.727@gmail.com",
                  "password":"Secret*727",
                  "tasks":["create","update"]
              }

      The response header of this API will contain the token to be consumed by further APIs.
      
   ii) GETTING ALL THE USERS (pagination implemented): http://localhost:8080/getusers | GET
      
   iii) GETTING USER BY USER ID : http://localhost:8080/getuser/:<id> | GET
        Header : Bearer <token>
        The id passed here should be the one generated in ADDUSER API response.
  
   iv) DELETING USER: http://localhost:8080/deleteuser | POST
       Header : Bearer <token>
       Request body : 
                {
                    "id":"615f505fff05f386189338df"
                }
