function apiPost(endpoint, data){
    const url = 'http://localhost:3000/api'+endpoint;
    
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    fetch(url, options)
        .then(res => console.log(res))
        .then(res => console.log(res));
}


function setColor(color){
    console.log("color: "+color);
    apiPost("/color", {"color": color});
}

function move(direction){
    console.log("move: "+direction);
    apiPost("/move", {"direction": direction});

}



