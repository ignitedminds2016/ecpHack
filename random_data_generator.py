from random import randrange
from random import randint
import datetime
import random
import time
import sys

def createJson(name,category,amex,zip):
    if int(amex) is 1:
        paymentType=["Amex","Visa","Discover","Master Card", "Other"]
        txnAmt = randrange(20, 100)
    else:
        paymentType=["Visa","Discover","Master Card", "Other"]
        txnAmt = randrange(10, 50)
    txnDate=datetime.date(randint(2014,2016), randint(1,12),randint(1,28)).strftime( '%m/%d/%Y')
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

    entries=200
    zip=randrange( 85025,85029)
    #print name,category,amex,zip
    for i in range(1,int(entries)):
      createJson( name,category,amex,zip)


