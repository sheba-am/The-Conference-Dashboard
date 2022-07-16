from django.urls import path
from . import views
urlpatterns = [
    path('getUsers',  views.getUsers),
    path('addPaper',  views.addPaper),
    path('getPaperFile', views.getPaperFile),
    path('editPaper',  views.editPaper),
    path('deletePaper',  views.deletePaper),
    path('editInfo',  views.EditInfo),
    path('sendFeedback',  views.sendFeedback),
    path('viewAllFeedback',  views.viewAllFeedback),
    path('viewFeedback',  views.viewFeedback),
    path('promoteToJudge',  views.promoteToJudge),
    path('viewJudges',  views.viewJudges),
    path('viewPapers',  views.viewPapers),
    path('viewpublished',  views.viewPublished),
    path('viewAllPapers',  views.viewAllPapers),
    path('viewAssignedJudge',  views.viewAssignedJudge),
    path('assignJudge',  views.assignJudge),
    path('deleteJudge',  views.deleteJudge),
    path('publish',  views.publish),

    #Auth
    path('signup',  views.signup),
    # path('logout', views.logoutuser, name='logout'),
    path('login', views.login, name='login'),
]
