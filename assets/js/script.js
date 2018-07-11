const http = new XMLHttpRequest();
const url = 'http://localhost:5000/api/recommendation/1768629';
var res;
var resSize;

http.open('GET', url, true);
http.send();
http.onreadystatechange = () => {
    if(http.readyState == 4 && http.status == 200) {
        res = JSON.parse(http.responseText);
        resSize = Object.keys(res).length;
        var carousel = document.getElementById('carousel');

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
            payment.textContent =
                res[i]['productInfo']['paymentConditions'];

            newItem.setAttribute('class', 'carousel-item');
            image.setAttribute('src', `http:${res[i]['imageName']}`);

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
