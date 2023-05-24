# Demo project
Completed project website

[Socialpedia project](https://social-mern-image-nhvl2sce2q-as.a.run.app/)

This demo project is based on EdRoh's tutorial video on Youtube. I have fixed some bugs and added several features. You can watch the original tutorial video at the link below.

[Build a COMPLETE Fullstack Responsive MERN](https://www.youtube.com/watch?v=K8YELRmUb5o)

From this codebase, I have created a detailed tutorial in **Thai** language. You can watch it from the following link.

> [Currently working on the tutorial]

---
# How to install
## **Backend**
Starting with the backend, Go to the backend folder and then type the following command to install node packages

    npm install
    
Change the file name from  **.env.example** to **.env**
Then add your MongoDB credentials. You can edit some configurations here.

    MONGO_URL="mongodb+srv://<your_mongoDB_url>"

Import the dummy data from data folder into MongoDB

    /backend/data/ --> posts.json, users.json

Start the server with

    node index.js

The server is now ready to work on port **3001** as configured in **.evn** file.

## **Frontend**
Next, go to the frontend folder and install the packages by using the command 

    npm install

Afterwards, open the **package.json** file and modify the **proxy** setting to your backend's **IP** address and **PORT**. This allows the frontend to communicate with the backend using the fontend's base URL. Otherwise, you would need to specify the backend's IP:PORT for every request.

    "proxy": "http://<ip>:<port>"

To start the frontend ,type the command

    npm start
