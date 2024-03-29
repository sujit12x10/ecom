const btns = [...document.getElementsByClassName("cart-button")]
const url = window.location.href;
const csrf = document.getElementsByName('csrfmiddlewaretoken');
const cartBox = document.getElementById('cart-box')
console.log(cartBox);

btns.forEach((btn)=>{
    btn.addEventListener("click", (e)=> {
        e.preventDefault()
        const productID = btn.getAttribute('data-id');
        const totalItems = btn.getAttribute('data-totalItems');
        const totalPrice = btn.getAttribute('data-totalPrice')
        const productPrice = btn.getAttribute('data-product-price')
        const updatedTotalPrice = Number(totalPrice) + Number(productPrice)
        const updatedTotalItems = Number(totalItems) + 1

        cartBox.innerHTML = `
            <span style="font-family: Aclonica">Your cart:</span> 
            <a style="text-decoration: none;" href="{% url 'cart:cart_detail' %}">
                <b>${updatedTotalItems} item, $${updatedTotalPrice}</b>
            </a>`

        const data = {};
        data['csrfmiddlewaretoken'] = csrf[0].value;
        data['productID'] = productID;
        $.ajax({
            type: 'POST',
            url: `${url}cart/add/${productID}/`,
            data:data,
        })
    })
})


