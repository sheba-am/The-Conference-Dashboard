import os
from django.http import HttpResponse
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.hashers import make_password
from wsgiref.util import FileWrapper
import requests
from rest_framework import status
import json
from django.db import IntegrityError
from django.db.models import Q
from .models import BaseUser, Paper, FeedBack
from .serializers import UserSerializer, PaperSerializer, FeedBackSerializer
from django.core.mail import send_mail
import datetime
import time

def feedback_check():
    for item in FeedBack.objects.all():
        if(item.accepted==None):
            timeAssigned = item.dateAssigned
            timeNow = datetime.datetime.now(datetime.timezone.utc)
            dif = timeNow - timeAssigned
            timeLeft = 21 - (timeNow.date() - timeAssigned.date()).days
            print(timeLeft)
            if(timeLeft>7):
                if(timeLeft==12 or timeLeft==8):
                    send_mail(
                    subject = 'Paper Assigment',
                    message = str(item.judge) + " paper with the title '" + str(item.paper) + "' has been assigned to you. Please accept or decline within" + str(timeLeft-7) + " days.",
                    from_email = 'conference025@gmail.com',
                    recipient_list = [item.judge.email],
                    fail_silently = False,
                    )
            else:
                if(timeLeft==7):
                    end_mail(
                        subject = 'Paper Assigment',
                        message = str(item.judge) + " paper with the title '" + str(item.paper) + "' has been assigned to you. You have been given 7 additional days to accept or decline. After this duration you will no loger be able to participate in the evaluation of this paper.",
                        from_email = 'conference025@gmail.com',
                        recipient_list = [item.judge.email],
                        fail_silently = False,
                        )
                elif(timeLeft==5 or timeLeft==1):
                    send_mail(
                        subject = 'Paper Assigment',
                        message = str(item.judge) + " paper with the title '" + str(item.paper) + "' has been assigned to you. Please accept or decline within" + str(timeLeft) + "days.",
                        from_email = 'conference025@gmail.com',
                        recipient_list = [item.judge.email],
                        fail_silently = False,
                        )
                elif(timeLeft==0):
                    send_mail(
                        subject = 'Paper Assigment',
                        message = str(item.judge) + " You can no longer participate in the evaluation of the paper with the title '" + str(item.paper) + "' since the deadline has passed.",
                        from_email = 'conference025@gmail.com',
                        recipient_list = [item.judge.email],
                        fail_silently = False,
                        )
                    item.delete()

        elif(item.scores=="N/A"):
            timeAccepted = item.dateAccepted
            timeNow = datetime.datetime.now(datetime.timezone.utc)
            dif = timeNow - timeAccepted
            timeLeft = 21 - (timeNow.date() - timeAccepted.date()).days
            print(timeLeft)
            if(timeLeft>7):
                if(timeLeft==12 or timeLeft==8):
                    send_mail(
                    subject = 'Paper Judgment',
                    message = str(item.judge) + " you have not submitted an evaluation for the paper with the title '" + str(item.paper) + "' yet. Please submit a feedback within " + str(timeLeft-7) + " days.",
                    from_email = 'conference025@gmail.com',
                    recipient_list = [item.judge.email],
                    fail_silently = False,
                    )
            else:
                if(timeLeft==7):
                    send_mail(
                        subject = 'Paper Judgment',
                        message = str(item.judge) + " you have been give 7 additional days to submit a feedback for the paper with the title '" + str(item.paper) + "'. After this duration you will no loger be able to participate in the evaluation of this paper.",
                        from_email = 'conference025@gmail.com',
                        recipient_list = [item.judge.email],
                        fail_silently = False,
                        )
                elif(timeLeft==5 or timeLeft==1):
                    send_mail(
                        subject = 'Paper Judgment',
                        message = str(item.judge) + " you have not submitted an evaluation for the paper with the title '" + str(item.paper) + "' yet. Please submit a feedback within " + str(timeLeft) + " days.",
                        from_email = 'conference025@gmail.com',
                        recipient_list = [item.judge.email],
                        fail_silently = False,
                        )
                elif(timeLeft==0):
                    send_mail(
                        subject = 'Paper Judgment',
                        message = str(item.judge) + " You can no longer participate in the evaluation of the paper with the title '" + str(item.paper) + "' since the deadline has passed.",
                        from_email = 'conference025@gmail.com',
                        recipient_list = [item.judge.email],
                        fail_silently = False,
                        )
                    item.delete()


@api_view(['POST'])
def sendEmail(request):
#     send_mail(
#     subject = 'test',
#     message = 'This is a test',
#     from_email = 'conference025@gmail.com',
#     recipient_list = ['masoomehmokhtari693@gmail.com'],
#     fail_silently = False,
# )
    for item in BaseUser.objects.all():
        item.email = "masoomehmokhtari693@gmail.com"
        item.save()
    return Response("email sent")

@api_view(['POST'])
def signup(request):
    try:
        data = request.data
        user = BaseUser.objects.create(
            username=data['username'].lower(),
            email=data['email'].lower(),
            password=make_password(data['password']),
            first_name = data['first_name'].lower(),
            last_name = data['last_name'].lower(),
            gender = data['gender'].lower(),
            SNN = data['SNN'].lower(),
            major = data['major'].lower(),
            degree = data['degree'].lower(),
            university = data['university'].lower(),
            country = data['country'].lower(),
            city = data['city'].lower(),
            status = data['status'].lower(),
            field= data['field'].lower(),
            subfields = data['subfields'].lower()
        )
        serializer = UserSerializer(user,many=False)
        return Response(serializer.data)
    except IntegrityError as e: 
            return Response("username already registered")
@api_view(['POST'])
def login(request):
    print(request.data['username'].lower())
    print(request.data['password'])
    user = authenticate(request, username=request.data['username'].lower(), password=request.data['password'])
    print(user)
    if user is None:
            return Response("username and password don't match")
    else:
        serializer = UserSerializer(user,many=False)
        return Response(serializer.data)

#standard user options

@api_view(['POST'])
def getUsers(request):
    users = BaseUser.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def viewPublished(request):
    papers = Paper.objects.filter(published=True)
    serializer = PaperSerializer(papers,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def viewPapers(request):
    data = request.data
    user = BaseUser.objects.get(username=data['username'])
    serializers = []
    for item in user.userPapers.all():
        judges = []
        status = []
        feedbacks = FeedBack.objects.filter(paper=item)
        for feedback in feedbacks:
            if(feedback):
                judges.append(str(feedback.judge))
                if(feedback.accepted):
                    status.append("accepted")
                elif(not feedback.accepted):
                    status.append("not accepted")
                elif(feedback.scores=="N/A"):
                    status.append("no feedback")
                else:
                    status.append("feedback")

        newPaper = PaperSerializer(item, many=False).data
        newPaper['judges'] = ','.join(map(str, judges))
        newPaper['status'] = ','.join(map(str, status))
        serializers.append(newPaper)
    return Response(serializers)

@api_view(['POST'])
def addPaper(request):
    data = request.data
    print(data)
    try:
        paper = Paper.objects.create(
            authors=data['authors'].lower(),
            language=data['language'].lower(),
            NOM=data['NOM'].lower(),
            field=data['field'].lower(),
            subfields =data['subfields'].lower(),
            title=data['title'].lower(),
            summary=data['summary'].lower(),
            paperFile=data['paperFile'],
            MOP=data['MOP'].lower(),
        )
        allAuthors = data['authors'].split(",")
        for item in allAuthors:
            BaseUser.objects.get(username=item).userPapers.add(paper)
        serializer = PaperSerializer(paper,many=False)
        return Response(serializer.data)
    except IntegrityError as e:
        return Response("This title has already been registered.")

@api_view(['POST'])
def getPaperFile(request):
    data = request.data
    print(data)
    paper = Paper.objects.get(title=data['title'])

    # paperFile = open(paper.paperFile)
    response = HttpResponse(FileWrapper(paper.paperFile), content_type='application/force-download')
    response['Content-Disposition'] = 'attachment; filename="%s"' % str(paper.paperFile)
    return response

@api_view(['POST'])
def editPaper(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'])
    paper.authors=data['authors'].lower()
    paper.language=data['language'].lower()
    paper.NOM=data['NOM'].lower()
    paper.field=data['field'].lower()
    paper.subfields=data['subfields'].lower()
    paper.title=data['title'].lower()
    paper.summary=data['summary'].lower()
    paper.paperFile=data['paperFile']
    paper.MOP=data['MOP'].lower()
    paper.save(update_fields=['authors','judges','NOM','field','subfields','title','summary','paperFile','MOP'])
    allAuthors = data['authors'].split(",")
    for item in allAuthors:
        BaseUser.objects.get(username=item).userPapers.add(paper)
    user = BaseUser.objects.get(username=allAuthors[0])
    serializer = PaperSerializer(user.userPapers,many=True)
    return Response("")

@api_view(['POST'])
def deletePaper(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'])
    paper.delete()
    return Response("paper successfully deleted.")

@api_view(['POST'])
def EditInfo(request):
    data = request.data
    user = BaseUser.objects.get(username=data['username'])
    user.email=data['email'].lower()
    user.password=make_password(data['password'])
    user.first_name = data['first_name'].lower()
    user.last_name = data['last_name'].lower()
    user.gender = data['gender'].lower()
    user.SNN = data['SNN'].lower()
    user.major = data['major'].lower()
    user.degree = data['degree'].lower()
    user.university = data['university'].lower()
    user.country = data['country'].lower()
    user.city = data['city'].lower()
    user.field = data['field'].lower()
    user.subfields = data['subfields'].lower()
    user.save(update_fields=['email','password','first_name','last_name',
    'gender','SNN','major','degree','university','country','city','field'])
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)

#returns all feedbacks for a paper
@api_view(['POST'])
def viewAllFeedback(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    feedback = FeedBack.objects.filter(paper=paper)
    for item in feedback:
        if(item.accepted==None):
            timeAssigned = item.dateAssigned
            timeNow = datetime.datetime.now(datetime.timezone.utc)
            dif = timeNow - timeAssigned
            timeLeft = 21 - (timeNow.date() - timeAssigned.date()).days
            if(timeLeft>7):
                item.timeLeft = str(timeLeft - 7) + ",green"
            else:
                item.timeLeft = str(timeLeft) + ",red"
        elif(item.scores=="N/A"):
            timeAccepted = item.dateAccepted
            timeNow = datetime.datetime.now(datetime.timezone.utc)
            dif = timeNow - timeAccepted
            timeLeft = 21 - (timeNow.date() - timeAccepted.date()).days
            print(timeLeft)
            if(timeLeft>7):
                item.timeLeft = str(timeLeft - 7) + ",green"
            else:
                item.timeLeft = str(timeLeft) + ",red"
        else:
            item.timeLeft = "done"
        item.save()

    serializer = FeedBackSerializer(feedback,many=True)
    return Response(serializer.data)

#return feedback of a paper made by a specific judge       
@api_view(['POST'])
def viewFeedback(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    judge = BaseUser.objects.get(username=data['username'].lower())
    feedback = FeedBack.objects.get(Q(paper=paper) & Q(judge=judge))
    serializer = FeedBackSerializer(feedback,many=False)
    return Response(serializer.data)

#judge options
@api_view(['POST'])
def sendFeedback(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    judge = BaseUser.objects.get(username=data['username'].lower())
    feedback = FeedBack.objects.filter(Q(paper=paper) & Q(judge=judge))[0]
    feedback.scores = data['scores']
    # feedback.q1 = data['q1']
    # feedback.q2 = data['q2']
    # feedback.q3 = data['q3']
    # feedback.q4 = data['q4']
    # feedback.q5 = data['q5']
    # feedback.q6 = data['q6']
    # feedback.q7 = data['q7']
    # feedback.q8 = data['q8']
    # feedback.q9 = data['q9']
    # feedback.q10 = data['q10']
    feedback.description = data['description']
    feedback.save()
    paper = Paper.objects.get(title=data['title'].lower())
    feedbacks = FeedBack.objects.filter(paper=paper)
    allJudged = True
    for item in feedbacks:
        print(item.description)
        print(item.description=="N/A")
        if(item.description=="N/A"):
            allJudged = False
    #change status if all the judges have sumbitted feedbacks
    if(allJudged):
        paper.dabirBakhsh = 'judged'
        paper.save()
    serializer = FeedBackSerializer(feedback,many=False)
    return Response(serializer.data)



@api_view(['POST'])
def viewJudgeFeedback(request):
    data = request.data
    judge = BaseUser.objects.get(username=data['username'].lower())
    feedback = FeedBack.objects.filter(judge=judge)
    serializer = FeedBackSerializer(feedback,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def acceptPaper(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    judge = BaseUser.objects.get(username=data['username'].lower())
    feedback = FeedBack.objects.get(Q(paper=paper) & Q(judge=judge))
    if(json.loads(data['approval'].lower())):
        feedback.accepted = data['approval']
        feedback.dateAccepted = datetime.datetime.now()
        feedback.save()
        serializer = FeedBackSerializer(feedback,many=False)
        return Response(serializer.data)
    else:
        feedback.delete()
        return Response("feedback deleted.")


#dabirkhane options
@api_view(['POST'])
def dabirkhaneApproval(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    paper.dabirKhane = data['approval']
    paper.save()
    serializer = PaperSerializer(paper,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def changeTitle(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    try:
        paper.title = data['newTitle']
        paper.save()
        serializer = PaperSerializer(paper,many=False)
        return Response(serializer.data)
    except IntegrityError as e:
        return Response("This title has already been registered.")


#dabirBakhsh options
@api_view(['POST'])
def dabirBakhshApproval(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    paper.dabirBakhsh = data['approval']
    paper.save()
    serializer = PaperSerializer(paper,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def fieldPapers(request):
    data = request.data
    papers = Paper.objects.filter(field=data['field'].lower())
    serializer = PaperSerializer(papers,many=True)
    return Response(serializer.data)

#view judges suitable for the article
@api_view(['POST'])
def viewJudges(request):
    data = request.data
    judges = BaseUser.objects.filter(Q(field=data['field'].lower()) & (Q(status='judge') | Q(status='dabirBakhsh')))
    serializer = UserSerializer(judges,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def viewAssignedJudge(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    judges = BaseUser.objects.filter(Q(judgePapers=paper))
    serializer = UserSerializer(judges,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def assignJudge(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    paper.dabirBakhsh = 'pending judgement'
    paper.save()
    for item in data['judges'].split(','):
        if item != ',' and item != '':
            user = BaseUser.objects.get(username=item)
            # feedbackName = (str(paper) + "_" + str(user))
            feedback = FeedBack.objects.filter(Q(paper=paper) & Q(judge=user))
            #add only if the judge has not been assigned before
            print()
            if(len(feedback)==0):
                user.judgePapers.add(paper)
                user.save()
                FeedBack.objects.create(
                    paper=paper,
                    judge=user,
                    scores = "N/A",
                    description="N/A"
                )
                #undo when done
                # #send email
                # send_mail(
                # subject = 'Paper Assigment',
                # message = item + " paper with the title '" + data['title'] + "' has been assigned to you. Please accept or decline within 14 days.",
                # from_email = 'conference025@gmail.com',
                # recipient_list = ['masoomehmokhtari693@gmail.com'],
                # fail_silently = False,
                # )
    serializer = PaperSerializer(paper,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def deleteJudge(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    for item in data['judge'].split(','):
        if item != ',' and item != '':
            user = BaseUser.objects.get(username=item)
            user.judgePapers.remove(paper)
            user.save()
            feedback = FeedBack.objects.filter(Q(paper=paper) & Q(judge=user))
            feedback.delete()
    feedback = FeedBack.objects.filter(paper=paper)
    serializer = FeedBackSerializer(feedback,many=True)
    return Response(serializer.data)

#dabir conference options
@api_view(['POST'])
def dabirConferenceApproval(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    paper.dabirConference = data['approval']
    paper.published = True
    paper.save()
    serializer = PaperSerializer(paper,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def promote(request):
    data = request.data
    user = BaseUser.objects.get(username=data['username'].lower())
    user.status = data['status']
    user.save()
    serializer = UserSerializer(BaseUser.objects.all(),many=True)
    return Response(serializer.data)

@api_view(['POST'])
def viewAllPapers(request):
    papers = Paper.objects.all()
    print(papers)
    serializers = []
    for item in papers:
        judges = []
        status = []
        feedbacks = FeedBack.objects.filter(paper=item)
        for feedback in feedbacks:
            if(feedback):
                judges.append(str(feedback.judge))
                if(feedback.accepted):
                    status.append("accepted")
                elif(not feedback.accepted):
                    status.append("not accepted")
                elif(feedback.scores=="N/A"):
                    status.append("no feedback")
                else:
                    status.append("feedback")

        newPaper = PaperSerializer(item, many=False).data
        newPaper['judges'] = ','.join(map(str, judges))
        newPaper['status'] = ','.join(map(str, status))
        serializers.append(newPaper)
    return Response(serializers)

@api_view(['POST'])
def publish(request):
    
    serializer = PaperSerializer(paper,many=False)
    return Response(serializer.data)

# def testfunc():
#     starttime = time.time()
#     while True:
#         for item in FeedBack.objects.all():
#             print(item)
#             print(item.accepted)
#         time.sleep(5.0 - ((time.time() - starttime) % 5.0))
# testfunc()