const express = require('express')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended :true}))


const port = process.env.PORT || 8000


app.listen(port,()=>{
	console.log(`Server Started at Port ${port}`)
})
