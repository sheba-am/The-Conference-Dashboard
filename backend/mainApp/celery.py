# # from celery.schedules import crontab

# # CELERYBEAT_SCHEDULE = {
# #     'add-every-monday-morning': {
# #        'task': 'tasks.check_active_objects',
# #        'schedule': 3.0,  # Will run everyday midnight
# #    },

# # @app.task
# # def check_active_objects():
# #     current_time = datetime.now()
# #     print(current_time)
# #     # threshold_time = current_time - datetime.timedelta(days=2)
# #     # YourModel.objects.filter(creation_date__lte = threshold_time).update(alarm_flag=True)  # Make a field active for alarm

# # check_active_objects()

# import os

# from celery import Celery

# # Set the default Django settings module for the 'celery' program.
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proj.settings')

# app = Celery('proj')

# # Using a string here means the worker doesn't have to serialize
# # the configuration object to child processes.
# # - namespace='CELERY' means all celery-related configuration keys
# #   should have a `CELERY_` prefix.
# app.config_from_object('django.conf:settings', namespace='CELERY')

# # Load task modules from all registered Django apps.
# app.autodiscover_tasks()


# @app.task(bind=True)
# def debug_task(self):
#     print("hello")


# import time
  
  
# while(True):
#     print('hello geek!')
#     time.sleep(3)