from django.db import models


class Person(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=10)
    popularity = models.BigIntegerField()
    keyword = models.CharField(max_length=50)
    image_url = models.CharField(max_length=250)
    story = models.TextField()
    is_active = models.BooleanField()

    @classmethod
    def json_to_model(cls, data: dict) -> 'Person':
        return cls(
            id=data['id'],
            name=data['name'],
            popularity=data['popularity'],
            keyword=data['keyword'],
            image_url=data['imageUrl'],
            story=data['story'],
            is_active=data['isActive']
        )
