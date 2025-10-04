const express=require('express'); const bodyParser=require('body-parser'); const cors=require('cors');
const app=express(); app.use(cors()); app.use(bodyParser.json()); const inbox={};
app.post('/send',(req,res)=>{ const {from,to,payload}=req.body; if(!from||!to||!payload) return res.status(400).json({error:'missing fields'}); inbox[to]=inbox[to]||[]; inbox[to].push({from,payload,ts:Date.now()}); res.json({ok:true}); });
app.get('/inbox',(req,res)=>{ const user=req.query.user; if(!user) return res.status(400).json({error:'user required'}); const messages=inbox[user]||[]; inbox[user]=[]; res.json({messages}); });
app.listen(process.env.PORT||4000,()=>console.log('Relay server running'));
