$(document).ready(function () {
    get_access_token().then(
        function(value) {
            const access_token = JSON.parse(value).access_token
            get_devices(access_token).then((data,error)=>{
                console.log(data, error)
            });
            },
        function(error) {
            console.log(error);
        }
    );
});
async function get_access_token(username, password){
    return await new Promise(function (resolve, reject) {
        const url = "https://pharma-supply-chain-server.herokuapp.com/api/token";
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onload = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText)
            }else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
            });
        }};
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        const data = "username=supplier&password=1qaz%40WSX3edc";
        xhr.send(data);
    });
}


async function get_devices(bear_token){
    return await new Promise(function (resolve, reject) {
        var url = "https://pharma-supply-chain-server.herokuapp.com/api/device/all";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Authorization", "Bearer " + bear_token);

        xhr.onload = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText)
            }else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }};
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

