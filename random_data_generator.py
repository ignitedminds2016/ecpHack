from random import randrange
from random import randint
import datetime
import random
import time
import sys

def createJson(name,category,amex,zip,min,max):
    if int(amex) is 1:
        paymentType=["Amex","Visa","Discover","Master Card", "Other"]
    else:
        paymentType=["Visa","Discover","Master Card", "Other"]

    txnDate=datetime.date(randint(2014,2016), randint(1,12),randint(1,28)).strftime( '%m/%d/%Y')
    txnAmt = randrange(int(min), int(max))
    txnZip=zip
    txnMethod= random.choice(paymentType);
    json='{"merchant_name":"'+name+'","category":"'+category+'","payment_type":"'+txnMethod+'","zipcode":"'+str(txnZip)+'","transaction_amount":"'+str(txnAmt)+'","date_posted":"'+txnDate+'"},'
    print json 
    return json

fp=open( "data.csv","r")
for line in fp:
    values= line.strip("\n").split(",")
    name=values[1]
    category=values[0]
    amex=values[2]
    min=0
    max=0
    entries=200
    zip=[85027,85253,85286,85308] 
    ai = int(amex)
    #print name,category,amex,zip
    for z in zip: 
        if int(z) is 85027 :
            max = 100 if ai is 1 else 60
            min = 20 if ai is 1 else 10
        elif int(z) is 85253 :
           min = 50 if ai is 1 else 20
           max = 150 if ai is 1 else 100
        elif int(z) is 85286 :
           min = 30 if ai is 1 else 20
           max = 120 if ai is 1 else 100
        else :
           min = 20 if ai is 1 else 10
           max = 100 if ai is 1 else 90
        for i in range(1,int(entries)):
             createJson( name,category,amex,z,min,max)


