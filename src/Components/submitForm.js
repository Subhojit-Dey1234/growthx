import axios from 'axios'

function submitForm(fm, callback){
    axios.post('https://eo3oi83n1j77wgp.m.pipedream.net/',fm)
    .then((res)=>{
        if(res.status === 200){
            callback(res.status)
        }
    })
    .catch((err)=>{
        if(err) callback("Error")
    })
}


export default submitForm