from django.urls import path
from . import views
urlpatterns = [
    #all users options
    path('getUsers',  views.getUsers),
    path('addPaper',  views.addPaper), #authors, language, NOM, field, title, summary, paperFile, MOP
    path('getPaperFile', views.getPaperFile), #title
    path('editPaper',  views.editPaper), #authors, language, NOM, field, title, summary, paperFile, MOP
    path('deletePaper',  views.deletePaper), #title
    path('editInfo',  views.EditInfo), #username, email, password, first_name, last_name, gender, SNN, major, degree, university, country, city, field
    path('viewAllFeedback',  views.viewAllFeedback), #title
    path('viewFeedback',  views.viewFeedback), #title, username
    path('viewPapers',  views.viewPapers), #username
    path('viewpublished',  views.viewPublished), 
    #judge options
    path('sendFeedback',  views.sendFeedback), #title, username(judge), q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, description
    path('viewJudgeFeedback',  views.viewJudgeFeedback), #username
    
    #dabirkhane options
    path('dabirkhaneApproval',  views.dabirkhaneApproval), #title, approval
    path('changeTitle',  views.changeTitle), #title, newTitle
    #dabirBakhsh options
    path('dabirBakhshApproval',  views.dabirBakhshApproval), #title, approval
    path('fieldPapers',  views.fieldPapers), #field
    path('viewJudges',  views.viewJudges), #field
    path('viewAssignedJudge',  views.viewAssignedJudge), #title
    path('assignJudge',  views.assignJudge), #title, judges
    path('deleteJudge',  views.deleteJudge), #title, judge
    #dabir conference options
    path('dabirConferenceApproval',  views.dabirConferenceApproval), #title, approval
    path('promote',  views.promote), #username, status
    path('viewAllPapers',  views.viewAllPapers),
    # path('publish',  views.publish),

    #Auth
    path('signup',  views.signup),
    # path('logout', views.logoutuser, name='logout'),
    path('login', views.login, name='login'),
]
