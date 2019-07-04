from django import forms


class ContractForm(forms.Form):
    title = forms.CharField(max_length=50, error_messages={"max_length": "合同标题太长了"})
    content = forms.TextInput()
    # signatureUrl_one = forms.URLField()