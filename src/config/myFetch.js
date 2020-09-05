import { baseUrl } from './env'
import axios from 'axios'

export default async(url = '', data = {}, type = 'GET', method = 'JSON') => {
	type = type.toUpperCase();
	url = 'http://localhost:8081' + url;
	// url = baseUrl + url;

	if (type == 'POST') {
		data = JSON.stringify(data)
	}
	
	console.log("requestData:", data)
	let result = await axios({
		headers: {
			'Content-Type': method == 'JSON' ? 'application/json' : ''
		},
        method: type,
        url: url,
        data: data
    }).then((response) =>{          //这里使用了ES6的语法
        console.log("url:",url)
        console.log("axios.response:", response)       //请求成功返回的数据
        return response
    }).catch((error) => {
        console.log(error)       //请求失败返回的数据
    })
    
    return result
}