from django.shortcuts import render
from django.views.decorators.http import require_POST, require_GET
from .forms import ContractForm
from .models import Contract
from utils import restful
import base64
from django.conf import settings
import qiniu
import uuid
import requests

q = qiniu.Auth(settings.QINIU_ACCESS_KEY, settings.QINIU_SECRET_KEY)


@require_GET
def edit_contract(request):
    return render(request, 'contract.html')


@require_POST
def save_contract(request):
    form = ContractForm(request.POST)
    # print(request.POST.get('signature'))
    img = request.POST.get('signature').split('base64,')[1]
    print(img)
    img = base64.b64decode(img)
    file = open('media/test.png', 'wb')
    file.write(img)
    file.close()
    url = upload_image(file.name)
    print(url)
    re = requests.post('http://localhost:8888/deploy?account=0xc01c805b559f4f71e1cec542c342ec7482b22cd1&password=123')
    id = re.text
    if form.is_valid():
        print('表单检验成功')
        title = form.cleaned_data.get('title')
        content = request.POST.get('content')
        print(title)
        print(content)
        contract = Contract.objects.create(uid=id, title=title, content=content, signatureUrl_one=url)
        print(str(contract))
        return restful.result(data=contract.pk)
    else:
        return restful.params_error(message=form.errors)


def upload_image(path):
    key = str(uuid.uuid1()).replace('-', '')
    token = q.upload_token(settings.QINIU_BUCKET_NAME, key, 3600, )
    qiniu.put_file(token, key, path)
    url = 'http://myheartsky.com/{}'.format(key)
    return url


def save_signature_two(request):
    img = request.POST.get('signature').split('base64,')[1]
    contractID = request.POST.get('contractID')
    print(img)
    img = base64.b64decode(img)
    file = open('media/test.png', 'wb')
    file.write(img)
    file.close()
    signatureUrl_two = upload_image(file.name)
    print(signatureUrl_two)
    contract = Contract.objects.filter(uid=contractID).update(signatureUrl_two=signatureUrl_two)
    if contract:
        return restful.result(message='签署成功！')
    else:
        return restful.params_error(message='签署失败！')
