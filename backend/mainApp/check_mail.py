from apscheduler.schedulers.background import BackgroundScheduler
from mainApp.views import feedback_check

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(feedback_check, trigger='cron', hour='0', minute='0', id='feedback_checker_001')
    scheduler.start()