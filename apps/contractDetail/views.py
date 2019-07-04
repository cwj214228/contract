from django.shortcuts import render
from django.views.decorators.http import require_GET
from apps.edit_contract.models import Contract
from utils import restful


@require_GET
def contract_detail(request, contract_id):
    contract = Contract.objects.get(pk=contract_id)
    context = {
        'signatureUrl_one': contract.signatureUrl_one,
        'signatureUrl_two': contract.signatureUrl_two,
        'title': contract.title,
        'content': contract.content
    }
    return restful.result(data=context)


@require_GET
def detail(request, contract_id):
    contract = Contract.objects.get(uid=contract_id)
    context = {
        'contract': contract
    }
    return render(request, 'detail.html', context=context)
