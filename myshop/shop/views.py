from django.shortcuts import render, get_object_or_404
from shop.models import Category, Product
from cart.forms import CartAddProductForm
from django.db.models import Q
# Create your views here.

def product_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)
    search_input = request.GET.get('search-area') or ''
    if search_input:
        products = products.filter(name__icontains=search_input)

    cart_product_form = CartAddProductForm()
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)
    ctx = {'category':category, 'categories':categories, 'products':products, 'cart_product_form':cart_product_form, 'search_input': search_input}
    return render(request, 'shop/product/list.html',ctx)

def product_detail(request, id, slug):
    product = get_object_or_404(Product, id=id, slug=slug, available=True)
    cart_product_form = CartAddProductForm()
    return render(request, 'shop/product/detail.html', {'product':product, 'cart_product_form':cart_product_form})

def base_view(request):
    return render(request, 'shop/base1.html')
