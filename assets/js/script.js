const http = new XMLHttpRequest();
//The product code is hardcoded, it could be retrieved from a website
const url = 'http://localhost:5000/api/recommendation/1768629';
var res;
var resSize;

http.open('GET', url, true);
http.send();
http.onreadystatechange = () => {
    // Async implementation, when and if this request is successful, the
    // response will be parsed
    var carousel = document.getElementById('carousel');

    if (http.readyState == 4 && http.status == 0) {
        var a = document.createElement('a');
        a.textContent = "Não houve resposta do servidor, você o iniciou? Clique aqui para obter ajuda";
        a.setAttribute('class', 'highlight');
        a.setAttribute('href', 'highlight');
        carousel.appendChild(a);
    }

    if(http.readyState == 4 && http.status == 200) {
        res = JSON.parse(http.responseText);
        resSize = Object.keys(res).length;


        for(var i=0; i<resSize; i++) {
            var newItem = document.createElement('div');
            var image = document.createElement('img');
            var description = document.createElement('p');
            var oldPrice = document.createElement('p');
            var price = document.createElement('p');
            var payment = document.createElement('p');

            description.textContent = res[i]['name'];
            if(res[i]['oldPrice'])
                oldPrice.textContent = `De: ${res[i]['oldPrice']}`;
            price.textContent = `Por: ${res[i]['price']}`;
            payment.innerHTML =
                res[i]['productInfo']['paymentConditions'];

            newItem.setAttribute('class', 'carousel-item');
            image.setAttribute('src', `http:${res[i]['imageName']}`);
            price.setAttribute('class', 'highlight');

            carousel.appendChild(newItem);
            newItem.appendChild(image);
            newItem.appendChild(description);
            if(res[i]['oldPrice'])
                newItem.appendChild(oldPrice);
            newItem.appendChild(price);
            newItem.appendChild(payment);
        }

        document.getElementById('buttonNext').onclick = () => {
            console.log(carousel.style.marginLeft);
            carousel.scrollLeft += 256;
        }

        document.getElementById('buttonPrev').onclick = () => {
            console.log(carousel.style.marginLeft);
            carousel.scrollLeft += -256;
        }
    }
};
