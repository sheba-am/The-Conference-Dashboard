from django.apps import AppConfig
# from . import views.feedback_check

class MainappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mainApp'

    def ready(self):
        print('running')
        from . import check_mail
        check_mail.start()