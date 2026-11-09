/* POST /api/waitlist {email} — stores a waitlist signup by emailing it to See@seeai.xyz
   via FormSubmit (server-side, so the destination address is never exposed to the browser).
   The FormSubmit form must be activated once (click the activation link sent to See@seeai.xyz).
   Set WAITLIST_TARGET in Vercel env vars to change the destination. */
const TARGET=process.env.WAITLIST_TARGET||'See@seeai.xyz';
module.exports=async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({ok:false,error:'method'});
  let body={};
  try{body=typeof req.body==='string'?JSON.parse(req.body):(req.body||{})}catch(e){}
  const email=String(body.email||'').trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return res.status(400).json({ok:false,error:'email'});
  try{
    const r=await fetch('https://formsubmit.co/ajax/'+encodeURIComponent(TARGET),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({email,_subject:'See Image waitlist',_template:'table'})});
    if(!r.ok)return res.status(502).json({ok:false,error:'upstream'});
    const j=await r.json();
    if(j.success!=='true')return res.status(502).json({ok:false,error:'upstream'});
    return res.status(200).json({ok:true});
  }catch(e){return res.status(502).json({ok:false,error:'upstream'})}
};
