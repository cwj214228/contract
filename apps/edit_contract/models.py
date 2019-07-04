from django.db import models
# from shortuuidfield import ShortUUIDField


class Contract(models.Model):
    uid = models.CharField(primary_key=True,max_length=128)
    title = models.CharField(max_length=50)
    content = models.TextField(default=0)
    pub_time = models.DateTimeField(auto_now_add=True)
    signatureUrl_one = models.URLField()
    signatureUrl_two = models.URLField()

    class Meta:
        db_table = 'contract'
