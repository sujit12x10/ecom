from django import forms

class CounponApplyForm(forms.Form):
    code = forms.CharField()
    