from django.urls import path
from . import views
urlpatterns = [
    path('addPaper',  views.addPaper),
    path('getPaperFile', views.getPaperFile),
    path('editPaper',  views.editPaper),
    path('deletePaper',  views.deletePaper),
    path('viewInfo',  views.viewInfo),
    path('sendFeedback',  views.sendFeedback),
    path('viewAllFeedback',  views.viewAllFeedback),
    path('viewFeedback',  views.viewFeedback),
    path('promoteToJudge',  views.promoteToJudge),
    path('viewPapers',  views.viewPapers),
    path('viewAssignedJudge',  views.viewAssignedJudge),
    path('assignJudge',  views.assignJudge),
    path('publish',  views.publish),

    #Auth
    path('signup',  views.signup),
    # path('logout', views.logoutuser, name='logout'),
    path('login', views.login, name='login'),
]
